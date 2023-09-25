import { WalletOperation } from "@taquito/taquito"
import { TezosWalletManager } from "../Wallet"

// Generic Interfaces
interface IWalletOperation {
  // ...
}

interface IWalletManager {
  // ...
}

/**
 * A Contract Operation defines a set of operations to run at different
 * moments of the lifecycle of an operation. When an operation needs to be sent,
 * its corresponding class is instanciated with the operation parameters and
 * the following steps are performed:
 * - prepare: preparation steps before calling a contract
 * - call: the actual contract call
 * - success: a message is emitted
 * In case of failure, the whole lifecycle restarts, if the RPC is at cause it
 * is swapped with another one. This logic is handled by an external runner.
 */

interface IContractOperation<Params> {
  manager: IWalletManager
  params: Params
  /**
   * Runs the required preparations (such as fetching the contracts to get
   * the entrypoints signature), or any other sync/async operation considered
   * not to be a part of the actual contract call.
   * Can store required values in the members of the instance.
   */
  prepare(): Promise<void>

  /**
   * The actual calls to the contracts, which results in some Transaction
   * Wallet Operation and can be observed to track the success/failure of
   * the transaction emitted
   */
  call(): Promise<IWalletOperation>

  /**
   * Each Contract Operation should implement a success message based on the
   * operation parameters, and so to provide meaningful feedback to users on
   * different parts of the front.
   * todo: define appropriate type
   */
  success(): string
}

export abstract class TezosContractOperation<Params>
  implements IContractOperation<Params>
{
  manager: TezosWalletManager
  params: Params

  constructor(manager: TezosWalletManager, params: Params) {
    this.manager = manager
    this.params = params
  }

  abstract prepare(): Promise<void>
  abstract call(): Promise<WalletOperation>
  abstract success(): string
}

export abstract class EthereumContractOperation<Params>
  implements IContractOperation<Params>
{
  manager: any /* EthereumWalletManager */
  params: Params

  constructor(manager: any /* EthereumWalletManager */, params: Params) {
    this.manager = manager
    this.params = params
  }

  abstract prepare(): Promise<void>
  abstract call(): Promise<any /* EthereumWalletOperation */>
  abstract success(): string
}

// a generic type for TezosContractOperation polymorphism
type TTezosContractOperation<Params> = new (
  manager: TezosWalletManager,
  params: Params
) => TezosContractOperation<Params>

// a generic type for EthereumContractOperation polymorphism
type TEthereumContractOperation<Params> = new (
  manager: any, // EthereumWalletManager,
  params: Params
) => EthereumContractOperation<Params>

export type TAnyContractOperation<Params> =
  | TTezosContractOperation<Params>
  | TEthereumContractOperation<Params>

export enum BlockchainType {
  TEZOS = "TEZOS",
  ETHEREUM = "ETHEREUM",
}
