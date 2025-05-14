import type {
  ContractAbstraction,
  Wallet,
  WalletOperation,
} from "@taquito/taquito"
import { getListingAcceptEp, getListingFA2Contract } from "../../utils/listing"
import { TezosContractOperation } from "./ContractOperation"
import type { Listing } from "@fxhash/shared"

export type TListingAcceptOperationParams = {
  listing: Pick<Listing, "id" | "version" | "price">
}

/**
 * List a gentk on the Marketplace
 */
export class ListingAcceptOperation extends TezosContractOperation<TListingAcceptOperationParams> {
  marketplaceContract?: ContractAbstraction<Wallet>
  entrypoint?: string

  async prepare() {
    this.marketplaceContract = await this.manager.getContract(
      getListingFA2Contract(this.params.listing)
    )
    this.entrypoint = getListingAcceptEp(this.params.listing)
  }

  async call(): Promise<WalletOperation> {
    return this.marketplaceContract.methods[this.entrypoint](
      this.params.listing.id
    ).send({
      amount: this.params.listing.price,
      mutez: true,
    })
  }

  success(): string {
    return "You have collected this token !"
  }
}
