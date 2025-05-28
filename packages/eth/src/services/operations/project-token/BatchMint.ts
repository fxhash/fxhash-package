import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  simulateAndExecuteBatched,
  type BatchedCall,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { projectTokenAbi } from "@/__generated__/wagmi.js"
import { erc20Abi, zeroAddress } from "viem"

export type TProjectTokenBatchMintEthOperationParams = {
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
  approval?: {
    tokenAddress: `0x${string}`
    spenderAddress: `0x${string}`
    amount: bigint
  }
}

export class ProjectTokenBatchMintEthOperation extends EthereumContractOperation<TProjectTokenBatchMintEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const account = this.manager.address as `0x${string}`
    const chain = getCurrentChain(this.chain)

    if (this.params.approval) {
      // Build the batched calls
      const calls: BatchedCall[] = [
        {
          to: this.params.approval.tokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [
            this.params.approval.spenderAddress,
            this.params.approval.amount,
          ],
        },
        {
          to: this.params.projectToken,
          abi: projectTokenAbi,
          functionName: "batchMint",
          args: [this.params.address, this.params.amount],
          value:
            this.params.mintFeeCurrency === zeroAddress
              ? this.params.mintFeeAmount
              : undefined,
        },
      ]

      // Execute batched transaction with proper error handling
      const transactionHash = await simulateAndExecuteBatched(this.manager, {
        chain,
        calls,
      })

      return {
        type: TransactionType.ONCHAIN,
        hash: transactionHash,
      }
    }

    // Single transaction path
    const transactionHash = await simulateAndExecuteContract(this.manager, {
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
    })
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return "Successfully minted token"
  }
}
