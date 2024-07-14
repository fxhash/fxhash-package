import { EthereumWalletManager } from "@fxhash/eth"
import { BlockchainNetwork } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { EventEmitter } from "@fxhash/utils"
import {
  GetSingleUserAccountResult,
  MapNetworkToWalletManager,
} from "./_index.js"

export type WalletChangedPayload =
  | {
      network: BlockchainNetwork.ETHEREUM
      manager: EthereumWalletManager | null
    }
  | {
      network: BlockchainNetwork.TEZOS
      manager: TezosWalletManager | null
    }
export type WalletChangedEventData = WalletChangedPayload[]

export interface AccountUpdatedEventData {
  account: GetSingleUserAccountResult | null
}

export type UserSourceEventsTypemap = {
  "wallets-changed": WalletChangedEventData
  "account-changed": AccountUpdatedEventData
  "user-changed": void
  error: any
}

export class UserSourceEventEmitter extends EventEmitter<UserSourceEventsTypemap> {}

export type WalletManagersMap = {
  [Net in BlockchainNetwork]?: MapNetworkToWalletManager<Net> | null
}

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
   * Returns a map of the active wallet managers. Will always be null if the
   * source doesn't support wallets.
   */
  getWalletManagers: () => WalletManagersMap | null

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
