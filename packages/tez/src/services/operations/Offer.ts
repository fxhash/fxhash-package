import type {
  ContractAbstraction,
  Wallet,
  WalletOperation,
} from "@taquito/taquito"
import { getGentkLocalIDFromObjkt } from "@/utils/entities/gentk"
import { FxhashContracts } from "../../types/Contracts"
import { TezosContractOperation } from "./ContractOperation"
import type { Objkt } from "@fxhash/shared"

export type TOfferOperationParams = {
  token: Pick<Objkt, "id" | "version">
  price: bigint
}

/**
 * List a gentk on the Marketplace
 */
export class OfferOperation extends TezosContractOperation<TOfferOperationParams> {
  marketplaceContract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.marketplaceContract = await this.manager.getContract(
      FxhashContracts.MARKETPLACE_V2
    )
  }

  async call(): Promise<WalletOperation> {
    // recent V3 tokens have an ID of "FXN-{id}", so we need to extract the ID
    // part only for these recent tokens
    const id = getGentkLocalIDFromObjkt(this.params.token)

    return this.marketplaceContract.methodsObject
      .offer({
        gentk: {
          id: id,
          version: this.params.token.version,
        },
        price: this.params.price,
      })
      .send({
        mutez: true,
        amount: Number(this.params.price),
      })
  }

  success(): string {
    return "your collection offer has been placed!"
  }
}
