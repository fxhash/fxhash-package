import { BlockchainType } from "@fxhash/shared"
import {
  WalletsConnectorChainUnavailable,
  WalletsConnectorNoSupportForChain,
} from "./errors.js"
import { type PublicClient, type WalletClient } from "viem"

export type MapChainToWalletConnector<Chain extends BlockchainType> = {
  [K in BlockchainType]: {
    [BlockchainType.BASE]: IEvmWalletConnector
    [BlockchainType.ETHEREUM]: IEvmWalletConnector
    [BlockchainType.TEZOS]: ITezosWalletConnector
  }[K]
}[Chain]

/**
 * @author fxhash
 *
 * A fxhash WalletsConnector can be used to expose any kind of wallet interface
 * to fxhash modules. A Wallet Connector may expose some interfaces to sign
 * payloads on Tezos, Ethereum or Base. Wallet Connectors go through a particular
 * lifecycle during the initialization of the fxhash client, ensuring each
 * connector can properly synchronize their internal state before they can used
 * the client.
 */
export interface IWalletsConnector {
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
   * @throws {WalletsConnectorNoSupportForChain
   *         | WalletsConnectorChainUnavailable}
   */
  getWalletConnector: <Chain extends BlockchainType>(
    chain: Chain
  ) => MapChainToWalletConnector<Chain>
}

export interface IEvmWalletConnector {
  getViemClients: () => Promise<{
    public: PublicClient
    wallet: WalletClient
  }>
}

export interface ITezosWalletConnector {}
