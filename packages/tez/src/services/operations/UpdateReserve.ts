import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import {
  FxhashCollabFactoryCalls,
  FxhashContracts,
} from "../../types/Contracts"
import { mapReserveDefinition } from "@/utils/generative-token/reserve"
import { packReserveData } from "../../utils/pack/reserves"
import { EBuildableParams, pack } from "../parameters-builder/BuildParameters"
import { TezosContractOperation } from "./ContractOperation"
import { GenerativeToken, IReserve, UserType } from "@fxhash/shared"

export type TUpdateReservesOperationParams = {
  reserves: IReserve<string>[]
  token: GenerativeToken
}

/**
 * Updates the pricing of a Generative Token
 */
export class TezosUpdateReservesOperation extends TezosContractOperation<TUpdateReservesOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null
  collab = false

  async prepare() {
    this.collab = this.params.token.author.type === UserType.COLLAB_CONTRACT_V1
    this.contract = await this.manager.getContract(
      this.collab ? this.params.token.author.id : FxhashContracts.ISSUER
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    // let's build the reserve array (by packing)
    const reserves = this.params.reserves.map(reserve => ({
      amount: reserve.amount,
      method_id: mapReserveDefinition[reserve.method].id,
      data: packReserveData(reserve as any),
    }))

    const params = {
      issuer_id: this.params.token.id,
      reserves: reserves,
    }

    // if the author is a collab contract, we have to call the collab contract
    // proposal EP instead
    if (this.collab) {
      const packed = pack(params, EBuildableParams.UPDATE_RESERVE)
      return this.contract!.methodsObject.make_proposal({
        call_id: FxhashCollabFactoryCalls.UPDATE_RESERVE,
        call_params: packed,
      }).send()
    } else {
      return this.contract!.methodsObject.update_reserve(params).send()
    }
  }

  success(): string {
    return this.collab
      ? `A request to update the reserves of ${this.params.token.name} was successfully sent`
      : `The reserves of ${this.params.token.name} was successfully updated`
  }
}
