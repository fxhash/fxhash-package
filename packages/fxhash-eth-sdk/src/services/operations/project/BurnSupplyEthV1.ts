import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData, getAddress } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
import { TransactionType } from "@fxhash/contracts-shared"

export type TBurnSupplyEthV1OperationParams = {
  token: `0x${string}`
  supply: number
  collabAddress?: string
}

export class BurnSupplyEthV1Operation extends EthereumContractOperation<TBurnSupplyEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)

      const safeTransactionData: MetaTransactionData = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: FX_GEN_ART_721_ABI,
          functionName: "reduceSupply",
          args: [this.params.supply],
        }),
        value: "0",
      }
      const transactionHash = await proposeSafeTransaction(
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
        functionName: "reduceSupply",
        args: [this.params.supply],
        account: this.manager.address as `0x${string}`,
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
    return `Successfully burned supply for token ${this.params.token}`
  }
}
