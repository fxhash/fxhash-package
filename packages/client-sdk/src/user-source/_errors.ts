/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 *
 * All the errors related to User Sources.
 */

import { BlockchainNetwork } from "@fxhash/shared"
import { EthereumWalletManager } from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"
import { IWalletConnected } from "./_interfaces.js"

export class TezosClientNotAvailableError extends Error {
  name = "TezosClientNotAvailableError" as const
}

export type TezosWalletSourceError = TezosClientNotAvailableError

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

export class EvmViemClientGenerationError extends Error {
  name = "EvmViemClientGenerationError" as const
}

export type EvmWalletSourceError =
  | EvmClientsNotAvailable
  | EvmViemClientGenerationError

export type WalletSourceErrorTypemap = {
  [BlockchainNetwork.TEZOS]: TezosWalletSourceError
  [BlockchainNetwork.ETHEREUM]: EvmWalletSourceError
}

export class BlockchainWalletNotAvailableError extends Error {
  name = "BlockchainWalletNotAvailableError" as const
}

export class BlockchainNotSupported extends Error {
  name = "BlockchainNotSupported" as const
  constructor(chain: BlockchainNetwork) {
    super(`The blockchain ${chain} isn't supported by this module.`)
  }
}

export type WalletSourceError =
  | TezosWalletSourceError
  | EvmWalletSourceError
  | BlockchainWalletNotAvailableError

/**
 * All the errors which can be throw by network wallet instances.
 */
export type WalletError = EvmClientsNotAvailable | BlockchainNotSupported

/**
 * Is thrown whenever a wallet is connected but such wallet doesn't belong
 * to the account which is authenticated.
 */
export class WalletDoesntBelongAccountError extends Error {
  name = "WalletDoesntBelongAccountError" as const
  constructor(wallet: IWalletConnected<BlockchainNetwork>) {
    super(
      `The wallet "${wallet.info.address}" doesn't belong to the currently authenticated user.`
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

export type UserConsistencyError =
  | WalletDoesntBelongAccountError
  | WalletConnectedButNoAccountAuthenticatedError
  | AccountAuthenticatedButNoWalletConnectedError
