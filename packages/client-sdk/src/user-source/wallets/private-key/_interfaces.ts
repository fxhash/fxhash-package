import { Hex } from "viem"
import { IWalletsSource } from "../_interfaces.js"
import { BlockchainNetwork } from "@fxhash/shared"

/**
 * A map of Blockchain Network -> Private Key Type
 */
export type MapNetworkToPrivateKeyType<Net extends BlockchainNetwork> = {
  [K in BlockchainNetwork]: {
    [BlockchainNetwork.ETHEREUM]: Hex
    [BlockchainNetwork.TEZOS]: string
  }[K]
}[Net]

export interface IPrivateKeyWalletsSource extends IWalletsSource {
  /**
   * Update the private key of one of the wallets on the given network. Calls
   * `getWallet(network).updatePrivateKey` under the hood.
   * @param network The network on which private key should be updated
   * @param privateKey The private key to set. If not valid, will throw.
   */
  updatePrivateKey: <Net extends BlockchainNetwork>(
    network: Net,
    privateKey: MapNetworkToPrivateKeyType<Net>
  ) => Promise<void>
}
