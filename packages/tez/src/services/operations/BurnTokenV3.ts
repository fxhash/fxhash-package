import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import {
  FxhashCollabFactoryCalls,
  FxhashContracts,
} from "../../types/Contracts"
import { GenerativeToken, UserType } from "@fxhash/shared"
import { EBuildableParams, pack } from "../parameters-builder/BuildParameters"
import { TezosContractOperation } from "./ContractOperation"

export type TBurnTokenV3OperationParams = {
  token: GenerativeToken
}

/**
 * Update the general settings of the an issuer
 * issuer > update_issuer
 */
export class TezosBurnTokenV3Operation extends TezosContractOperation<TBurnTokenV3OperationParams> {
  contract: ContractAbstraction<Wallet> | null = null
  collab = false

  async prepare() {
    this.collab = this.params.token.author.type === UserType.COLLAB_CONTRACT_V1
    this.contract = await this.manager.getContract(
      this.collab ? this.params.token.author.id : FxhashContracts.ISSUER_V3
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    const params = this.params.token.id

    // if the author is a collab contract, we have to call the collab contract
    // proposal EP instead
    if (this.collab) {
      const packed = pack(params, EBuildableParams.BURN)
      return this.contract!.methodsObject.make_proposal({
        call_id: FxhashCollabFactoryCalls.BURN_V3,
        call_params: packed,
      }).send()
    } else {
      return this.contract!.methodsObject.burn(params).send()
    }
  }

  success(): string {
    return this.collab
      ? `A proposal to burn ${this.params.token.name} was successfully sent`
      : `You have burnt ${this.params.token.name}. [insert dramatic music]`
  }
}
