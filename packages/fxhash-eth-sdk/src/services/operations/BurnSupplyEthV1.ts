import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData, getAddress, TransactionReceipt } from "viem"
import { ABI as FxGenArt721ABI } from "@/abi/FxGenArt721"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"

export type TBurnSupplyEthV1OperationParams = {
  token: `0x${string}`
  supply: number
  isCollab: boolean
}

export class BurnSupplyEthV1Operation extends EthereumContractOperation<TBurnSupplyEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    if (this.params.isCollab) {
      const safeTransactionData: SafeTransactionDataPartial = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: FxGenArt721ABI,
          functionName: "reduceSupply",
          args: [this.params.supply],
        }),
        value: "0",
      }
      return await proposeSafeTransaction(safeTransactionData, this.manager)
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: this.params.token,
        abi: FxGenArt721ABI,
        functionName: "reduceSupply",
        args: [this.params.supply],
        account: this.manager.address,
      }
      return simulateAndExecuteContract(this.manager, args)
    }
  }

  success(): string {
    return `Successfully burned supply for token ${this.params.token}`
  }
}
