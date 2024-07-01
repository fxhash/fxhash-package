import { IWalletsConnector } from "./WalletConnectors/interfaces.js"

/**
 * should:
 * - handle all provided connectors (store, initialize)
 * - expose high-level events to the user
 */
export class WalletsOrchestrator {
  constructor(public connectors: IWalletsConnector[]) {}

  init() {
    // todo: maybe not Promise.all but allSettled ?
    return Promise.all(this.connectors.map(connector => connector.init()))
  }
}
