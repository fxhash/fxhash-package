import { EthereumContractOperation } from "../contractOperation.js"
import { FX_TICKETS_ABI } from "@/abi/FxTicket.js"
import { getCurrentChain } from "@/services/Wallet.js"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"

export type TClaimTicketEthV1OperationParams = {
  ticket: string
  tokenId: number
  maxPrice: bigint
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
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: FX_TICKETS_ABI,
      functionName: "claim",
      args: [this.params.tokenId, this.params.maxPrice, this.params.newPrice],
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
    return `Successfully claimed mint ticket ${this.params.ticket} - ${this.params.tokenId} with new price ${this.params.newPrice}`
  }
}
