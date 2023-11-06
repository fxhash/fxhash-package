import { TransactionReceipt } from "viem"
import { ContractOperation } from "@fxhash/contracts-shared"
import { EthereumWalletManager } from "../Wallet"

export abstract class EthereumContractOperation<Params>
  implements ContractOperation<Params>
{
  manager: EthereumWalletManager
  params: Params

  constructor(manager: EthereumWalletManager, params: Params) {
    this.manager = manager
    this.params = params
  }

  abstract prepare(): Promise<void>

  /**
   * The actual calls to the contracts, which results in some Transaction
   * Wallet Operation and can be observed to track the success/failure of
   * the transaction emitted
   */
  abstract call(): Promise<TransactionReceipt | string>

  /**
   * Each Contract Operation should implement a success message based on the
   * operation parameters, and so to provide meaningful feedback to users on
   * different parts of the front.
   * todo: define appropriate type
   */
  abstract success(): string
}

// a generic type for ContractOperation polymorphism
export type TEthereumContractOperation<TParams> = new (
  manager: EthereumWalletManager,
  params: TParams
) => EthereumContractOperation<TParams>

export { ContractOperation }
