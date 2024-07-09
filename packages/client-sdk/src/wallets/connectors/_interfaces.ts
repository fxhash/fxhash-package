/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainEnv, BlockchainType, PromiseResult } from "@fxhash/shared"
import {
  Transport,
  type PublicClient,
  type WalletClient,
  Chain,
  Account,
  Address,
} from "viem"
import {
  BlockchainNotSupported,
  EvmClientsNotAvailable,
  EvmWagmiClientGenerationError,
} from "./errors.js"
import { type BeaconWallet } from "@taquito/beacon-wallet"
import { type Signer } from "@taquito/taquito"
import { WalletsConnectorEventEmitter } from "./events.js"

export type MapEnvToWalletConnector<Env extends BlockchainEnv> = {
  [K in BlockchainEnv]: {
    [BlockchainEnv.EVM]: IEvmWalletConnector
    [BlockchainEnv.TEZOS]: ITezosWalletConnector
  }[K]
}[Env]

/**
 * A fxhash WalletsConnector can be used to expose any kind of wallet interface
 * to fxhash modules. A Wallet Connector may expose some interfaces to sign
 * payloads on Tezos, Ethereum or Base. Wallet Connectors go through a particular
 * lifecycle during the initialization of the fxhash client, ensuring each
 * connector can properly synchronize their internal state before they can used
 * the client.
 */
export interface IWalletsConnector extends WalletsConnectorEventEmitter {
  /**
   * In the client lifecycle, all the provided WalletsConnector are initialized
   * when the application starts. This can be used to instanciate/initialize
   * connectors, and eventually synchronize the WalletsConnector state before
   * it can be used by the rest of the application.
   */
  init: () => Promise<void>

  /**
   * Checks whether the Wallets Connector supports a given blockchain.
   */
  supportsChain: (chain: BlockchainType) => boolean

  /**
   * Given a blockchain (from those supported by fxhash), returns a Wallet
   * Connector which can be used with the rest of the fxhash stack to interact
   * with the wallet.
   *
   * @param chain Blockchain for which a wallet connector should be returned
   *
   * @returns A Wallet Connector associated with the given blockchain
   *
   * @throws {import("./errors.js").WalletsConnectorNoSupportForChain
   *        | import("./errors.js").WalletsConnectorChainUnavailable}
   */
  getWalletConnector: <Env extends BlockchainEnv>(
    env: Env
  ) => MapEnvToWalletConnector<Env> | null

  /**
   * @returns A list of every environment-specific active connectors. Depending
   * on the Wallet Connector being used, `active` can refer to slightly
   * different states, but in general can be described as "which can receive
   * a wallet connection"
   */
  getActiveConnectors: () => IBaseWalletConnector[]

  /**
   * Disconnect wallet on a given environment.
   */
  disconnect: (env: BlockchainEnv) => Promise<void>

  /**
   * Disconnect all the wallets currently connected.
   */
  disconnectAll: () => Promise<void>
}

/**
 * Some view clients ready for interactions.
 */
export interface IEvmWalletConnectorClients {
  wallet: WalletClient<Transport, Chain, Account>
  public: PublicClient<Transport, Chain>
}

export interface IBaseWalletConnector {
  /**
   * Initialize the connector.
   */
  init: () => Promise<void>
  /**
   * Release events/memory usage.
   */
  release: () => void
  /**
   * Attempts to disconnect the wallet.
   */
  disconnect: () => Promise<void>
}

/**
 * Interfaces which must be implemented by Wallet Connectors for supporting
 * our stack on EVM.
 */
export interface IEvmWalletConnector extends IBaseWalletConnector {
  /**
   * @returns A promise which resolves with an object of the wallet clients
   * ready for interactions, or rejects if no such clients are avaiable.
   */
  getClients: (
    chain: BlockchainType
  ) => PromiseResult<
    IEvmWalletConnectorClients,
    | EvmClientsNotAvailable
    | BlockchainNotSupported
    | EvmWagmiClientGenerationError
  >

  getAccount: () => {
    address: Address
  } | null
}

/**
 * Interfaces which must be implemented by Wallet Connectors for supporting
 * our stack on Tezos.
 */
export interface ITezosWalletConnector extends IBaseWalletConnector {
  /**
   * @returns Either a Beacon Wallet instance or an arbitrary signer. Both are
   * compatible with the rest of the stack.
   */
  getWallet: () => BeaconWallet | Signer
}
