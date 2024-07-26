/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainNetwork } from "@fxhash/shared"
import { Web3AuthFrameManager } from "./FrameManager.js"
import { evmWeb3AuthWallet } from "./utils/evm.js"
import { tezosWeb3AuthWallet } from "./utils/tezos.js"
import {
  SessionDetails,
  type IWeb3AuthWalletsSource,
  IWeb3AuthWalletUtil,
} from "./_interfaces.js"
import { BlockchainNetworks } from "../common.js"
import { cleanup, intialization } from "@fxhash/utils"
import { IGraphqlWrapper, UserSourceEventEmitter } from "@/index.js"
import { Mu_Web3AuthEmailRequestOTP } from "@fxhash/gql"

type Options = {
  /**
   * A GraphQL Wrapper so that this module can send gql requests for some of
   * its actions (such as email OTP requests for instance).
   */
  gqlWrapper: IGraphqlWrapper

  /**
   * Optionnal frame root URL. Shouldn't be changed except if a custom
   * implementation is needed.
   * **Only for most advanced use cases.**
   */
  frameRootUrl?: string

  /**
   * In case your application would alter the content of `document.body` such
   * that it removes the <iframe> this module adds to `document.body`, you
   * should provide such wrapper here. It should be a safe html element in which
   * the <iframe> can be appended.
   *
   * @default document.body
   */
  safeFrameDomWrapper?: HTMLElement
}

/**
 * The Social Wallets Connector provides an interface to interface with fxhash
 * social wallets (wallets managed by traditionnal social network oauth
 * providers, as well as email).
 */
export function web3AuthWallets({
  gqlWrapper,
  // todo: from config
  frameRootUrl = "http://localhost:3001",
  safeFrameDomWrapper,
}: Options): IWeb3AuthWalletsSource {
  const _init = intialization()
  const clean = cleanup()
  const emitter = new UserSourceEventEmitter().only("wallets-changed", "error")

  const frameManager = new Web3AuthFrameManager({
    url: frameRootUrl,
    container: safeFrameDomWrapper,
  })

  let _currentSession: SessionDetails | null = null
  const _wallets: { [K in BlockchainNetwork]: IWeb3AuthWalletUtil<K> } = {
    [BlockchainNetwork.ETHEREUM]: evmWeb3AuthWallet(frameManager),
    [BlockchainNetwork.TEZOS]: tezosWeb3AuthWallet(frameManager),
  }

  const disconnect = async () => {
    const res = await frameManager.logout()
    if (res.isFailure()) throw res.error
  }

  const _handleConnected = async (details: SessionDetails | null) => {
    if (
      details?.providerDetails.compressedPublicKey !==
      _currentSession?.providerDetails.compressedPublicKey
    ) {
      _currentSession = details
      for (const net of BlockchainNetworks) {
        _wallets[net].update(details)
      }
      emitter.emit(
        "wallets-changed",
        BlockchainNetworks.map(network => {
          const wallet = _wallets[network]
          return {
            network,
            manager: wallet.getWalletManager(),
          } as any
        })
      )
    }
  }

  return {
    emitter,
    initialized: () => _init.finished,
    getAccount: () => null,
    supports: network =>
      [BlockchainNetwork.ETHEREUM, BlockchainNetwork.TEZOS].includes(network),
    requirements: () => ({
      userInput: true,
    }),

    getInfo: network => _wallets[network].getInfo(),
    getWalletManagers: () =>
      Object.fromEntries(
        [BlockchainNetwork.ETHEREUM, BlockchainNetwork.TEZOS].map(network => [
          network,
          _wallets[network].getWalletManager(),
        ])
      ),

    init: async () => {
      _init.start()
      clean.add(frameManager.emitter.on("session-changed", _handleConnected))
      // todo handle error and failure properly
      await Promise.all([frameManager.init()])
      _init.finish()
    },
    release: () => {
      clean.clear()
    },

    disconnectWallet: disconnect,
    disconnectAllWallets: disconnect,
    logoutAccount: disconnect,

    emailRequestOTP: async (email: string) => {
      const res = await gqlWrapper
        .client()
        .mutation(Mu_Web3AuthEmailRequestOTP, {
          email,
        })

      // todo: better error handling !
      if (res.error) throw res.error
      if (!res?.data?.web3auth_email_request_otp?.email)
        throw Error("missing data")

      return res.data.web3auth_email_request_otp
    },

    login: async options => {
      const res = await frameManager.login(options)
      console.log({ res })
      if (res.isFailure()) throw res.error
    },

    getWeb3AuthSessionDetails: async () => {
      const res = await frameManager.getSessionDetails()
      if (res.isFailure()) throw res.error
      return res.value
    },
  }
}
