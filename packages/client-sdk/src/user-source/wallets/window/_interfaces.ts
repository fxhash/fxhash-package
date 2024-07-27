import { IWalletsSource } from "@/index.js"
import { BlockchainNetwork } from "@fxhash/shared"

export interface IWindowWalletsSource extends IWalletsSource {
  /**
   * Request a connection on a given network. This doesn't guarantee a
   * connection will be prompted to the user, it does a best attempt at
   * making such request with what's available.
   *
   * @param network The network on which a connection should be requested
   */
  requestConnection: (network: BlockchainNetwork) => void
}
