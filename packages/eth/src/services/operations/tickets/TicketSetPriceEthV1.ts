import { EthereumContractOperation } from "../contractOperation"
import { FX_TICKETS_ABI } from "@/abi/FxTicket"
import { getCurrentChain } from "@/services/Wallet"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { TransactionType } from "@fxhash/shared"

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
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.ticket as `0x${string}`,
      abi: FX_TICKETS_ABI,
      functionName: "setPrice",
      args: [this.params.tokenId, this.params.newPrice],
      account: this.manager.address as `0x${string}`,
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
