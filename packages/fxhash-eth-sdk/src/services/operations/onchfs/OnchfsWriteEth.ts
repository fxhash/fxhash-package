import { EthereumContractOperation } from "../contractOperation"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { type Inscription } from "onchfs"
import { config } from "@fxhash/config"
import { MULTICALL3_ABI } from "@/abi/Multicall3"
import { ethOnchfsInscriptionCallData } from "@/utils"
import { TransactionType } from "@fxhash/contracts-shared"
import { getCurrentChain } from "@/services/Wallet"

export type TOnchfsWriteOperationParams = {
  inscriptions: Inscription[]
}

/**
 * Write multiple Onchfs inscriptions to ONCHFS. Makes a multicall.
 */
export class OnchfsWriteEthOperation extends EthereumContractOperation<TOnchfsWriteOperationParams> {
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
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
