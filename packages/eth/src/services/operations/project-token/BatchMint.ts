import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import { simulateAndExecuteContractWithApproval } from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { projectTokenAbi } from "@/__generated__/wagmi.js"
import { zeroAddress } from "viem"
import { ApprovalParams } from "@/types/approval"

export interface TProjectTokenBatchMintEthOperationParams
  extends ApprovalParams {
  // The address of the project token
  projectToken: `0x${string}`
  // The address of the recipient
  address: `0x${string}`
  // Quantity or amount of token to mint
  amount: bigint
  // The optional mint fee amount
  mintFeeAmount?: bigint
  // The optional mint fee currency
  mintFeeCurrency?: string
  // Additional operations to add to the batched tranaction
  additionalOperations?: any[]
}

export class ProjectTokenBatchMintEthOperation extends EthereumContractOperation<TProjectTokenBatchMintEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const account = this.manager.address as `0x${string}`
    const chain = getCurrentChain(this.chain)

    const transactionHash = await simulateAndExecuteContractWithApproval(
      this.manager,
      {
        address: this.params.projectToken,
        abi: projectTokenAbi,
        functionName: "batchMint",
        args: [this.params.address, this.params.amount],
        account,
        chain,
        value:
          this.params.mintFeeCurrency === zeroAddress
            ? this.params.mintFeeAmount
            : undefined,
      },
      this.params.approval,
      this.params.additionalOperations
    )
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return "Successfully minted token"
  }
}
