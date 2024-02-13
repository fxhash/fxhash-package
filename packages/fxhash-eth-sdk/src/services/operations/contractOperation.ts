import {
  BlockchainType,
  ContractOperation,
  TransactionType,
} from "@fxhash/contracts-shared"
import { EthereumWalletManager } from "../Wallet"

export abstract class EthereumContractOperation<
  Params,
> extends ContractOperation<
  // ! TODO: to fix
  //@ts-ignore
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
