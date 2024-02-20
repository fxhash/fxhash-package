import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { TransactionReceipt } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { TransactionType } from "@fxhash/contracts-shared"
import { getCurrentChain } from "@/services/Wallet"

export type TTransferTokenEthV1OperationParams = {
  token: `0x${string}`
  from: `0x${string}`
  to: `0x${string}`
  tokenId: number
}

/**
 * Transfer a token (ERC721)
 */
export class TransferTokenEthV1Operation extends EthereumContractOperation<TTransferTokenEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.token,
      abi: FX_GEN_ART_721_ABI,
      functionName: "safeTransferFrom",
      args: [this.params.from, this.params.to, this.params.tokenId],
      account: this.manager.address as `0x${string}`,
      chain: getCurrentChain(this.chain),
    }
    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `Successfully transfered token ${this.params.token} with tokenId ${this.params.tokenId}`
  }
}
