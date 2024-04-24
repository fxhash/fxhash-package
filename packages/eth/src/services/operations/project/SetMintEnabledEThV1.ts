import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import { encodeFunctionData, getAddress } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721.js"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { proposeSafeTransaction } from "@/services/Safe.js"
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"

export type TSetMintEnabledEthV1OperationParams = {
  token: `0x${string}`
  enabled: boolean
  collabAddress?: string
}

/**
 * Enable/Disable mint for a project
 */
export class SetMintEnabledEthV1Operation extends EthereumContractOperation<TSetMintEnabledEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: MetaTransactionData = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: FX_GEN_ART_721_ABI,
          functionName: "setMintEnabled",
          args: [this.params.enabled],
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
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: this.params.token,
        abi: FX_GEN_ART_721_ABI,
        functionName: "setMintEnabled",
        args: [this.params.enabled],
        account: this.manager.address as `0x${string}`,
        chain: getCurrentChain(this.chain),
      }
      const transactionHash = await simulateAndExecuteContract(
        this.manager,
        args
      )
      return {
        type: TransactionType.ONCHAIN,
        hash: transactionHash,
      }
    }
  }

  success(): string {
    return `Successfully toggled mint token ${this.params.token}`
  }
}
