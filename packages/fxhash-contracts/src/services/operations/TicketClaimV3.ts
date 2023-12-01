import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"
import { ITaxationSettings } from "@/types/MintTicket"

export type TTicketClaimV3OperationParams = {
  ticketId: number
  amount: number
  taxationSettings: ITaxationSettings
}

/**
 * Mint an unique iteration of a Generative Token
 */
export class TezosTicketClaimV3Operation extends TezosContractOperation<TTicketClaimV3OperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      FxhashContracts.MINT_TICKETS_V3
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.claim({
      token_id: this.params.ticketId,
      transfer_to: null,
      taxation: this.params.taxationSettings,
    }).send({
      amount: this.params.amount,
      mutez: true,
    })
  }

  success(): string {
    return `You have claimed the ticket and its pricing settings have been updated.`
  }
}
