import { EthereumContractOperation } from "../contractOperation"
import { encodeFunctionData, getAddress } from "viem"
import {
  prepareReceivers,
  ReceiverEntry,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"
import { TransactionType } from "@fxhash/contracts-shared"

export type TSetPrimaryReceiversEthV1OperationParams = {
  token: string
  receivers: ReceiverEntry[]
  collabAddress?: string
}

/**
 * Set primary receiver split
 */
export class SetPrimaryReceiversEthV1Operation extends EthereumContractOperation<TSetPrimaryReceiversEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const preparedPrimaryReceivers = prepareReceivers(
      this.params.receivers,
      "primary"
    )
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: MetaTransactionData = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: FX_GEN_ART_721_ABI,
          functionName: "setPrimaryReceivers",
          args: [
            preparedPrimaryReceivers.map(r => r.address),
            preparedPrimaryReceivers.map(r => r.pct),
          ],
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
        address: getAddress(this.params.token) as `0x${string}`,
        abi: FX_GEN_ART_721_ABI,
        functionName: "setPrimaryReceivers",
        args: [
          preparedPrimaryReceivers.map(r => r.address),
          preparedPrimaryReceivers.map(r => r.pct),
        ],
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
    return `Successfully updates allocations for primary receiver`
  }
}
