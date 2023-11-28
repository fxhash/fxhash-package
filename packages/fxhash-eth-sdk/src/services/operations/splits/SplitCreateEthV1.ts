import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { encodeFunctionData, getAddress, TransactionReceipt } from "viem"
import { FX_SPLITS_FACTORY_ABI } from "@/abi/FxSplitsFactory"
import {
  prepareReceivers,
  ReceiverEntry,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import { proposeSafeTransaction } from "@/services/Safe"

export type TCreateSplitEthV1OperationParams = {
  mutable: boolean
  receivers: ReceiverEntry[]
  creator?: string
  isCollab: boolean
}

/**
 * Create a 0xSplits wallet
 */
export class CreateSplitEthV1Operation extends EthereumContractOperation<TCreateSplitEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    const functionName = this.params.mutable
      ? "createMutableSplit"
      : "createImmutableSplit"
    this.params.receivers = prepareReceivers(this.params.receivers, "primary")
    const argsPayload =
      this.params.mutable && this.params.creator
        ? [
            getAddress(this.params.creator),
            this.params.receivers.map(receiver => getAddress(receiver.address)),
            this.params.receivers.map(receiver => receiver.pct),
          ]
        : [
            this.params.receivers.map(receiver => getAddress(receiver.address)),
            this.params.receivers.map(receiver => receiver.pct),
          ]
    console.log(argsPayload)
    if (this.params.isCollab) {
      const safeTransactionData: SafeTransactionDataPartial = {
        to: getAddress(FxhashContracts.ETH_SPLITS_FACTORY),
        data: encodeFunctionData({
          abi: FX_SPLITS_FACTORY_ABI,
          functionName: functionName,
          args: argsPayload,
        }),
        value: "0",
      }
      return await proposeSafeTransaction(safeTransactionData, this.manager)
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: FxhashContracts.ETH_SPLITS_FACTORY as `0x${string}`,
        abi: FX_SPLITS_FACTORY_ABI,
        functionName: functionName,
        args: argsPayload,
        account: this.manager.address as `0x${string}`,
      }
      return simulateAndExecuteContract(this.manager, args)
    }
  }

  success(): string {
    return `Successfully created 0xSplits wallet`
  }
}
