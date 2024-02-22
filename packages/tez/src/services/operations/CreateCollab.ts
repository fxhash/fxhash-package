import {
  ContractAbstraction,
  MichelsonMap,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { TezosContractOperation } from "./ContractOperation"
import { ISplit } from "@fxhash/shared"

export type TCreateCollabParams = {
  splits: ISplit[]
}

/**
 * Updates user profile
 */
export class CreateCollabOperation extends TezosContractOperation<TCreateCollabParams> {
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
      collaborators: this.params.splits.map(split => split.address),
      shares: shares,
    }).send()
  }

  success(): string {
    return `You have successfully originated your collaboration contract.`
  }
}
