import {
  BlockchainType,
  ContractOperation,
  TransactionType,
} from "@fxhash/shared"
import { EthereumWalletManager } from "../Wallet.js"

export abstract class EthereumContractOperation<
  Params,
> extends ContractOperation<
  // @ts-ignore https://github.com/fxhash/monorepo/issues/955
  EthereumWalletManager,
  Params,
  { type: TransactionType; hash: string }
> {}

// a generic type for ContractOperation polymorphism
export type TEthereumContractOperation<TParams> = new (
  manager: EthereumWalletManager,
  params: TParams,
  chain: BlockchainType
) => EthereumContractOperation<TParams>

export { ContractOperation }
