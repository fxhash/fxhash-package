import type {
  ContractAbstraction,
  Wallet,
  WalletOperation,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { displayMutez } from "../../utils/units"
import { TezosContractOperation } from "./ContractOperation"

export type TCollectionOfferOperationParams = {
  token: string
  amount: number
  price: bigint
}

/**
 * Create a collection offer on the Marketplace
 */
export class CollectionOfferOperation extends TezosContractOperation<TCollectionOfferOperationParams> {
  marketplaceContract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.marketplaceContract = await this.manager.getContract(
      FxhashContracts.MARKETPLACE_V2
    )
  }

  async call(): Promise<WalletOperation> {
    return this.marketplaceContract.methodsObject
      .collection_offer({
        amount: this.params.amount,
        collection: this.params.token,
        price: this.params.price,
      })
      .send({
        mutez: true,
        amount: Number(this.params.price * BigInt(this.params.amount)),
      })
  }

  success(): string {
    return `You have made a collection offer of ${displayMutez(
      Number(this.params.price)
    )} tez`
  }
}
