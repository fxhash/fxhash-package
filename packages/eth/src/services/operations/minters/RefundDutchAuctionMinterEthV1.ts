import { EthereumContractOperation } from "../contractOperation.js"
import { DUTCH_AUCTION_MINTER_ABI } from "@/abi/DutchAuctionMinter.js"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"

export type TRefundDutchAuctionMinterEthV1OperationParams = {
  token: string
  minter: string
  reserveId: number
}

/**
 * Refund ETH from the dutch auction minter contract for a specific token and reserve
 */
export class RefundDutchAuctionMinterEthV1Operation extends EthereumContractOperation<TRefundDutchAuctionMinterEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const args: SimulateAndExecuteContractRequest<
      typeof DUTCH_AUCTION_MINTER_ABI,
      "refund"
    > = {
      address: currentConfig.contracts.dutch_auction_minter_v1,
      abi: DUTCH_AUCTION_MINTER_ABI,
      functionName: "refund",
      args: [
        this.params.token as `0x${string}`,
        BigInt(this.params.reserveId),
        this.params.minter as `0x${string}`,
      ],
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
    return `Successfully refunded ${this.params.token} from Dutch Auction price minter`
  }
}
