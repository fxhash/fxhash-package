import { ContractOperation, TransactionType } from "@fxhash/contracts-shared"
import { EthereumWalletManager } from "../Wallet"

export abstract class EthereumContractOperation<
  Params,
> extends ContractOperation<
  EthereumWalletManager,
  Params,
  { type: TransactionType; hash: string }
> {}

// a generic type for ContractOperation polymorphism
export type TEthereumContractOperation<TParams> = new (
  manager: EthereumWalletManager,
  params: TParams
) => EthereumContractOperation<TParams>

export { ContractOperation }
