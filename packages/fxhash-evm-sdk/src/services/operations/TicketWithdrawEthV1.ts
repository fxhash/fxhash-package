import { EthereumContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { ABI as TicketABI } from "@/abi/FxTicket"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

export type TWithdrawTicketEthV1OperationParams = {
  ticket: string
  address: string
}

/**
 * Withdraw money for current user from the ticket contract
 * @dev contract interface:
 * function withdraw(address _to)
 */
export class WithdrawTicketEthV1Operation extends EthereumContractOperation<TWithdrawTicketEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: TicketABI,
      functionName: "withdraw",
      args: [this.params.address],
      account: this.manager.address,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully withdrawn from mint ticket ${this.params.ticket}`
  }
}
