import { ContractAbstraction, Wallet, WalletOperation } from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { TezosContractOperation } from "./ContractOperation"
import type { Listing } from "@fxhash/shared"

export type TListingV3AcceptOperationParams = {
  listing: Pick<Listing, "id" | "price">
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
    return this.marketplaceContract.methodsObject
      .listing_accept({
        listing_id: this.params.listing.id,
        amount: this.params.amount,
        referrers: null,
      })
      .send({
        amount: this.params.listing.price * this.params.amount,
        mutez: true,
      })
  }

  success(): string {
    return "you have successfully collected one edition"
  }
}
