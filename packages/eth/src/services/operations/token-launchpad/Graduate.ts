import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { tokenLaunchpadAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export interface TTokenLaunchpadGraduateEthOperationParams {
  // The address of the creator token
  creatorToken: `0x${string}`
}

export class TokenLaunchpadGraduateEthOperation extends EthereumContractOperation<TTokenLaunchpadGraduateEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof tokenLaunchpadAbi,
      "graduate"
    > = {
      address: config.base.contracts.fx_token_launchpad,
      abi: tokenLaunchpadAbi,
      functionName: "graduate",
      args: [this.params.creatorToken],
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
    return "Successfully graduated token"
  }
}
