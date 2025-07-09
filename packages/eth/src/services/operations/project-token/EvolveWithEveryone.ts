import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContractWithApproval,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { projectTokenAbi } from "@/__generated__/wagmi.js"
import { zeroAddress } from "viem"
import { ApprovalParams } from "@/types/approval"

// Note: only the owner of the project can evolve via this method
export interface TProjectTokenEvolveWithEveryoneEthOperationParams
  extends ApprovalParams {
  // The address of the project token
  projectToken: `0x${string}`
  // The parent id iteration to evolve
  parentId: bigint
  // The address of the recipient
  address: `0x${string}`
  // Quantity or amount of token to mint
  amount: bigint
  // The optional mint fee amount
  mintFeeAmount?: bigint
  // The optional mint fee currency
  mintFeeCurrency?: string
  // Additional operations to add to the batched transaction
  additionalOperations?: any[]
}

export class ProjectTokenEvolveWithEveryoneOperation extends EthereumContractOperation<TProjectTokenEvolveWithEveryoneEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof projectTokenAbi,
      "evolveWithEveryone"
    > = {
      address: this.params.projectToken,
      abi: projectTokenAbi,
      functionName: "evolveWithEveryone",
      args: [this.params.parentId, this.params.address, this.params.amount],
      account: this.manager.address as `0x${string}`,
      chain: getCurrentChain(this.chain),
      value:
        this.params.mintFeeCurrency === zeroAddress
          ? this.params.mintFeeAmount
          : undefined,
    }
    const transactionHash = await simulateAndExecuteContractWithApproval(
      this.manager,
      args,
      this.params.approval,
      this.params.additionalOperations
    )
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return "Successfully evolved token"
  }
}
