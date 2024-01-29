import { EthereumContractOperation } from "../contractOperation"
import { FX_TICKETS_ABI } from "@/abi/FxTicket"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { TransactionType } from "@fxhash/contracts-shared"

export type TTicketDepositAndSetPriceEthV1OperationParams = {
  ticket: string
  tokenId: bigint
  newPrice: bigint
  value: bigint
}

/**
 * Make a deposit and set the price for a mint ticket
 * @dev contract interface:
 * function depositAndSetPrice(uint256 _tokenId, uint80 _newPrice)
 */
export class TicketDepositAndSetPriceEthV1Operation extends EthereumContractOperation<TTicketDepositAndSetPriceEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: FX_TICKETS_ABI,
      functionName: "depositAndSetPrice",
      args: [this.params.tokenId, this.params.newPrice],
      account: this.manager.address as `0x${string}`,
      value: this.params.value,
    }
    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `Successfully made deposit and set price for mint ticket ${this.params.ticket} - ${this.params.tokenId}`
  }
}
