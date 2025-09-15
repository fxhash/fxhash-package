import { WalletOperation } from "@taquito/taquito"
import { ContractOperation, BlockchainType } from "@fxhash/shared"
import { TezosWalletManager } from "../Wallet"

export abstract class TezosContractOperation<Params> extends ContractOperation<
  TezosWalletManager,
  Params,
  WalletOperation
> {}

// a generic type for ContractOperation polymorphism
export type TTezosContractOperation<TParams> = new (
  manager: TezosWalletManager,
  params: TParams,
  chain: BlockchainType
) => TezosContractOperation<TParams>

export type TAnyContractOperation<Params> = TTezosContractOperation<Params>
