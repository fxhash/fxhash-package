import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { TezosContractOperation } from "./ContractOperation"
import { NFTArticle } from "@fxhash/shared"

export type TLockArticleOperationParams = {
  article: NFTArticle
}

/**
 * Mint an unique iteration of a Generative Token
 */
export class TezosLockArticleOperation extends TezosContractOperation<TLockArticleOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(FxhashContracts.ARTICLES)
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.lock_metadata(
      this.params.article.id
    ).send()
  }

  success(): string {
    return `The metadata of your article ${this.params.article.title} was successfully locked.`
  }
}
