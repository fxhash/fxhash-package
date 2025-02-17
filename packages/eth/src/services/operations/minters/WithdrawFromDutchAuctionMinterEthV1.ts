import { dutchAuctionV2Abi } from "@/__generated__/wagmi.js"
import { EthereumContractOperation } from "../contractOperation.js"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"

export type TWithdrawFromDutchAuctionMinterEthV1OperationParams = {
  token: string
  minter: string
  reserveId: number
}
/**
 * Withdraw ETH earnings from the dutch auction minter contract for a specific token and reserve
 */
export class WithdrawFromDutchAuctionMinterEthV1Operation extends EthereumContractOperation<TWithdrawFromDutchAuctionMinterEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const args: SimulateAndExecuteContractRequest<
      typeof dutchAuctionV2Abi,
      "withdraw"
    > = {
      address: currentConfig.contracts.dutch_auction_minter_v1,
      abi: dutchAuctionV2Abi,
      functionName: "withdraw",
      args: [this.params.token as `0x${string}`, BigInt(this.params.reserveId)],
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
    return `Successfully minted withdrew earnings for ${this.params.token} from Fixed price minter`
  }
}
