/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { BlockchainType, PromiseResult, Result } from "@fxhash/shared"
import {
  Transport,
  type PublicClient,
  type WalletClient,
  Chain,
  Account,
  Address,
} from "viem"
import { BlockchainNotSupported, EvmClientsNotAvailable } from "./errors.js"
import { type BeaconWallet } from "@taquito/beacon-wallet"
import { type Signer } from "@taquito/taquito"
import { WalletsConnectorEventEmitter } from "./events.js"

export type MapChainToWalletConnector<Chain extends BlockchainType> = {
  [K in BlockchainType]: {
    [BlockchainType.BASE]: IEvmWalletConnector
    [BlockchainType.ETHEREUM]: IEvmWalletConnector
    [BlockchainType.TEZOS]: ITezosWalletConnector
  }[K]
}[Chain]

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
  getWalletConnector: <Chain extends BlockchainType>(
    chain: Chain
  ) => MapChainToWalletConnector<Chain>
}

/**
 * Some view clients ready for interactions.
 */
export interface IEvmWalletConnectorClients {
  wallet: WalletClient<Transport, Chain, Account>
  public: PublicClient<Transport, Chain>
}

/**
 * Interfaces which must be implemented by Wallet Connectors for supporting
 * our stack on EVM.
 */
export interface IEvmWalletConnector {
  /**
   * @returns A promise which resolves with an object of the wallet clients
   * ready for interactions, or rejects if no such clients are avaiable.
   */
  getClients: (
    chain: BlockchainType
  ) => PromiseResult<
    IEvmWalletConnectorClients,
    EvmClientsNotAvailable | BlockchainNotSupported
  >

  getAccount: () => {
    address: Address
  } | null
}

/**
 * Interfaces which must be implemented by Wallet Connectors for supporting
 * our stack on Tezos.
 */
export interface ITezosWalletConnector {
  /**
   * @returns Either a Beacon Wallet instance or an arbitrary signer. Both are
   * compatible with the rest of the stack.
   */
  getWallet: () => BeaconWallet | Signer
}
