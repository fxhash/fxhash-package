import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { projectFactoryAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TTokenLaunchpadLaunchProjectAndCreateTokenEthOperationParams = {
  // The metadataUri of the art coin
  contractURI: string
  // The name of the project
  name: string
  // The symbol of the project
  symbol: string
  // The initial owner address
  initialOwner: `0x${string}`
  // The base URI for the project
  baseURI: string
  mintFee: bigint
  mintInfo: {
    price: bigint
    maxSupply: bigint
  }
  tagIds: bigint[]
  // The amount of FxTokens used to create liquidity
  purchaseAmount: bigint
}

export class TokenLaunchpadLaunchProjectAndCreateTokenEthOperation extends EthereumContractOperation<TTokenLaunchpadLaunchProjectAndCreateTokenEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof projectFactoryAbi,
      "launchTokenAndCreateProject"
    > = {
      address: config.base.contracts.fx_project_factory,
      abi: projectFactoryAbi,
      functionName: "launchTokenAndCreateProject",
      args: [
        this.params.name,
        this.params.symbol,
        this.params.initialOwner,
        this.params.baseURI,
        this.params.mintInfo,
        this.params.tagIds,
        this.params.purchaseAmount,
        this.params.mintFee,
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
    return "Successfully created project and token"
  }
}
