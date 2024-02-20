import { EthereumContractOperation } from "../contractOperation"
import { FX_TICKETS_ABI } from "@/abi/FxTicket"
import { getCurrentChain } from "@/services/Wallet"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { TransactionType } from "@fxhash/contracts-shared"

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
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: FX_TICKETS_ABI,
      functionName: "deposit",
      args: [this.params.tokenId],
      account: this.manager.address as `0x${string}`,
      value: this.params.value,
      chain: getCurrentChain(this.chain),
    }
    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `Successfully made deposit for mint ticket ${this.params.ticket} - ${this.params.tokenId}`
  }
}
