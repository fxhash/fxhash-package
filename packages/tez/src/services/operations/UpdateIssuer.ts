import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import {
  FxhashCollabFactoryCalls,
  FxhashContracts,
} from "../../types/Contracts"
import { transformUpdateIssuerFormToNumbers } from "../../utils/transformers/update-issuer"
import { EBuildableParams, pack } from "../parameters-builder/BuildParameters"
import { TezosContractOperation } from "./ContractOperation"

export interface UpdateIssuerData {
  enabled: boolean
  royalties: string
  splitsPrimary: {
    address: string
    pct: number
  }[]
  splitsSecondary: {
    address: string
    pct: number
  }[]
}

export type TUpdateIssuerOperationParams = {
  projectId: string
  data: UpdateIssuerData
  collabAddress?: string
}

/**
 * Update the general settings of the an issuer
 * issuer > update_issuer
 */
export class TezosUpdateIssuerOperation extends TezosContractOperation<TUpdateIssuerOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null
  collab = false

  async prepare() {
    this.contract = await this.manager.getContract(
      this.params.collabAddress || FxhashContracts.ISSUER
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    // transform the string values in the form into some numbers so that
    // it can be sent to contract correctly (or packed)
    const numbered = transformUpdateIssuerFormToNumbers(this.params.data)

    const params = {
      issuer_id: this.params.projectId,
      enabled: numbered.enabled,
      royalties: numbered.royalties,
      primary_split: this.params.data.splitsPrimary,
      royalties_split: this.params.data.splitsSecondary,
    }

    // if the author is a collab contract, we have to call the collab contract
    // proposal EP instead
    if (!!this.params.collabAddress) {
      const packed = pack(params, EBuildableParams.UPDATE_ISSUER)

      return this.contract!.methodsObject.make_proposal({
        call_id: FxhashCollabFactoryCalls.UPDATE_ISSUER,
        call_params: packed,
      }).send()
    } else {
      return this.contract!.methodsObject.update_issuer(params).send()
    }
  }

  success(): string {
    return !!this.params.collabAddress
      ? `A proposal to update ${this.params.projectId} was successfully sent`
      : `Your project ${this.params.projectId} was updated`
  }
}
