import { EthereumContractOperation } from "../contractOperation.js"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { type Inscription } from "onchfs"
import { MULTICALL3_ABI } from "@/abi/Multicall3.js"
import { ethOnchfsInscriptionCallData } from "@/utils/index.js"
import { TransactionType } from "@fxhash/shared"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"

export type TOnchfsWriteOperationParams = {
  inscriptions: Inscription[]
}

/**
 * Write multiple Onchfs inscriptions to ONCHFS. Makes a multicall.
 */
export class OnchfsWriteEthOperation extends EthereumContractOperation<TOnchfsWriteOperationParams> {
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const contracts = getConfigForChain(this.chain).contracts

    const callRequests = this.params.inscriptions
      .map(ins => ethOnchfsInscriptionCallData(ins, this.chain))
      .map(call => {
        return {
          target: call.address,
          callData: call.data,
        }
      })

    if (callRequests.length > 0) {
      const args: SimulateAndExecuteContractRequest = {
        address: contracts.multicall3,
        abi: MULTICALL3_ABI,
        functionName: "aggregate",
        args: [callRequests],
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
    } else {
      return {
        type: TransactionType.ONCHAIN,
        hash: "",
      }
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
