import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { DUTCH_AUCTION_MINTER_ABI } from "@/abi/DutchAuctionMinter"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { TransactionType } from "@fxhash/contracts-shared"

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
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_DUTCH_AUCTION_V1 as `0x${string}`,
      abi: DUTCH_AUCTION_MINTER_ABI,
      functionName: "withdraw",
      args: [this.params.token, this.params.reserveId],
      account: this.manager.address as `0x${string}`,
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
