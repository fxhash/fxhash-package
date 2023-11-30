import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { TransactionReceipt } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

export type TSetTagsEthV1OperationParams = {
  token: string
  tags: bigint[]
}

/**
 * Set the tags for a token (moderator only)
 */
export class SetTagsEthV1Operation extends EthereumContractOperation<TSetTagsEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.token as `0x${string}`,
      abi: FX_GEN_ART_721_ABI,
      functionName: "setTags",
      args: [this.params.tags],
      account: this.manager.address as `0x${string}`,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully set tags for token ${this.params.token}`
  }
}
