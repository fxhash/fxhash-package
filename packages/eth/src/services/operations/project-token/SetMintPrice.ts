import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { projectTokenAbi } from "@/__generated__/wagmi.js"

export type TProjectTokenSetMintPriceEthOperationParams = {
  // The address of the project token
  projectToken: `0x${string}`
  // The mint price
  mintPrice: bigint
}

export class ProjectTokenSetMintPriceEthOperation extends EthereumContractOperation<TProjectTokenSetMintPriceEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof projectTokenAbi,
      "setMintPrice"
    > = {
      address: this.params.projectToken,
      abi: projectTokenAbi,
      functionName: "setMintPrice",
      args: [this.params.mintPrice],
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
    return "Successfully set project fees"
  }
}
