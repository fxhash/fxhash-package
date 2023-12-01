import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import {
  FxhashCollabFactoryCalls,
  FxhashContracts,
} from "../../types/Contracts"
import { GenerativeToken } from "../../types/entities/GenerativeToken"
import { UserType } from "../../types/entities/User"
import { EBuildableParams, pack } from "../parameters-builder/BuildParameters"
import { TezosContractOperation } from "./ContractOperation"

export type TBurnSupplyV3OperationParams = {
  token: GenerativeToken
  supply: number
}

/**
 * Burns some supply of a Generative Token
 */
export class TezosBurnSupplyV3Operation extends TezosContractOperation<TBurnSupplyV3OperationParams> {
  contract: ContractAbstraction<Wallet> | null = null
  collab = false

  async prepare() {
    this.collab = this.params.token.author.type === UserType.COLLAB_CONTRACT_V1
    this.contract = await this.manager.getContract(
      this.collab ? this.params.token.author.id : FxhashContracts.ISSUER_V3
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    const params = {
      issuer_id: this.params.token.id,
      amount: this.params.supply,
    }

    // if the author is a collab contract, we have to call the collab contract
    // proposal EP instead
    if (this.collab) {
      const packed = pack(params, EBuildableParams.BURN_SUPPLY)
      return this.contract!.methodsObject.make_proposal({
        call_id: FxhashCollabFactoryCalls.BURN_SUPPLY_V3,
        call_params: packed,
      }).send()
    } else {
      return this.contract!.methodsObject.burn_supply(params).send()
    }
  }

  success(): string {
    return this.collab
      ? `A proposal to burn ${this.params.supply} editions of "${this.params.token.name}" was successfully sent`
      : `You have burnt ${this.params.supply} editions of "${this.params.token.name}"`
  }
}
