/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
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

/**
 * Is thrown when evm clients are requested on a connector, but such clients
 * are unavailable. Instead of returning null, this error was thrown because
 * applications should not directly request clients outside of when they are
 * available.
 */
export class EvmClientsNotAvailable extends Error {
  constructor() {
    super(`The EVM public/wallet clients are currently unavailable.`)
    this.name = "EvmClientsNotAvailable"
  }
}

/**
 * Is thrown when an attempt at generating EVM clients did not succeed.
 */
export class EvmWagmiClientGenerationError extends Error {
  name = "EvmWagmiClientGenerationError"
  constructor() {
    super(`Could not generate a public/wallet client using wagmi.`)
  }
}

/**
 * Is thrown whenever a request for a module supporting multiple blockchains is
 * made, but such module doesn't provide support for the request chain.
 */
export class BlockchainNotSupported extends Error {
  constructor(chain: BlockchainType) {
    super(`The blockchain ${chain} isn't supported by this module.`)
    this.name = "BlockchainNotSupported"
  }
}
