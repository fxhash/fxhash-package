import { WalletOperation } from "@taquito/taquito"
import { ContractOperation } from "@fxhash/contracts-shared"
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

export enum BlockchainType {
  TEZOS = "TEZOS",
  ETHEREUM = "ETHEREUM",
  BASE = "BASE",
}
