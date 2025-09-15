import type {
  ContractAbstraction,
  Wallet,
  WalletOperation,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { TezosContractOperation } from "./ContractOperation"
import type { CollectionOffer } from "@fxhash/shared"

export type TCollectionOfferCancelOperationParams = {
  offer: Pick<CollectionOffer, "id">
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
    return this.contract.methodsObject
      .collection_offer_cancel(this.params.offer.id)
      .send()
  }

  success(): string {
    return "You have cancelled your collection offer"
  }
}
