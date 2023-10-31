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
  abstract call(): Promise<TransactionReceipt>
  abstract success(): string
}

// a generic type for ContractOperation polymorphism
export type TEthereumContractOperation<TParams> = new (
  manager: EthereumWalletManager,
  params: TParams
) => EthereumContractOperation<TParams>

export { ContractOperation }
