import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { projectFactoryV2Abi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

// Creates a new project using an existing creator token
export type TTokenLaunchpadCreateProjectWithCreatorTokenEthOperationParams = {
  // Name of the project token
  name: string
  // Symbol of the project token
  symbol: string
  // Address of the existing creator token
  creatorToken: `0x${string}`
  // Address that will own the project token contract
  owner: `0x${string}`
  // Base URI for token metadata
  baseURI: string
  // Minting configuration (price and max supply)
  mintInfo: {
    price: bigint
    maxSupply: bigint
  }
  // Array of tag IDs for the project
  tagIds: bigint[]
  // Initial mint fee for the project
  mintFee: bigint
}

export class TokenLaunchpadCreateProjectWithCreatorTokenEthOperation extends EthereumContractOperation<TTokenLaunchpadCreateProjectWithCreatorTokenEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof projectFactoryV2Abi,
      "createProjectWithCreatorToken"
    > = {
      address: config.base.contracts.fx_project_factory,
      abi: projectFactoryV2Abi,
      functionName: "createProjectWithCreatorToken",
      args: [
        this.params.name,
        this.params.symbol,
        this.params.creatorToken,
        this.params.owner,
        this.params.baseURI,
        this.params.mintInfo,
        this.params.tagIds,
        this.params.mintFee,
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
    return "Successfully created project"
  }
}
