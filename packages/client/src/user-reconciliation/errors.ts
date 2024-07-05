import { EthereumWalletManager } from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"

// export class WalletAccountNotReadyError extends Error {
//   constructor() {
//     super(
//       ``
//     )
//   }
// }

/**
 * Is thrown whenever a wallet is connected but such wallet doesn't belong
 * to the account which is authenticated.
 */
export class WalletDoesntBelongAccountError extends Error {
  constructor(walletManager: TezosWalletManager | EthereumWalletManager) {
    super(
      `The wallet "${walletManager.address}" doesn't belong to the currently authenticated user.`
    )
    this.name = this.constructor.name
  }
}

/**
 * A wallet is connected but there isn't any account authenticated.
 */
export class WalletConnectedButNoAccountAuthenticatedError extends Error {
  constructor(walletManager: TezosWalletManager | EthereumWalletManager) {
    super(
      `A wallet (${walletManager.address}) is connected but not account is currently authenticated.`
    )
    this.name = this.constructor.name
  }
}

export class AccountAuthenticatedButNoWalletConnectedError extends Error {
  constructor() {
    super(
      `An account is authenticated but there isn't any wallet currently connected to the application. For a user to be properly connected they must be authenticated and be connected with at least one of their wallets.`
    )
    this.name = this.constructor.name
  }
}

export type UserReconciliationError =
  | WalletDoesntBelongAccountError
  | WalletConnectedButNoAccountAuthenticatedError
  | AccountAuthenticatedButNoWalletConnectedError
