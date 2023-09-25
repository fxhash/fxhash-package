import {
  ContractAbstraction,
  MichelsonMap,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { ISplit } from "../../types/entities/Split"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TCreateCollabParams = {
  splits: ISplit[]
}

export class CreateCollabOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosCreateCollabOperation
      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * Updates user profile
 */
class TezosCreateCollabOperation extends TezosContractOperation<TCreateCollabParams> {
  collabContract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.collabContract = await this.manager.getContract(
      FxhashContracts.COLLAB_FACTORY
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    const shares = new MichelsonMap()
    for (const split of this.params.splits) {
      shares.set(split.address, split.pct)
    }
    return this.collabContract!.methodsObject.create_collab_contract({
      collaborators: this.params.splits.map((split) => split.address),
      shares: shares,
    }).send()
  }

  success(): string {
    return `You have successfully originated your collaboration contract.`
  }
}
