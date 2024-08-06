/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainNetwork, BlockchainNetworks } from "@fxhash/shared"
import { Web3AuthFrameManager } from "./FrameManager.js"
import { evmWeb3AuthWallet } from "./utils/evm.js"
import { tezosWeb3AuthWallet } from "./utils/tezos.js"
import {
  type SessionDetails,
  type IWeb3AuthWalletsSource,
  type IWeb3AuthWalletUtil,
} from "./_interfaces.js"
import { cleanup, intialization } from "@fxhash/utils"
import { type IGraphqlWrapper, UserSourceEventEmitter } from "@/index.js"
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
    _init.check()
    const res = await frameManager.logout()
    if (res.isFailure()) throw res.error
  }

  const source: IWeb3AuthWalletsSource = {
    emitter,
    initialized: () => _init.finished,
    getAccount: () => null,
    supports: network =>
      [BlockchainNetwork.ETHEREUM, BlockchainNetwork.TEZOS].includes(network),
    requirements: () => ({
      userInput: true,
    }),

    getWallet(network) {
      _init.check()
      return {
        connected: _wallets[network].getWalletConnected(),
        source: this,
      }
    },
    getWallets() {
      _init.check()
      return Object.fromEntries(
        BlockchainNetworks.map(network => [network, this.getWallet(network)])
      )
    },

    init: async () => {
      _init.start()
      clean.add(frameManager.emitter.on("session-changed", _handleConnected))
      try {
        await frameManager.init()
        _init.finish()
      } catch (err) {
        throw _init.fail(err)
      }
    },
    release: () => {
      clean.clear()
    },

    disconnectWallet: disconnect,
    disconnectAllWallets: disconnect,
    logoutAccount: disconnect,

    emailRequestOTP: async (email: string) => {
      _init.check()

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
      _init.check()
      const res = await frameManager.login(options)
      if (res.isFailure()) throw res.error
    },

    getWeb3AuthSessionDetails: async () => {
      _init.check()
      const res = await frameManager.getSessionDetails()
      if (res.isFailure()) throw res.error
      return res.value
    },
  }

  function _handleConnected(details: SessionDetails | null) {
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
        BlockchainNetworks.map(network => ({
          network,
          wallet: {
            connected: _wallets[network].getWalletConnected() as any,
            source,
          },
        }))
      )
    }
  }

  return source
}
