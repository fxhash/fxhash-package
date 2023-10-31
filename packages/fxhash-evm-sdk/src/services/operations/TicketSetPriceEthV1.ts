import { EthereumContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { ABI as TicketABI } from "@/abi/FxTicket"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

export type TSetPriceTicketEthV1OperationParams = {
  ticket: string
  tokenId: number
  newPrice: bigint
}

/**
 * Set new price for ticket
 * @dev contract interface:
 * function setPrice(uint256 _tokenId, uint80 _newPrice)
 */
export class SetPriceTicketEthV1Operation extends EthereumContractOperation<TSetPriceTicketEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: TicketABI,
      functionName: "setPrice",
      args: [this.params.tokenId, this.params.newPrice],
      account: this.manager.address,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully claimed mint ticket ${this.params.ticket} - ${this.params.tokenId} with new price ${this.params.newPrice}`
  }
}
