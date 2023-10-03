import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"
import { mapModKtKeyToContract, TModContractKey } from "./Moderate"

export type TResonAddParams = {
  reason: string
  contract: TModContractKey
}

export class ReasonAddOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosReasonAddOperation
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
class TezosReasonAddOperation extends TezosContractOperation<TResonAddParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      mapModKtKeyToContract[this.params.contract]
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.reason_add(this.params.reason).send()
  }

  success(): string {
    return `You have successfully added a reason to the ${this.params.contract} moderation contract: ${this.params.reason}.`
  }
}
