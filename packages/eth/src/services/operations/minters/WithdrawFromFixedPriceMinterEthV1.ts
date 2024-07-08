import { FIXED_PRICE_MINTER_V2_ABI } from "@/abi/FixedPriceMinterV2.js"
import { EthereumContractOperation } from "../contractOperation.js"
import { FIXED_PRICE_MINTER_ABI } from "@/abi/FixedPriceMinter.js"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
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
    const isV2 =
      this.params.minter === currentConfig.contracts.fixed_price_minter_v2
    const abi = isV2 ? FIXED_PRICE_MINTER_V2_ABI : FIXED_PRICE_MINTER_ABI

    const args: SimulateAndExecuteContractRequest = {
      address: this.params.minter as `0x${string}`,
      abi: abi,
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
