import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"
import { ITaxationSettings } from "@/types/MintTicket"

export type TTicketUpdatePriceV3OperationParams = {
  ticketId: number
  amount: number
  taxationSettings: ITaxationSettings
}

export class TicketUpdatePriceV3Operation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosTicketUpdatePriceV3Operation
      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * Update the ticket price to extend or remove day coverage
 */
class TezosTicketUpdatePriceV3Operation extends TezosContractOperation<TTicketUpdatePriceV3OperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      FxhashContracts.MINT_TICKETS_V3
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    const amount = Math.ceil(this.params.amount)
    return this.contract!.methodsObject.update_price({
      token_id: this.params.ticketId,
      taxation: this.params.taxationSettings,
    }).send({
      amount,
      mutez: true,
    })
  }

  success(): string {
    return `You have successfully updated the ticket pricing settings.`
  }
}
