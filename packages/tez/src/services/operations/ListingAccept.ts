import {
  ContractAbstraction,
  OpKind,
  Wallet,
  WalletOperation,
} from "@taquito/taquito"
import { getListingAcceptEp, getListingFA2Contract } from "../../utils/listing"
import { displayMutez } from "../../utils/units"
import { TezosContractOperation } from "./ContractOperation"
import { Listing, Objkt } from "@fxhash/shared"

export type TListingAcceptOperationParams = {
  listing: Listing
  objkt: Objkt
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
    return this.marketplaceContract!.methods[this.entrypoint!](
      this.params.listing.id
    ).send({
      amount: this.params.listing.price,
      mutez: true,
    })
  }

  success(): string {
    return `You have bought ${this.params.objkt.name} for ${displayMutez(
      this.params.listing.price
    )} tez`
  }
}
