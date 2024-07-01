/**
 * @author fxhash
 *
 * All the errors related to Wallet Connectors.
 */

import { BlockchainType } from "@fxhash/shared"

/**
 * Can be thrown when a WalletsConnector doesn't support a specific chain, yet
 * a request was made to interact with such wallet.
 */
export class WalletsConnectorNoSupportForChain extends Error {
  /**
   * @param walletConnectorName Wallet Connector name for which the error was
   * spawned; The name will be used in the error message for better
   * troubleshooting.
   * @param chain The blockchain on which the error was observed. The chain will
   * be used in the error message for better troubleshooting.
   */
  constructor(
    public walletConnectorName: string,
    public chain: BlockchainType
  ) {
    super(
      `Wallet Connector "${walletConnectorName}" doesn't support blockchain "${chain}"`
    )
    this.name = "WalletConnectorNoSupportForChain"
  }
}

/**
 * Can be thrown when a WalletsConnector has support for a given chain, but the
 * WalletConnector of such chain wasn't available at the time it was requested.
 */
export class WalletsConnectorChainUnavailable extends Error {
  /**
   * @param walletConnectorName Wallet Connector name for which the error was
   * spawned; The name will be used in the error message for better
   * troubleshooting.
   * @param chain The blockchain on which the error was observed. The chain will
   * be used in the error message for better troubleshooting.
   */
  constructor(
    public walletConnectorName: string,
    public chain: BlockchainType
  ) {
    super(
      `The Wallet Connector for ${chain} is not available on ${walletConnectorName}.`
    )
    this.name = "WalletsConnectorChainUnavailable"
  }
}
