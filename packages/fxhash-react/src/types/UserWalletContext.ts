import {
  BlockchainType,
  PendingSigningRequestError,
  PromiseResult,
  UserRejectedError,
} from "@fxhash/contracts-shared"
import { TezosWalletManager } from "@fxhash/contracts/index"
import { EthereumWalletManager } from "@fxhash/eth-sdk/index"

interface BaseWalletAuthorization {
  network: BlockchainType
  payload: string
  signature: string
}
export interface TezosWalletAuthorization extends BaseWalletAuthorization {
  publicKey: string
}
export interface EthereumWalletAuthorization extends BaseWalletAuthorization {}
export type BlockchainAuthorization =
  | TezosWalletAuthorization
  | EthereumWalletAuthorization

export interface IConnexionPayload {
  address: string
  authorization: BlockchainAuthorization
}

/**
 * Shared interface between all the User Wallet Provider Contexts, providing an
 * abstraction on top of the blockchain-specific implementations.
 */
export interface TUserWalletContext {
  /**
   * The wallet manager which handles
   */
  walletManager: TezosWalletManager | EthereumWalletManager | null

  /**
   * The wallet address
   */
  address: string | null

  /**
   * When the wallet is properly initialized, with the account properly loaded
   * in-memory
   */
  initialized: boolean

  /**
   * Whether a wallet is connected or not
   */
  connected: boolean

  /**
   * Performs the following tasks, in series:
   * - syncs the wallet locally by requesting permissions to interact with app
   * - sign a payload
   * It resolves with the payload signed, or with an error if any.
   */
  connect: () => PromiseResult<
    IConnexionPayload,
    UserRejectedError | PendingSigningRequestError
  >

  /**
   * Disconnect the wallet from the application, eventually releasing the
   * appropriate resources from memory, and updating the state accordingly.
   */
  disconnect: () => void
}
