import type {
  ContractAbstraction,
  Wallet,
  WalletOperation,
} from "@taquito/taquito"
import { getListingCancelEp, getListingFA2Contract } from "../../utils/listing"
import { TezosContractOperation } from "./ContractOperation"
import type { Listing } from "@fxhash/shared"

export type TListingCancelOperationParams = {
  listing: Pick<Listing, "id" | "version">
}

/**
 * List a gentk on the Marketplace
 */
export class ListingCancelOperation extends TezosContractOperation<TListingCancelOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null
  ep = ""

  async prepare() {
    this.contract = await this.manager.getContract(
      getListingFA2Contract(this.params.listing)
    )
    this.ep = getListingCancelEp(this.params.listing)
  }

  async call(): Promise<WalletOperation> {
    return this.contract.methodsObject[this.ep](this.params.listing.id).send()
  }

  success(): string {
    return "You have cancelled your listing"
  }
}
