import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { tokenLaunchpadAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TTokenLaunchpadSellEthOperationParams = {
  // The address of the creator token
  creatorToken: `0x${string}`
  // The amount of creator tokens being sold
  amountIn: bigint
  // Minimum amount of creator tokens expected (slippage protection)
  minAmountOut: bigint
}

export class TokenLaunchpadSellEthOperation extends EthereumContractOperation<TTokenLaunchpadSellEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof tokenLaunchpadAbi,
      "sell"
    > = {
      address: config.base.contracts.fx_token_launchpad,
      abi: tokenLaunchpadAbi,
      functionName: "sell",
      args: [
        this.params.creatorToken,
        this.params.amountIn,
        this.params.minAmountOut,
      ],
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
