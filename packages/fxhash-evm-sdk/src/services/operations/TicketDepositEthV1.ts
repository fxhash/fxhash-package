import { ContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { ABI as TicketABI } from "@/abi/FxTicket"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { getConfig } from "../Wallet"

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
export class TicketDepositEthV1Operation extends ContractOperation<TTicketDepositEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const account = this.manager.walletClient.account.address
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: TicketABI,
      functionName: "deposit",
      args: [this.params.tokenId],
      account: account,
      value: this.params.value,
    }
    return simulateAndExecuteContract(
      getConfig().publicClient,
      this.manager.walletClient,
      args
    )
  }

  success(): string {
    return `Successfully made deposit for mint ticket ${this.params.ticket} - ${this.params.tokenId}`
  }
}
