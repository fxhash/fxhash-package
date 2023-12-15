import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData, getAddress, TransactionReceipt } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import {
  MetaTransactionData,
  SafeTransactionDataPartial,
} from "@safe-global/safe-core-sdk-types"

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
  async call(): Promise<TransactionReceipt | string> {
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
      return await proposeSafeTransaction([safeTransactionData], this.manager)
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: this.params.token,
        abi: FX_GEN_ART_721_ABI,
        functionName: "unpause",
        args: [],
        account: this.manager.address as `0x${string}`,
      }
      return simulateAndExecuteContract(this.manager, args)
    }
  }

  success(): string {
    return `Successfully unpaused token ${this.params.token}`
  }
}