import { ContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { ABI as MintTicketABI } from "@/abi/FxTicket"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { getConfig } from "../Wallet"

export type TMintTicketEthV1OperationParams = {
  amount: number
  payment: number
  ticket: string
}

/**
 * Mint an unique iteration of a Mint Ticket
 * @dev contract interface:
 * function mint(address _to, uint256 _amount, uint256 _payment)
 */
export class MintTicketEthV1Operation extends ContractOperation<TMintTicketEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const account = this.manager.walletClient.account.address
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: MintTicketABI,
      functionName: "mint",
      args: [account, this.params.amount, this.params.payment],
      account: account,
    }
    return simulateAndExecuteContract(
      getConfig().publicClient,
      this.manager.walletClient,
      args
    )
  }

  success(): string {
    return `Successfully minted mint ticket ${this.params.ticket}`
  }
}
