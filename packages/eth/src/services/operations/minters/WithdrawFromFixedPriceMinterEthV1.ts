import { EthereumContractOperation } from "../contractOperation"
import { FIXED_PRICE_MINTER_ABI } from "@/abi/FixedPriceMinter"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { TransactionType } from "@fxhash/shared"

export type TWithdrawFromFixedPriceMinterEthV1OperationParams = {
  token: string
  minter: string
}

/**
 * Withdraw ETH earnings from the fixed price minter contract for a specific token
 */
export class WithdrawFromFixedPriceMinterEthV1Operation extends EthereumContractOperation<TWithdrawFromFixedPriceMinterEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const args: SimulateAndExecuteContractRequest = {
      address: currentConfig.contracts.fixed_price_minter_v1,
      abi: FIXED_PRICE_MINTER_ABI,
      functionName: "withdraw",
      args: [this.params.token],
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
