import type { IWalletConnected } from "@/index.js"
import type { EthereumWalletManager } from "@fxhash/eth"
import type { BlockchainNetwork } from "@fxhash/shared"
import type { TezosWalletManager } from "@fxhash/tez"

/**
 * Is thrown whenever a wallet is connected but such wallet doesn't belong
 * to the account which is authenticated.
 */
export class WalletDoesntBelongAccountError<
  Network extends BlockchainNetwork,
> extends Error {
  network: Network
  readonly name = "WalletDoesntBelongAccountError"
  constructor(wallet: IWalletConnected<Network>, network: Network) {
    super(
      `The wallet "${wallet.info.address}" doesn't belong to the currently authenticated user.`
    )
    this.network = network
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
  | WalletDoesntBelongAccountError<BlockchainNetwork>
  | WalletConnectedButNoAccountAuthenticatedError
  | AccountAuthenticatedButNoWalletConnectedError
