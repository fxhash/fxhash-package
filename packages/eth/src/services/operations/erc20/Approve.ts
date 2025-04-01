import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { erc20Abi } from "viem"

export type TErc20ApproveEthOperationParams = {
  // The address of the token
  tokenAddress: `0x${string}`
  // The address of the spender
  spenderAddress: `0x${string}`
  // The amount of tokens to approve
  amount: bigint
}

export class Erc20ApproveEthOperation extends EthereumContractOperation<TErc20ApproveEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<typeof erc20Abi, "approve"> =
      {
        address: this.params.tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [this.params.spenderAddress, this.params.amount],
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
    return "Successfully bought tokens"
  }
}
