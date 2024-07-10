/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainNetwork } from "@fxhash/shared"
import { IWalletsSource } from "../_interfaces.js"
import { Hex } from "viem"
import { multichainWallets } from "../common.js"
import { evmPrivateKeyWallet } from "./evm.js"
import { tezosPrivateKeyWallet } from "./tezos.js"

type Options = {
  evm?: Hex
  tezos?: string
}

/**
 * The Private Key Wallets simply allows using private keys directly to sign
 * transactions & messages.
 *
 * **Warning**: This should only be used in development or in the backend **in
 * a safe & isolated environment**.
 *
 * More infos: <https://github.com/ecadlabs/taquito/issues/1764>
 */
export function privateKeyWallets({ evm, tezos }: Options): IWalletsSource {
  return multichainWallets({
    [BlockchainNetwork.ETHEREUM]: evmPrivateKeyWallet({
      privateKey: evm,
    }),
    [BlockchainNetwork.TEZOS]: tezosPrivateKeyWallet({
      privateKey: tezos,
    }),
  })
}

export type PrivateKeyWalletsOptions = Options
