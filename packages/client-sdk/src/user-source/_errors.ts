/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 *
 * All the errors related to User Sources.
 */

import { BlockchainNetwork } from "@fxhash/shared"
import { EthereumWalletManager } from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"

/**
 * Can be thrown when a WalletsConnector doesn't support a specific chain, yet
 * a request was made to interact with such wallet.
 *
 * TODO: remove if not used, or use
 */
export class WalletsConnectorNoSupportForChain extends Error {
  name = "WalletConnectorNoSupportForChain" as const

  /**
   * @param walletConnectorName Wallet Connector name for which the error was
   * spawned; The name will be used in the error message for better
   * troubleshooting.
   * @param chain The blockchain on which the error was observed. The chain will
   * be used in the error message for better troubleshooting.
   */
  constructor(
    public walletConnectorName: string,
    public chain: BlockchainNetwork
  ) {
    super(
      `Wallet Connector "${walletConnectorName}" doesn't support blockchain "${chain}"`
    )
  }
}

/**
 * Can be thrown when a WalletsConnector has support for a given chain, but the
 * WalletConnector of such chain wasn't available at the time it was requested.
 */
export class WalletsConnectorChainUnavailable extends Error {
  name = "WalletsConnectorChainUnavailable" as const

  /**
   * @param walletConnectorName Wallet Connector name for which the error was
   * spawned; The name will be used in the error message for better
   * troubleshooting.
   * @param chain The blockchain on which the error was observed. The chain will
   * be used in the error message for better troubleshooting.
   */
  constructor(
    public walletConnectorName: string,
    public chain: BlockchainNetwork
  ) {
    super(
      `The Wallet Connector for ${chain} is not available on ${walletConnectorName}.`
    )
  }
}

/**
 * Is thrown when evm clients are requested on a connector, but such clients
 * are unavailable. Instead of returning null, this error was thrown because
 * applications should not directly request clients outside of when they are
 * available.
 */
export class EvmClientsNotAvailable extends Error {
  name = "EvmClientsNotAvailable" as const
  constructor() {
    super(`The EVM public/wallet clients are currently unavailable.`)
  }
}

/**
 * Is thrown when an attempt at generating EVM clients did not succeed.
 */
export class EvmWagmiClientGenerationError extends Error {
  name = "EvmWagmiClientGenerationError" as const
  constructor() {
    super(`Could not generate a public/wallet client using wagmi.`)
  }
}

/**
 * Is thrown whenever a request for a module supporting multiple blockchains is
 * made, but such module doesn't provide support for the request chain.
 */
export class BlockchainNotSupported extends Error {
  name = "BlockchainNotSupported" as const
  constructor(chain: BlockchainNetwork) {
    super(`The blockchain ${chain} isn't supported by this module.`)
  }
}

/**
 * All the errors which can be throw by network wallet instances.
 */
export type WalletError =
  | EvmClientsNotAvailable
  | EvmWagmiClientGenerationError
  | BlockchainNotSupported

/**
 * Is thrown whenever a wallet is connected but such wallet doesn't belong
 * to the account which is authenticated.
 */
export class WalletDoesntBelongAccountError extends Error {
  name = "WalletDoesntBelongAccountError" as const
  constructor(walletManager: TezosWalletManager | EthereumWalletManager) {
    super(
      `The wallet "${walletManager.address}" doesn't belong to the currently authenticated user.`
    )
  }
}

/**
 * A wallet is connected but there isn't any account authenticated.
 */
export class WalletConnectedButNoAccountAuthenticatedError extends Error {
  name = "WalletConnectedButNoAccountAuthenticatedError" as const
  constructor(walletManager: TezosWalletManager | EthereumWalletManager) {
    super(
      `A wallet (${walletManager.address}) is connected but not account is currently authenticated.`
    )
  }
}

export class AccountAuthenticatedButNoWalletConnectedError extends Error {
  name = "AccountAuthenticatedButNoWalletConnectedError" as const
  constructor() {
    super(
      `An account is authenticated but there isn't any wallet currently connected to the application. For a user to be properly connected they must be authenticated and be connected with at least one of their wallets.`
    )
  }
}

export type UserReconciliationError =
  | WalletDoesntBelongAccountError
  | WalletConnectedButNoAccountAuthenticatedError
  | AccountAuthenticatedButNoWalletConnectedError
