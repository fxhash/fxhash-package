/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainNetwork } from "@fxhash/shared"
import { Web3AuthFrameManager } from "./FrameManager.js"
import { evmWeb3AuthWallet } from "./evm.js"
import { tezosWeb3AuthWallet } from "./tezos.js"
import { type IWeb3AuthWalletsSource } from "./_interfaces.js"
import { multichainWallets } from "../common.js"

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
 *
 * Todos:
 * - when/how to emit events ?
 * - login method
 */
export function web3AuthWallets({
  // todo: from config
  frameRootUrl = "http://localhost:3001",
  safeFrameDomWrapper,
}: Options): IWeb3AuthWalletsSource {
  const frameManager = new Web3AuthFrameManager({
    url: frameRootUrl,
    container: safeFrameDomWrapper,
  })

  // todo: based on events multichainWallets() needs a mini refacto
  const wallets = multichainWallets({
    [BlockchainNetwork.ETHEREUM]: evmWeb3AuthWallet(frameManager),
    [BlockchainNetwork.TEZOS]: tezosWeb3AuthWallet(frameManager),
  })

  const disconnect = async () => {
    const res = await frameManager.logout()
    if (res.isFailure()) throw res.error
  }

  return {
    ...wallets,

    init: async () => {
      await Promise.all([frameManager.init(), wallets.init()])
    },

    disconnectWallet: disconnect,
    disconnectAllWallets: disconnect,

    login: async options => {
      const res = await frameManager.login(options)
      console.log({ res })
      if (res.isFailure()) throw res.error
    },
  }
}
