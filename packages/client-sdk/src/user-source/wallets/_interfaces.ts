import {
  WalletClient,
  type Address,
  Transport,
  Chain,
  Account,
  PublicClient,
} from "viem"
import { type Signer } from "@taquito/taquito"
import { type BeaconWallet } from "@taquito/beacon-wallet"
import { PromiseResult, type BlockchainNetwork } from "@fxhash/shared"
import { WalletManagersMap, type IUserSource } from "../_interfaces.js"
import { EventEmitter } from "@fxhash/utils"
import { EthereumWalletManager } from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"
import { WalletError } from "../_errors.js"

/**
 * A Wallets Source exposes some utilities to handle multi-chain wallets through
 * a common interface.
 */
export interface IWalletsSource extends IUserSource {
  /**
   * Wallet sources MUST return a Managers Map
   */
  getWalletManagers: () => WalletManagersMap

  /**
   * Wallet sources cannot handle accounts directly and must return null when
   * trying to access the account.
   */
  getAccount: () => null

  /**
   * Whether the wallet source supports a given network.
   */
  supports: (network: BlockchainNetwork) => boolean

  /**
   * Given a network (from those supported by fxhash), returns a Wallet
   * instance which can be used by the fxhash client stack to interact with
   * said wallet.
   */
  getWallet: <N extends BlockchainNetwork>(
    network: N
  ) => MapNetworkToWalletInterface<N> | null

  /**
   * Disconnect the wallet currently active (if any) on a given network.
   */
  disconnect: (network: BlockchainNetwork) => Promise<void>

  /**
   * Disconnect all the wallets currently active (if any).
   */
  disconnectAll: () => Promise<void>
}

/**
 * Generic information about the wallet.
 */
export interface IWalletInfo<AddressType extends string = string> {
  address: AddressType
}
type GetWalletInfo<AddressType extends string = string> =
  () => IWalletInfo<AddressType> | null

/**
 * Common interface for a network-specific wallet.
 */
export interface ICommonWallet {
  emitter: WalletEventEmitter

  /**
   * @returns General information about the wallet (null if not connected).
   */
  getInfo: GetWalletInfo

  /**
   * Attempts to disconnect the wallet.
   */
  disconnect: () => Promise<void>

  /**
   * Initialize the connector.
   */
  init?: () => Promise<void>

  /**
   * Release events/memory usage.
   */
  release?: () => void
}

/**
 * Must be implemented by a wallet abstraction for it to be supported by our
 * EVM stack.
 */
export interface IEvmWallet extends ICommonWallet {
  /**
   * @returns A promise which resolves with an object of the wallet clients
   * ready for interactions, or rejects if no such clients are avaiable.
   */
  getClients: () => PromiseResult<IEvmWalletConnectorClients, WalletError>

  getInfo: GetWalletInfo<Address>
}

/**
 * Must be implemented by a wallet abstraction for it to be supported by our
 * Tezos stack.
 */
export interface ITezosWallet extends ICommonWallet {
  /**
   * @returns Either a Beacon Wallet instance or an arbitrary signer. Both are
   * compatible with the rest of the stack.
   */
  getWallet: () => BeaconWallet | Signer
}

export type MapNetworkToWalletInterface<N extends BlockchainNetwork> = {
  [K in BlockchainNetwork]: {
    [BlockchainNetwork.ETHEREUM]: IEvmWallet
    [BlockchainNetwork.TEZOS]: ITezosWallet
  }[K]
}[N]

export type MapNetworkToWalletManager<N extends BlockchainNetwork> = {
  [K in BlockchainNetwork]: {
    [BlockchainNetwork.ETHEREUM]: EthereumWalletManager
    [BlockchainNetwork.TEZOS]: TezosWalletManager
  }[K]
}[N]

/**
 * Some view clients ready for interactions.
 */
export interface IEvmWalletConnectorClients {
  wallet: WalletClient<Transport, Chain, Account>
  public: PublicClient<Transport, Chain>
}

export type WalletEventsTypemap = {
  "wallet-changed": IWalletInfo | null
  error: any
}

export class WalletEventEmitter extends EventEmitter<WalletEventsTypemap> {}
