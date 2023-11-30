import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { type Inscription } from "onchfs"
import { config } from "@fxhash/config"
import { MULTICALL3_ABI } from "@/abi/Multicall3"
import { ethOnchfsInscriptionCallData } from "@/utils"

export type TOnchfsWriteOperationParams = {
  inscriptions: Inscription[]
}

/**
 * Write multiple Onchfs inscriptions to ONCHFS. Makes a multicall.
 */
export class OnchfsWriteEthOperation extends EthereumContractOperation<TOnchfsWriteOperationParams> {
  async prepare() {}

  async call(): Promise<TransactionReceipt> {
    const callRequests = this.params.inscriptions
      .map(ins => ethOnchfsInscriptionCallData(ins))
      .map(call => {
        return {
          target: call.address,
          callData: call.data,
        }
      })

    if (callRequests.length > 0) {
      const args: SimulateAndExecuteContractRequest = {
        address: config.eth.contracts.multicall3,
        abi: MULTICALL3_ABI,
        functionName: "aggregate",
        args: [callRequests],
        account: this.manager.address as `0x${string}`,
      }
      return simulateAndExecuteContract(this.manager, args)
    } else {
      return undefined
    }
  }

  success(): string {
    return `Successfully written ${
      this.params.inscriptions.length
    } inscription${
      this.params.inscriptions.length > 1 ? "s" : ""
    } on the On-Chain File System`
  }
}
