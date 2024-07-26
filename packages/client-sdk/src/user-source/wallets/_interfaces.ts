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
import {
  EthereumWalletManager,
  EthersAdapter,
  PrivateKeyAccount,
} from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"
import { WalletError } from "../_errors.js"

export interface IRequirements {
  /**
   * Whether the wallet implementation requires user input for signing payloads
   * & operations.
   */
  userInput: boolean
}

/**
 * A Wallets Source exposes some utilities to handle multi-chain wallets through
 * a common interface.
 */
export interface IWalletsSource extends IUserSource {
  /**
   * Wallet sources MUST return a Managers Map
   */
  getWalletManagers: () => WalletManagersMap

  getInfo: <N extends BlockchainNetwork>(network: N) => IWalletInfo<N> | null

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
   * Different wallet sources can implement different sets of requirements
   */
  requirements: () => IRequirements
}

/**
 * Generic information about the wallet.
 */
export interface IWalletInfo<Net extends BlockchainNetwork> {
  address: MapNetworkToAddressType<Net>
}
export type GetWalletInfo<Net extends BlockchainNetwork> =
  () => IWalletInfo<Net> | null

// /**
//  * Must be implemented by a wallet abstraction for it to be supported by our
//  * EVM stack.
//  */
// export interface IEvmWallet extends ICommonWallet {
//   /**
//    * @returns A promise which resolves with an object of the wallet clients
//    * ready for interactions, or rejects if no such clients are avaiable.
//    */
//   // getClients: () => PromiseResult<IEvmWalletConnectorClients, WalletError>

//   // getInfo: GetWalletInfo<Address>
// }

// /**
//  * Must be implemented by a wallet abstraction for it to be supported by our
//  * Tezos stack.
//  */
// export interface ITezosWallet extends ICommonWallet {
//   /**
//    * @returns Either a Beacon Wallet instance or an arbitrary signer. Both are
//    * compatible with the rest of the stack.
//    */
//   // getWallet: () => BeaconWallet | Signer
// }

export type MapNetworkToWalletManager<N extends BlockchainNetwork> = {
  [K in BlockchainNetwork]: {
    [BlockchainNetwork.ETHEREUM]: EthereumWalletManager
    [BlockchainNetwork.TEZOS]: TezosWalletManager
  }[K]
}[N]

export type MapNetworkToAddressType<N extends BlockchainNetwork> = {
  [K in BlockchainNetwork]: {
    [BlockchainNetwork.ETHEREUM]: Address
    [BlockchainNetwork.TEZOS]: string
  }[K]
}[N]

/**
 * Some view clients ready for interactions.
 */
export interface IEvmWalletConnectorClients {
  wallet: WalletClient<Transport, Chain, Account>
  public: PublicClient<Transport, Chain>
  signer?: PrivateKeyAccount
  ethersAdapterForSafe?: EthersAdapter
}

export type WalletEventsTypemap = {
  "wallet-changed": IWalletInfo<any> | null
  error: any
}

export class WalletEventEmitter extends EventEmitter<WalletEventsTypemap> {}
