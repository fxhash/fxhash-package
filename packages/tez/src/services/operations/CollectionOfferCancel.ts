import { ContractAbstraction, Wallet, WalletOperation } from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { displayMutez } from "../../utils/units"
import { TezosContractOperation } from "./ContractOperation"
import { CollectionOffer, GenerativeToken } from "@fxhash/shared"

export type TCollectionOfferCancelOperationParams = {
  offer: CollectionOffer
  token: GenerativeToken
}

/**
 * Withdraw a collection offer from the Marketplace
 */
export class CollectionOfferCancelOperation extends TezosContractOperation<TCollectionOfferCancelOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      FxhashContracts.MARKETPLACE_V2
    )
  }

  async call(): Promise<WalletOperation> {
    return this.contract!.methodsObject.collection_offer_cancel(
      this.params.offer.id
    ).send()
  }

  success(): string {
    return `You have cancelled your collection offer of ${displayMutez(
      this.params.offer.price
    )} on ${this.params.token.name}`
  }
}
