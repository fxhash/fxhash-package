import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { pumpFunAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TPumpFunBuyEthOperationParams = {
  // The address of the creator token
  creatorToken: `0x${string}`
  // The amount of FxTokens being used to purchase creator tokens
  amountIn: bigint
}

export class PumpFunBuyEthOperation extends EthereumContractOperation<TPumpFunBuyEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<typeof pumpFunAbi, "buy"> = {
      address: config.base.contracts.fx_bonding_curve_token_factory,
      abi: pumpFunAbi,
      functionName: "buy",
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
    return "Successfully bought tokens"
  }
}
