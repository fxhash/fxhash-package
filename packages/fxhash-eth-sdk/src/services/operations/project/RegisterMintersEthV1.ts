import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData, getAddress, TransactionReceipt } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"
import { FX_TICKETS_ABI } from "@/abi/FxTicket"

import {
  MintInfo,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"

export type TRegisterMintersEthV1OperationParams = {
  token: `0x${string}`
  mintInfo: MintInfo[]
  isTicket: boolean
  isCollab: boolean
}

/**
 * Register minters for a project
 * (update pricing, reserves, etc)
 */
export class RegisterMintersEthV1Operation extends EthereumContractOperation<TRegisterMintersEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    if (this.params.isCollab) {
      const safeTransactionData: SafeTransactionDataPartial = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: this.params.isTicket ? FX_TICKETS_ABI : FX_GEN_ART_721_ABI,
          functionName: "registerMinters",
          args: [this.params.mintInfo],
        }),
        value: "0",
      }
      return await proposeSafeTransaction(safeTransactionData, this.manager)
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: this.params.token,
        abi: this.params.isTicket ? FX_TICKETS_ABI : FX_GEN_ART_721_ABI,
        functionName: "registerMinters",
        args: [this.params.mintInfo],
        account: this.manager.address,
      }
      return simulateAndExecuteContract(this.manager, args)
    }
  }

  success(): string {
    return `Successfully updated minters for ${this.params.token}`
  }
}
