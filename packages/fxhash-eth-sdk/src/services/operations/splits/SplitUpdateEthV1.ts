import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { encodeFunctionData, getAddress, TransactionReceipt } from "viem"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"

export type TUpdateSplitEthV1OperationParams = {
  from: string
  to: string
  split: string
  accounts: string[]
  allocations: number[]
  isCollab: boolean
}

/**
 * Update a 0xSplits wallet
 */
export class UpdateSplitEthV1Operation extends EthereumContractOperation<TUpdateSplitEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    // if (this.params.isCollab) {
    //   const safeTransactionData: SafeTransactionDataPartial = {
    //     to: getAddress(FxhashContracts.ETH_SPLITS_CONTROLLER),
    //     data: encodeFunctionData({
    //       abi: SPLITS_CONTROLLER_ABI,
    //       functionName: "transferAllocationFrom",
    //       args: [
    //         this.params.from,
    //         this.params.to,
    //         this.params.split,
    //         this.params.accounts,
    //         this.params.allocations,
    //       ],
    //     }),
    //     value: "0",
    //   }
    //   return await proposeSafeTransaction(safeTransactionData, this.manager)
    // } else {
    //   const args: SimulateAndExecuteContractRequest = {
    //     address: FxhashContracts.ETH_SPLITS_CONTROLLER as `0x${string}`,
    //     abi: SPLITS_CONTROLLER_ABI,
    //     functionName: "transferAllocationFrom",
    //     args: [
    //       this.params.from,
    //       this.params.to,
    //       this.params.split,
    //       this.params.accounts,
    //       this.params.allocations,
    //     ],
    //     account: this.manager.address as `0x${string}`,
    //   }
    //   return simulateAndExecuteContract(this.manager, args)
    // }
    return undefined
  }

  success(): string {
    return `Successfully updates allocations for 0xSplits wallet`
  }
}
