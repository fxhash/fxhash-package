import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { Collaboration } from "../../types/entities/User"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TCollabWithdrawParams = {
  collaboration: Collaboration
}

export class CollabWithdrawOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosCollabWithdrawOperation

      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * Vote for a proposal
 */
class TezosCollabWithdrawOperation extends TezosContractOperation<TCollabWithdrawParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(this.params.collaboration.id)
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.withdraw(null).send()
  }

  success(): string {
    return `You have withdrawn the collaboration contract balance.`
  }
}
