import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { FX_TICKETS_ABI } from "@/abi/FxTicket"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

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
export class ClaimTicketEthV1Operation extends EthereumContractOperation<TClaimTicketEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: FX_TICKETS_ABI,
      functionName: "claim",
      args: [this.params.tokenId, this.params.newPrice],
      account: this.manager.address,
      value: this.params.value,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully claimed mint ticket ${this.params.ticket} - ${this.params.tokenId} with new price ${this.params.newPrice}`
  }
}
