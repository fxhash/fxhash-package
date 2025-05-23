import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { CollaborationProposal } from "../indexing/contract-handlers/CollaborationHandler"
import { TezosContractOperation } from "./ContractOperation"
import { Collaboration } from "@fxhash/shared"

export type TCollabVoteProposalParams = {
  collaborationId: string
  proposal: CollaborationProposal
  approval: boolean
}

/**
 * Vote for a proposal
 */
export class CollabVoteProposalOperation extends TezosContractOperation<TCollabVoteProposalParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(this.params.collaborationId)
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
