import { EthereumContractOperation } from "../contractOperation"
import { FX_TICKETS_ABI } from "@/abi/FxTicket"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { TransactionType } from "@fxhash/contracts-shared"

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
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: FX_TICKETS_ABI,
      functionName: "withdraw",
      args: [this.params.address],
      account: this.manager.address as `0x${string}`,
    }
    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `Successfully withdrawn from mint ticket ${this.params.ticket}`
  }
}
