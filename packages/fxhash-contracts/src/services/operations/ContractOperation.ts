import { WalletOperation } from "@taquito/taquito"
import { ContractOperation } from "@fxhash/contracts-shared"
import { TezosWalletManager } from "../Wallet"

export abstract class TezosContractOperation<Params>
  implements ContractOperation<Params>
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

// a generic type for ContractOperation polymorphism
export type TTezosContractOperation<TParams> = new (
  manager: TezosWalletManager,
  params: TParams
) => TezosContractOperation<TParams>

export abstract class EthereumContractOperation<Params>
  implements ContractOperation<Params>
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
