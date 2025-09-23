import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { projectTokenAbi } from "@/__generated__/wagmi.js"

export type TProjectTokenSetMintFeeEthOperationParams = {
  // The address of the project token
  projectToken: `0x${string}`
  // The mint fee amount
  mintFeeAmount: bigint
  // The mint fee currency
  mintFeeCurrency: `0x${string}`
}

export class ProjectTokenSetMintFeeEthOperation extends EthereumContractOperation<TProjectTokenSetMintFeeEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof projectTokenAbi,
      "setMintFee"
    > = {
      address: this.params.projectToken,
      abi: projectTokenAbi,
      functionName: "setMintFee",
      args: [this.params.mintFeeCurrency, this.params.mintFeeAmount],
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
