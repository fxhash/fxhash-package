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
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const isParams = this.params.params ? true : false
    const functionArgs = isParams
      ? ([this.params.to, this.params.params! as `0x${string}`] as const)
      : ([this.params.to] as const)
    const functionName = isParams ? "ownerMintParams" : "ownerMint"
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: MetaTransactionData = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: FX_GEN_ART_721_ABI,
          functionName: functionName,
          args: functionArgs,
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
      typeof functionName
    > = {
      address: this.params.token,
      abi: FX_GEN_ART_721_ABI,
      functionName: functionName,
      args: functionArgs,
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
    return `Successfully minted token on project ${this.params.token} as owner`
  }
}
