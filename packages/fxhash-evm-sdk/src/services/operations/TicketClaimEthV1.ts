import { ContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { ABI as TicketABI } from "@/abi/FxTicket"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { getConfig } from "../Wallet"

export type TClaimTicketEthV1OperationParams = {
  ticket: string
  tokenId: number
  newPrice: bigint
  value: bigint
}

/**
 * Claim a mint ticket and sets a new price
 * @dev contract interface:
 * function claim(uint256 _tokenId, uint80 _newPrice)
 */
export class ClaimTicketEthV1Operation extends ContractOperation<TClaimTicketEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const account = this.manager.walletClient.account.address
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: TicketABI,
      functionName: "claim",
      args: [this.params.tokenId, this.params.newPrice],
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
    return `Successfully claimed mint ticket ${this.params.ticket} - ${this.params.tokenId} with new price ${this.params.newPrice}`
  }
}
