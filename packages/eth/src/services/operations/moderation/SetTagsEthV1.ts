import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import { encodeFunctionData } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import type { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import { proposeSafeTransaction } from "@/services/Safe.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"

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
  async call(): Promise<{ type: TransactionType; hash: string }> {
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
      const transactionHash = await proposeSafeTransaction(
        this.chain,
        [safeTransactionData],
        this.manager
      )
      return {
        type: TransactionType.OFFCHAIN,
        hash: transactionHash,
      }
    }

    const args: SimulateAndExecuteContractRequest<
      typeof FX_GEN_ART_721_ABI,
      "setTags"
    > = {
      address: this.params.token,
      abi: FX_GEN_ART_721_ABI,
      functionName: "setTags",
      args: [this.params.tags],
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
    return `Successfully set tags for token ${this.params.token}`
  }
}
