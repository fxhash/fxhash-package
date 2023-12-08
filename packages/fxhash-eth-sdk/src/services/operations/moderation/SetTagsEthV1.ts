import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData, TransactionReceipt } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import { proposeSafeTransaction } from "@/services/Safe"

export type TSetTagsEthV1OperationParams = {
  token: `0x${string}`
  tags: bigint[]
  collabAddress?: `0x${string}`
}

/**
 * Set the tags for a token (moderator only)
 */
export class SetTagsEthV1Operation extends EthereumContractOperation<TSetTagsEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: SafeTransactionDataPartial = {
        to: this.params.token,
        data: encodeFunctionData({
          abi: FX_GEN_ART_721_ABI,
          functionName: "setTags",
          args: [this.params.tags],
        }),
        value: "0",
      }
      return await proposeSafeTransaction([safeTransactionData], this.manager)
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: this.params.token,
        abi: FX_GEN_ART_721_ABI,
        functionName: "setTags",
        args: [this.params.tags],
        account: this.manager.address as `0x${string}`,
      }
      return simulateAndExecuteContract(this.manager, args)
    }
  }

  success(): string {
    return `Successfully set tags for token ${this.params.token}`
  }
}
