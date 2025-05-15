import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { tokenLaunchpadAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TTokenLaunchpadLaunchEthOperationParams = {
  // The name of the creator token
  name: string
  // The symbol of the creator token
  symbol: string
  // The amount of FxTokens used to create liquidity
  purchaseAmount: bigint
  // The metadataUri of the art coin
  contractURI: string
}

export class TokenLaunchpadLaunchEthOperation extends EthereumContractOperation<TTokenLaunchpadLaunchEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof tokenLaunchpadAbi,
      "launch"
    > = {
      address: config.base.contracts.fx_token_launchpad,
      abi: tokenLaunchpadAbi,
      functionName: "launch",
      args: [
        this.params.name,
        this.params.symbol,
        this.params.purchaseAmount,
        this.params.contractURI,
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
