import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { encodeFunctionData, getAddress, TransactionReceipt } from "viem"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"
export type TUpdatePrimaryReceiverEthV1OperationParams = {
  token: string
  signature: `0x${string}`
  primaryReceiver: string
  isCollab: boolean
}

/**
 * Update a 0xSplits wallet
 */
export class UpdatePrimaryReceiverEthV1Operation extends EthereumContractOperation<TUpdatePrimaryReceiverEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    if (this.params.isCollab) {
      const safeTransactionData: SafeTransactionDataPartial = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: FX_GEN_ART_721_ABI,
          functionName: "setPrimaryReceiver",
          args: [this.params.primaryReceiver, this.params.signature],
        }),
        value: "0",
      }
      return await proposeSafeTransaction(safeTransactionData, this.manager)
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: getAddress(this.params.token) as `0x${string}`,
        abi: FX_GEN_ART_721_ABI,
        functionName: "setPrimaryReceiver",
        args: [this.params.primaryReceiver, this.params.signature],
        account: this.manager.address as `0x${string}`,
      }
      return simulateAndExecuteContract(this.manager, args)
    }
  }

  success(): string {
    return `Successfully updates allocations for 0xSplits wallet`
  }
}
