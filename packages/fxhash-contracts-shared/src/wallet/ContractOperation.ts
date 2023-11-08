import { WalletManager } from "./WalletManager"

export enum BlockchainType {
  TEZOS = "TEZOS",
  ETHEREUM = "ETHEREUM",
}

/**
 * A Contract Operation defines a set of operations to run at different
 * moments of the lifecycle of an operation. When an operation needs to be sent,
 * its corresponding class is instantiated with the operation parameters and
 * the following steps are performed:
 * - prepare: preparation steps before calling a contract
 * - call: the actual contract call
 * - success: a message is emitted
 * In case of failure, the whole lifecycle restarts, if the RPC is at cause it
 * is swapped with another one. This logic is handled by an external runner.
 */

export abstract class ContractOperation<
  TWalletManager extends WalletManager,
  TParams,
  TData
> {
  manager: TWalletManager
  params: TParams

  constructor(manager: TWalletManager, params: TParams) {
    this.manager = manager
    this.params = params
  }

  /**
   * Runs the required preparations (such as fetching the contracts to get
   * the entrypoints signature), or any other sync/async operation considered
   * not to be a part of the actual contract call.
   * Can store required values in the members of the instance.
   */
  abstract prepare(): Promise<void>

  /**
   * The actual calls to the contracts, which results in some Transaction
   * Wallet Operation and can be observed to track the success/failure of
   * the transaction emitted
   */
  abstract call(): Promise<TData>

  /**
   * Each Contract Operation should implement a success message based on the
   * operation parameters, and so to provide meaningful feedback to users on
   * different parts of the front.
   */
  abstract success(): string
}

// a generic type for ContractOperation polymorphism
export type TContractOperation<
  TWalletManager extends WalletManager,
  TParams,
  TData
> = new (manager: TWalletManager, params: TParams) => ContractOperation<
  TWalletManager,
  TParams,
  TData
>
