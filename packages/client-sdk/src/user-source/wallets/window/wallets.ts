/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainNetwork } from "@fxhash/shared"
import { multichainWallets } from "../common.js"
import { Config } from "@wagmi/core"
import { type DAppClientOptions } from "@airgap/beacon-sdk"
import { eip1193WalletConnector } from "./evm.js"
import { tzip10WalletConnector } from "./tezos.js"
import { CommonWindowWallet, IWindowWalletsSource } from "./_interfaces.js"

type Options = {
  evm?: Config
  tezos?: DAppClientOptions
}

/**
 * The WindowWalletsConnector implements support for connecting with wallets
 * using Javascript objects exposed in the main page by wallets. Using common
 * libraries, this modules listens to events emitted on the page to synchronoize
 * the internal state of wallets, so that they can be used by other fxhash
 * modules.
 *
 * This implementation ensures no library is enforced to API consumers, instead
 * it instanciates, synchronizes and exposes some clients which can be used by
 * a fxhash Wallet Manager instance (abstraction to run fxhash operations
 * easily).
 *
 * This implementation is unopiniated, any wallet library of choice can be used
 * by API consumers on the rest of the app, this module will naturally expose
 * the wallets being used by the app as they plug to blockchain-respective
 * window wallet specification.
 */
export function windowWallets({ evm, tezos }: Options): IWindowWalletsSource {
  const wallets = multichainWallets({
    [BlockchainNetwork.ETHEREUM]: eip1193WalletConnector({
      wagmiConfig: evm,
    }),
    [BlockchainNetwork.TEZOS]: tzip10WalletConnector({
      beaconConfig: tezos,
    }),
  })

  return {
    ...wallets,
    requestConnection(network) {
      const wallet = wallets.getWallet(network)
      if (wallet) (wallet as any as CommonWindowWallet).requestConnection()
    },
  }
}

export type WindowWalletsOptions = Options
