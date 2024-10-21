import {
  BlockchainNetwork,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from "@fxhash/shared"
import { EventEmitter } from "@fxhash/utils"
import {
  GetSingleUserAccountResult,
  MapNetworkToAddressType,
  MapNetworkToWalletManager,
  WalletsMap,
} from "./_index.js"
import { AuthenticationError, UserConsistencyError } from "@/index.js"
import { LinkWalletError, WithGqlErrors } from "@fxhash/errors"

/**
 * A generic-purpose User Source interface. A user source can be an account,
 * some wallets or both of these. This generic interface allows composability
 * between multiple different sources using this shared interface.
 * User Sources emit events using their emitters, and events are passed up the
 * graph of sources to broadcast state changes. Some graph nodes can be used
 * to control the flow of events based on some particular contraints.
 */
export interface IUserSource {
  /**
   * Probably the most important element, the emitter is used by the source
   * to broadcast changes in the state.
   */
  emitter: UserSourceEventEmitter

  /**
   * Initialize the source. An initialization can result in the emission of
   * events.
   */
  init: () => Promise<void>

  /**
   * @returns Whether the source has been intialized or not
   */
  initialized: () => boolean

  /**
   * Remove event listeners, frees memory...
   * Should be could when source should be disposed.
   */
  release?: () => void

  /**
   * Should return the account currently authenticated with the source, or none
   * if not.
   * **Note**: not all the sources can return an account, for instance Wallet
   * Sources will always return null here.
   */
  getAccount: () => GetSingleUserAccountResult | null

  /**
   * Logout from the account currently authenticated. Has no effect on sources
   * where there isn't any account management (such as wallet sources.)
   */
  logoutAccount: () => Promise<void>

  /**
   * Returns a map of { BlockchainNetwork -> Wallet } which holds info about
   * wallets currently connected, their source, and eventually a Wallet Manager
   * if the wallet is connected.
   */
  getWallets: () => WalletsMap | null

  /**
   * Returns a Wallet on a given Blockchain Network. Returns `null` if no walelt
   * source is available on the given network.
   */
  getWallet: <N extends BlockchainNetwork>(network: N) => IWallet<N> | null

  /**
   * Disconnect a wallet on a given network. Has no effect if the source doesn't
   * support wallets.
   */
  disconnectWallet: (network: BlockchainNetwork) => Promise<void>

  /**
   * Disconnect all the wallets currently connected on all the networks. Has no
   * effect if the source doesn't support wallets.
   */
  disconnectAllWallets: () => Promise<void>
}

/**
 * A Wallets Source exposes some utilities to handle multi-chain wallets through
 * a common interface.
 */
export interface IWalletsSource extends IUserSource {
  // overrides
  getWallets: () => WalletsMap
  getAccount: () => null

  /**
   * Whether the wallet source supports a given network.
   */
  supports: (network: BlockchainNetwork) => boolean

  /**
   * Different wallet sources can implement different sets of requirements
   */
  requirements: () => IWalletRequirements
}

/**
 * Abstract interface representing a Wallet. This data may be returned by
 * Wallet Sources to describe the current state of a wallet on a given network.
 */
export interface IWallet<
  Net extends BlockchainNetwork,
  WalletsSource extends IWalletsSource = IWalletsSource,
> {
  /**
   * The Wallet currently connected. If null, the wallet isn't connected.
   */
  connected: IWalletConnected<Net> | null

  /**
   * The Wallets Source which handles this Wallet.
   */
  source: WalletsSource
}

/**
 * Information and Wallet Manager instance of a wallet currently connected.
 */
export interface IWalletConnected<Net extends BlockchainNetwork> {
  manager: MapNetworkToWalletManager<Net>
  info: IWalletInfo<Net>
}

/**
 * Generic information about a Wallet.
 */
export interface IWalletInfo<Net extends BlockchainNetwork> {
  address: MapNetworkToAddressType<Net>
}

/**
 * An interface which describes some of the requirements of a wallet
 * implementation. These requirements give information about the behaviour of
 * the underlying wallet and allows consumer implementations to adapt their
 * behaviours based on the wallet requirements.
 */
export interface IWalletRequirements {
  /**
   * Whether the wallet implementation requires user input for signing payloads
   * & operations.
   */
  userInput: boolean
}

export type WalletChangedPayload =
  | {
      network: BlockchainNetwork.ETHEREUM
      wallet: IWallet<BlockchainNetwork.ETHEREUM>
    }
  | {
      network: BlockchainNetwork.TEZOS
      wallet: IWallet<BlockchainNetwork.TEZOS>
    }
export type WalletChangedEventData = WalletChangedPayload[]
export interface AccountUpdatedEventData {
  account: GetSingleUserAccountResult | null
}
export type UserSourceErrorEvents = {
  error:
    | AuthenticationError
    | UserConsistencyError
    | WithGqlErrors<LinkWalletError>
    // todo: these should be factorized
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
}

export type UserSourceEventsTypemap = {
  "wallets-changed": WalletChangedEventData
  "account-changed": AccountUpdatedEventData
  "user-changed": void
  error: UserSourceErrorEvents
}
export class UserSourceEventEmitter extends EventEmitter<UserSourceEventsTypemap> {}
