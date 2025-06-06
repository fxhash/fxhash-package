import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { TezosContractOperation } from "./ContractOperation"
import { GenerativeToken } from "@fxhash/shared"

export type TMintWithTicketOperationParams = {
  ticketId: number
  token: GenerativeToken
  inputBytes: string
}

/**
 * Mint an unique iteration of a Generative Token
 */
export class TezosMintWithTicketOperation extends TezosContractOperation<TMintWithTicketOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(FxhashContracts.ISSUER_V3)
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.mint_with_ticket({
      issuer_id: this.params.token.id,
      ticket_id: this.params.ticketId,
      input_bytes: this.params.inputBytes,
      recipient: null,
    }).send()
  }

  success(): string {
    return `You have successfully exchanged one ticket for an iteration of "${this.params.token.name}".`
  }
}
