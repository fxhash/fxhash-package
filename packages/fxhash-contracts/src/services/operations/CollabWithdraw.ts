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

/**
 * Vote for a proposal
 */
export class TezosCollabWithdrawOperation extends TezosContractOperation<TCollabWithdrawParams> {
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
