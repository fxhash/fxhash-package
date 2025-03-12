import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { pumpFunAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TPumpFunSellEthOperationParams = {
  // The address of the creator token
  creatorToken: `0x${string}`
  // The amount of creator tokens being sold
  amountIn: bigint
}

export class PumpFunSellEthOperation extends EthereumContractOperation<TPumpFunSellEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<typeof pumpFunAbi, "sell"> = {
      address: config.base.contracts.fx_pumpfun,
      abi: pumpFunAbi,
      functionName: "sell",
      args: [this.params.creatorToken, this.params.amountIn],
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
    return "Successfully sold tokens"
  }
}
