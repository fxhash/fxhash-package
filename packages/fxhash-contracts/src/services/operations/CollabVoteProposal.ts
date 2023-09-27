import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { Collaboration } from "../../types/entities/User"
import { CollaborationProposal } from "../indexing/contract-handlers/CollaborationHandler"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TCollabVoteProposalParams = {
  collaboration: Collaboration
  proposal: CollaborationProposal
  approval: boolean
}

export class CollabVoteProposalOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosCollabVoteProposalOperation
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
class TezosCollabVoteProposalOperation extends TezosContractOperation<TCollabVoteProposalParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(this.params.collaboration.id)
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.vote_proposal({
      proposal_id: this.params.proposal.id,
      approval: this.params.approval,
    }).send()
  }

  success(): string {
    return `You have ${
      this.params.approval ? "approved" : "rejected"
    } the proposal for the execution of an operation in your collaboration.`
  }
}
