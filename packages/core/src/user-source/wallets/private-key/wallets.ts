/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainNetwork } from "@fxhash/shared"
import { type Hex } from "viem"
import { multichainWallets } from "../common/_private.js"
import { evmPrivateKeyWallet } from "./evm.js"
import { tezosPrivateKeyWallet } from "./tezos.js"
import { type IPrivateKeyWalletsSource } from "./_interfaces.js"
import { BlockchainWalletNotAvailableError } from "@/index.js"

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
export function privateKeyWallets({
  evm,
  tezos,
}: Options): IPrivateKeyWalletsSource {
  const wallets = multichainWallets({
    [BlockchainNetwork.ETHEREUM]: evmPrivateKeyWallet({
      privateKey: evm,
    }),
    [BlockchainNetwork.TEZOS]: tezosPrivateKeyWallet({
      privateKey: tezos,
    }),
  })

  return {
    ...wallets,
    updatePrivateKey: async (network, privateKey) => {
      const source = wallets.getWallet(network)?.source
      if (!source) throw new BlockchainWalletNotAvailableError()
      return (source as IPrivateKeyWalletsSource).updatePrivateKey(
        network,
        privateKey
      )
    },
  }
}

export type PrivateKeyWalletsOptions = Options
