import { ContractAbstraction, Wallet, WalletOperation } from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { displayMutez } from "../../utils/units"
import { TezosContractOperation } from "./ContractOperation"
import { Listing, NFTArticle } from "@fxhash/shared"

export type TListingV3AcceptOperationParams = {
  listing: Listing
  article: NFTArticle
  amount: number
}

/**
 * List a gentk on the Marketplace
 */
export class TezosListingV3AcceptOperation extends TezosContractOperation<TListingV3AcceptOperationParams> {
  marketplaceContract?: ContractAbstraction<Wallet>

  async prepare() {
    this.marketplaceContract = await this.manager.getContract(
      FxhashContracts.MARKETPLACE_V3
    )
  }

  async call(): Promise<WalletOperation> {
    return this.marketplaceContract!.methodsObject.listing_accept({
      listing_id: this.params.listing.id,
      amount: this.params.amount,
      referrers: null,
    }).send({
      amount: this.params.listing.price * this.params.amount,
      mutez: true,
    })
  }

  success(): string {
    return `You have bought ${this.params.amount} edition of ${
      this.params.article.title
    } for ${displayMutez(this.params.listing.price)} tez`
  }
}
