import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { CollaborationProposal } from "../indexing/contract-handlers/CollaborationHandler"
import { TezosContractOperation } from "./ContractOperation"
import { Collaboration } from "@fxhash/shared"

export type TCollabExecuteProposalParams = {
  collaborationId: string
  proposal: CollaborationProposal
}

/**
 * Execute for a proposal
 */
export class CollabExecuteProposalOperation extends TezosContractOperation<TCollabExecuteProposalParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(this.params.collaborationId)
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
