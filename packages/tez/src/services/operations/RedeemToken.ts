import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { redeemTotalCost } from "@/utils/entities/redeem"
import { TezosContractOperation } from "./ContractOperation"
import { Objkt, RedeemableDetails } from "@fxhash/shared"

export type TRedeemTokenParams = {
  redeemable: RedeemableDetails
  token: Objkt
  payload: {
    consumer: string
    options: number[]
    salt: string
    token_id: number
  }
  signature: string
}

/**
 * Redeem a token
 * The Smart Contract will check if the user truly owns the token and if so,
 * it will mark the token as being redeemed in its storage.
 */
export class TezosRedeemTokenOperation extends TezosContractOperation<TRedeemTokenParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      this.params.redeemable.address
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.consume({
      payload: this.params.payload,
      auth_signature: this.params.signature,
    }).send({
      amount: redeemTotalCost(
        this.params.redeemable,
        this.params.payload.options
      ),
      mutez: true,
    })
  }

  success(): string {
    return `You have successfully redeemed ${this.params.token.name} for ${this.params.redeemable.name}`
  }
}
