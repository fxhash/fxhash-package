import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { Collaboration } from "../../types/entities/User"
import { CollaborationProposal } from "../indexing/contract-handlers/CollaborationHandler"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TCollabExecuteProposalParams = {
  collaboration: Collaboration
  proposal: CollaborationProposal
}

export class CollabExecuteProposalOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosCollabExecuteProposalOperation
      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * Execute for a proposal
 */
class TezosCollabExecuteProposalOperation extends TezosContractOperation<TCollabExecuteProposalParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(this.params.collaboration.id)
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.execute_proposal(
      this.params.proposal.id
    ).send()
  }

  success(): string {
    return `You have successfully executed the operation in the name of all the collaborators.`
  }
}
