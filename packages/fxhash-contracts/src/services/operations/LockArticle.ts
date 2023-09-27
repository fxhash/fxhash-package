import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { NFTArticle } from "../../types/entities/Article"
import { FxhashContracts } from "../../types/Contracts"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TLockArticleOperationParams = {
  article: NFTArticle
}

export class LockArticleOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosLockArticleOperation

      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
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
