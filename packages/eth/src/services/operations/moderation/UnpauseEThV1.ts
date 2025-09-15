import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import { encodeFunctionData, getAddress } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { proposeSafeTransaction } from "@/services/Safe.js"
import type { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"

export type TUnpauseEthV1OperationParams = {
  token: `0x${string}`
  collabAddress?: string
}

/**
 * Un-Pause a project
 */
export class UnpauseEthV1Operation extends EthereumContractOperation<TUnpauseEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: MetaTransactionData = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: FX_GEN_ART_721_ABI,
          functionName: "unpause",
          args: [],
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
      "unpause"
    > = {
      address: this.params.token,
      abi: FX_GEN_ART_721_ABI,
      functionName: "unpause",
      args: [],
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
    return `Successfully unpaused token ${this.params.token}`
  }
}
