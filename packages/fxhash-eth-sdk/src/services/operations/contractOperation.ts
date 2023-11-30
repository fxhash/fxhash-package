import { TransactionReceipt } from "viem"
import { ContractOperation } from "@fxhash/contracts-shared"
import { EthereumWalletManager } from "../Wallet"

export abstract class EthereumContractOperation<
  Params
> extends ContractOperation<
  EthereumWalletManager,
  Params,
  TransactionReceipt | string
> {}

// a generic type for ContractOperation polymorphism
export type TEthereumContractOperation<TParams> = new (
  manager: EthereumWalletManager,
  params: TParams
) => EthereumContractOperation<TParams>

export { ContractOperation }
