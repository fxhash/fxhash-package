import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { DUTCH_AUCTION_MINTER_ABI } from "@/abi/DutchAuctionMinter"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

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
  async call(): Promise<TransactionReceipt> {
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_DUTCH_AUCTION_V1 as `0x${string}`,
      abi: DUTCH_AUCTION_MINTER_ABI,
      functionName: "withdraw",
      args: [this.params.token, this.params.reserveId],
      account: this.manager.address as `0x${string}`,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully minted withdrew earnings for ${this.params.token} from Fixed price minter`
  }
}
