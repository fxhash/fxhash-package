import { EthereumContractOperation } from "../contractOperation"
import { bytesToHex, encodeFunctionData, TransactionReceipt } from "viem"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { type Inscription } from "onchfs"
import { CallData } from "@0xsplits/splits-sdk"
import { config } from "@fxhash/config"
import { ONCHFS_CONTENT_STORE, ONCHFS_FILE_SYSTEM_ABI } from "@/abi"
import { MULTICALL3_ABI } from "@/abi/Multicall3"

export type TOnchfsWriteOperationParams = {
  inscriptions: Inscription[]
}

/**
 * Write multiple Onchfs inscriptions to ONCHFS. Makes a multicall.
 */
export class OnchfsWriteEthOperation extends EthereumContractOperation<TOnchfsWriteOperationParams> {
  async prepare() {}

  private inscriptionCallData(ins: Inscription): CallData {
    switch (ins.type) {
      case "chunk":
        return {
          address: config.eth.contracts.onchfs_content_store,
          data: encodeFunctionData({
            abi: ONCHFS_CONTENT_STORE,
            functionName: "addContent",
            args: [bytesToHex(ins.content)],
          }),
        }
      case "file":
        return {
          address: config.eth.contracts.onchfs_file_system,
          data: encodeFunctionData({
            abi: ONCHFS_FILE_SYSTEM_ABI,
            functionName: "createFile",
            args: [
              bytesToHex(ins.metadata),
              ins.chunks.map(chunk => bytesToHex(chunk)),
            ],
          }),
        }
      case "directory":
        return {
          address: config.eth.contracts.onchfs_file_system,
          data: encodeFunctionData({
            abi: ONCHFS_FILE_SYSTEM_ABI,
            functionName: "createDirectory",
            args: Object.keys(ins.files)
              .sort()
              .map(key => [key, ins.files[key]])
              .reduce(
                (acc, [name, content]) => [
                  [...acc[0], name],
                  [...acc[1], bytesToHex(content as any)],
                ],
                [[], []]
              ),
          }),
        }
    }
  }

  async call(): Promise<TransactionReceipt> {
    const callRequests = this.params.inscriptions
      .map(ins => this.inscriptionCallData(ins))
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
