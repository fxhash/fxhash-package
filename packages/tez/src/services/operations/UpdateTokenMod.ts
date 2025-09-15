import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { TezosContractOperation } from "./ContractOperation"
import { GenerativeToken } from "@fxhash/shared"

export type TUpdateTokenModOperationParams = {
  token: GenerativeToken
  tags: number[]
}

/**
 * Update the general settings of the an issuer
 * issuer > update_issuer
 */
export class TezosUpdateTokenModOperation extends TezosContractOperation<TUpdateTokenModOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(FxhashContracts.ISSUER)
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.update_token_mod({
      issuer_id: this.params.token.id,
      tags: this.params.tags,
    }).send()
  }

  success(): string {
    return `You have updated the labels of the project "${this.params.token.name}"`
  }
}
