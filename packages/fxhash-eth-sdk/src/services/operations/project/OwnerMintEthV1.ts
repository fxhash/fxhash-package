import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData, getAddress, TransactionReceipt } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"

export type TOwnerMintEthV1OperationParams = {
  token: `0x${string}`
  params?: string | undefined
  to: `0x${string}`
  collabAddress?: string
}

/**
 * Mint a unique iteration as creator of a project
 */
export class OwnerMintEthV1Operation extends EthereumContractOperation<TOwnerMintEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    const isParams = this.params.params ? true : false
    const functionArgs = isParams
      ? [this.params.to, this.params.params]
      : [this.params.to]
    const functionName = isParams ? "ownerMintParams" : "ownerMint"
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: SafeTransactionDataPartial = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: FX_GEN_ART_721_ABI,
          functionName: functionName,
          args: functionArgs,
        }),
        value: "0",
      }
      return await proposeSafeTransaction(safeTransactionData, this.manager)
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: this.params.token,
        abi: FX_GEN_ART_721_ABI,
        functionName: functionName,
        args: functionArgs,
        account: this.manager.address as `0x${string}`,
      }
      return simulateAndExecuteContract(this.manager, args)
    }
  }

  success(): string {
    return `Successfully minted token on project ${this.params.token} as owner`
  }
}
