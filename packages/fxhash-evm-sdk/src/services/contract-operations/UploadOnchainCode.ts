import { FxhashContracts } from "../../types/Contracts"
import { ContractOperation } from "./contractOperation"
import {
  BaseError,
  ContractFunctionRevertedError,
  TransactionReceipt,
} from "viem"
import { ScriptUpload } from "@/types/OnChainCode"
import { chunkSubstr, stringToBytes } from "@/utils/scripty/utils"
import { ABI } from "@/contracts/ScriptyBuilder"

export type TUploadOnchainCodeOperationParams = {
  uploadRequests: ScriptUpload[]
}

/**
 * Mint an unique iteration of a Generative Token
 */
export class UploadOnchainCodeOperation extends ContractOperation<TUploadOnchainCodeOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    let lastReceipt: TransactionReceipt | undefined = undefined
    const account = this.manager.account

    for (const request of this.params.uploadRequests) {
      // NOTE: Chunks are set to 10,000 because the theoretical limit of 24kb (24576) causes Hardhat to gas out
      // Breaking a big lib like ThreeJS into 14kb chunks will drastically increase gas costs IRL
      console.log("Uploading file: " + request.scriptName)
      console.log("File size: ", request.scriptContent.length)
      const fileChunks = chunkSubstr(request.scriptContent, 10000)
      try {
        const { request: createScriptRequest } = await this.manager
          .getCurrentConfig()
          .publicClient.simulateContract({
            address: FxhashContracts.ETH_SCRIPTY_STORAGE as `0x${string}`,
            abi: ABI,
            functionName: "createScript",
            args: [request.scriptName, stringToBytes(request.scriptName)],
            account: account,
          })

        const createScriptHash = await this.manager.walletClient.writeContract({
          ...createScriptRequest,
          account: account,
        })

        const createScriptReceipt = await this.manager
          .getCurrentConfig()
          .publicClient.waitForTransactionReceipt({ hash: createScriptHash })

        if (createScriptReceipt.status != "success") {
          console.log("Failed to create on chain script: ")
          lastReceipt = createScriptReceipt
        } else {
          console.log("Successfully uploaded script " + request.scriptName)
          console.log(
            `Uploading ${fileChunks.length} chunks for script ${request.scriptName}`
          )
          for (let i = 0; i < fileChunks.length; i++) {
            const chunk = fileChunks[i]
            console.log(
              `Uploading chunk ${i} (size: ${chunk.length}) for script ${request.scriptName}`
            )
            const { request: createChunkRequest } = await this.manager
              .getCurrentConfig()
              .publicClient.simulateContract({
                address: FxhashContracts.ETH_SCRIPTY_STORAGE as `0x${string}`,
                abi: ABI,
                functionName: "addChunkToScript",
                args: [request.scriptName, stringToBytes(chunk)],
                account: account,
              })

            const uploadChunkHash =
              await this.manager.walletClient.writeContract({
                ...createChunkRequest,
                account: account,
              })

            const uploadChunkReceipt = await this.manager
              .getCurrentConfig()
              .publicClient.waitForTransactionReceipt({ hash: uploadChunkHash })

            lastReceipt = uploadChunkReceipt
            if (uploadChunkReceipt.status != "success") {
              console.log("Failed to create on chain script chunk " + i)
              break
            }
            console.log(
              `Successfully uploaded chunk ${i} for script ${request.scriptName}`
            )
          }
        }
      } catch (err) {
        //console.log("error: ", err)
        if (err instanceof BaseError) {
          const revertError = err.walk(
            err => err instanceof ContractFunctionRevertedError
          )
          if (revertError instanceof ContractFunctionRevertedError) {
            console.log("errordata: ", JSON.stringify(revertError))
          }
        }
      }
    }

    return lastReceipt
  }

  success(): string {
    return `Your script(s) have been successfully published`
  }
}
