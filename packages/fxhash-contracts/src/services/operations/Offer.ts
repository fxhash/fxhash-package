import { ContractAbstraction, Wallet, WalletOperation } from "@taquito/taquito"
import { getGentkLocalIDFromObjkt } from "@/utils/entities/gentk"
import { FxhashContracts } from "../../types/Contracts"
import { Objkt } from "../../types/entities/Objkt"
import { displayMutez } from "../../utils/units"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TOfferOperationParams = {
  token: Objkt
  price: number
}

export class OfferOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosOfferOperation
      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * List a gentk on the Marketplace
 */
export class TezosOfferOperation extends TezosContractOperation<TOfferOperationParams> {
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

    return this.marketplaceContract!.methodsObject.offer({
      gentk: {
        id: id,
        version: this.params.token.version,
      },
      price: this.params.price,
    }).send({
      mutez: true,
      amount: this.params.price,
    })
  }

  success(): string {
    return `You have made an offer of ${displayMutez(
      this.params.price
    )} tez on ${this.params.token.name}`
  }
}
