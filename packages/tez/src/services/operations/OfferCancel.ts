import type {
  ContractAbstraction,
  Wallet,
  WalletOperation,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { TezosContractOperation } from "./ContractOperation"
import type { Offer } from "@fxhash/shared"

export type TOfferCancelOperationParams = {
  offer: Pick<Offer, "id">
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
    return this.contract.methodsObject.offer_cancel(this.params.offer.id).send()
  }

  success(): string {
    return "You have cancelled your offer"
  }
}
