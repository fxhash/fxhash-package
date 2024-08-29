/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainNetwork } from "@fxhash/shared"
import { invariant } from "@fxhash/utils"
import { type Config as WagmiConfig } from "@wagmi/core"
import { type DAppClientOptions as BeaconConfig } from "@airgap/beacon-sdk"
import { eip1193WalletSource } from "./evm.js"
import { tzip10WalletSource } from "./tezos.js"
import { type IWindowWalletsSource } from "./_interfaces.js"
import { isBrowser } from "@fxhash/utils-browser"
import { multichainWallets } from "../common/multichain.js"

type Options = {
  /**
   * If defined, an EVM window wallet will be instanciated. If true, the default
   * wagmi config will be used, otherwise an object with a wagmi config can be
   * passed to use such config instead.
   */
  evm?: {
    /**
     * WAGMI config
     */
    config: WagmiConfig
  }

  /**
   * If defined, a tezos window wallet will be instanciated. If true, the
   * default beacon config will be used, otherwise an object with a beacon
   * config can be passed to use such config instead.
   */
  tezos?: {
    /**
     * Beacon Wallet config
     */
    config: BeaconConfig
  }
}

let instanciated = false

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
  invariant(isBrowser(), "Window wallets can only be instanciated in browser")

  // show a warning if it's already been instanciated, as undesired
  if (instanciated) {
    console.warn(
      "windowWallets as already been instanciated once. It is unrecommended behaviour usually."
    )
  }
  instanciated = true

  const wallets = multichainWallets({
    [BlockchainNetwork.ETHEREUM]: evm
      ? eip1193WalletSource({
          wagmiConfig: evm.config,
        })
      : undefined,
    [BlockchainNetwork.TEZOS]: tezos
      ? tzip10WalletSource({
          beaconConfig: tezos.config,
        })
      : undefined,
  })

  return {
    ...wallets,
    requestConnection(network) {
      const wallet = wallets.getWallet(network)
      wallet &&
        (wallet.source as IWindowWalletsSource).requestConnection(network)
    },
    requirements() {
      return {
        userInput: true,
      }
    },
  }
}

export type WindowWalletsOptions = Options
