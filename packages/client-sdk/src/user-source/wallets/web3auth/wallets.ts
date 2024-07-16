/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainNetwork } from "@fxhash/shared"
import { Web3AuthFrameManager } from "./FrameManager.js"
import { evmWeb3AuthWallet } from "./evm.js"
import { tezosWeb3AuthWallet } from "./tezos.js"
import { SessionDetails, type IWeb3AuthWalletsSource } from "./_interfaces.js"
import { multichainWallets } from "../common.js"
import { cleanup } from "@fxhash/utils"

type Options = {
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
  // todo: from config
  frameRootUrl = "http://localhost:3001",
  safeFrameDomWrapper,
}: Options): IWeb3AuthWalletsSource {
  const clean = cleanup()
  let _currentSession: SessionDetails | null = null

  const frameManager = new Web3AuthFrameManager({
    url: frameRootUrl,
    container: safeFrameDomWrapper,
  })

  const _wallets = {
    evm: evmWeb3AuthWallet(frameManager),
    tez: tezosWeb3AuthWallet(frameManager),
  }

  const wallets = multichainWallets({
    [BlockchainNetwork.ETHEREUM]: _wallets.evm,
    [BlockchainNetwork.TEZOS]: _wallets.tez,
  })

  const disconnect = async () => {
    const res = await frameManager.logout()
    if (res.isFailure()) throw res.error
  }

  const _handleConnected = (details: SessionDetails | null) => {
    if (
      details?.providerDetails.compressedPublicKey !==
      _currentSession?.providerDetails.compressedPublicKey
    ) {
      _currentSession = details
      // note: this in turns trigger the listeners in multichainWallets(), which
      // propagates the event up
      _wallets.evm.updateSession(details)
      _wallets.tez.updateSession(details)
    }
  }

  return {
    ...wallets,

    release: () => {
      wallets.release?.()
      clean.clear()
    },

    init: async () => {
      clean.add(frameManager.emitter.on("session-changed", _handleConnected))
      await Promise.all([frameManager.init(), wallets.init()])
    },

    disconnectWallet: disconnect,
    disconnectAllWallets: disconnect,

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
