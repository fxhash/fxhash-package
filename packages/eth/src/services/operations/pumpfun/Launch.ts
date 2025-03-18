import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { pumpFunAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TPumpFunLaunchEthOperationParams = {
  // The amount of FxTokens used to create liquidity
  purchaseAmount: bigint
  // The name of the creator token
  name: string
  // The symbol of the creator token
  symbol: string
}

export class PumpFunLaunchEthOperation extends EthereumContractOperation<TPumpFunLaunchEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<typeof pumpFunAbi, "launch"> =
      {
        address: config.base.contracts.fx_bonding_curve_token_factory,
        abi: pumpFunAbi,
        functionName: "launch",
        args: [
          this.params.purchaseAmount,
          this.params.name,
          this.params.symbol,
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
    return "Successfully created token"
  }
}
