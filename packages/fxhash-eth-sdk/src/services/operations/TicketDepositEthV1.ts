import { EthereumContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { FX_TICKETS_ABI } from "@/abi/FxTicket"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

export type TTicketDepositEthV1OperationParams = {
  ticket: string
  tokenId: number
  value: bigint
}

/**
 * Make a deposit for paying tax for mint ticket
 * @dev contract interface:
 * function deposit(uint256 _tokenId)
 */
export class TicketDepositEthV1Operation extends EthereumContractOperation<TTicketDepositEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: FX_TICKETS_ABI,
      functionName: "deposit",
      args: [this.params.tokenId],
      account: this.manager.address,
      value: this.params.value,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully made deposit for mint ticket ${this.params.ticket} - ${this.params.tokenId}`
  }
}
