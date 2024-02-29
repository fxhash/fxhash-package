import { ContractAbstraction, Wallet, WalletOperation } from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { displayMutez } from "../../utils/units"
import { TezosContractOperation } from "./ContractOperation"
import { Objkt, Offer } from "@fxhash/shared"

export type TOfferCancelOperationParams = {
  offer: Offer
  objkt: Objkt
}

/**
 * List a gentk on the Marketplace
 */
export class OfferCancelOperation extends TezosContractOperation<TOfferCancelOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      FxhashContracts.MARKETPLACE_V2
    )
  }

  async call(): Promise<WalletOperation> {
    return this.contract!.methodsObject.offer_cancel(
      this.params.offer.id
    ).send()
  }

  success(): string {
    return `You have cancelled your offer of ${displayMutez(
      this.params.offer.price
    )} on ${this.params.objkt.name}`
  }
}
