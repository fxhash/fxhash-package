import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import {
  FxhashCollabFactoryCalls,
  FxhashContracts,
} from "../../types/Contracts"
import { packPricing } from "../../utils/pack/pricing"
import { transformPricingFormToNumbers } from "../../utils/transformers/pricing"
import { EBuildableParams, pack } from "../parameters-builder/BuildParameters"
import { TezosContractOperation } from "./ContractOperation"
import { GenerativeToken, UserType, GenTokPricingForm } from "@fxhash/shared"

export type TUpdatePricingOperationParams = {
  projectId: string
  data: GenTokPricingForm<string>
  collabAddress?: string
}

/**
 * Updates the pricing of a Generative Token
 */
export class TezosUpdatePricingOperation extends TezosContractOperation<TUpdatePricingOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      this.params.collabAddress || FxhashContracts.ISSUER
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    // transform the string values in the form into some numbers so that
    // it can be sent to contract correctly (or packed)
    const numbered = transformPricingFormToNumbers(this.params.data)

    // let's pack the pricing (only sub-field "details" gets packed)
    const packedPricing = packPricing(numbered)

    const params = {
      issuer_id: this.params.projectId,
      details: packedPricing.details,
    }

    // if the author is a collab contract, we have to call the collab contract
    // proposal EP instead
    if (this.params.collabAddress) {
      const packed = pack(params, EBuildableParams.UPDATE_PRICE)
      return this.contract!.methodsObject.make_proposal({
        call_id: FxhashCollabFactoryCalls.UPDATE_PRICE,
        call_params: packed,
      }).send()
    } else {
      return this.contract!.methodsObject.update_price(params).send()
    }
  }

  success(): string {
    return this.params.collabAddress
      ? `A request to update the pricing of ${this.params.projectId} was successfully sent`
      : `The pricing of ${this.params.projectId} was successfully updated`
  }
}
