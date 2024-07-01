import { BlockchainType, WalletManager } from "@fxhash/shared"
import { IWalletsConnector } from "./WalletConnectors/interfaces.js"

/**
 * should:
 * - handle all provided connectors (store, initialize)
 * - expose high-level events to the user
 */
export class WalletsOrchestrator {
  // private _managers: Record<BlockchainType, WalletManager> = {}

  constructor(public connectors: IWalletsConnector[]) {}

  init() {
    // todo: maybe not Promise.all but allSettled ?
    return Promise.all(this.connectors.map(connector => connector.init()))
  }

  public getManager(/*chain: BlockchainType*/) {
    // return this._managers[chain]
  }
}
