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
export type TProjectFactoryCreateProjectWithCreatorTokenEthOperationParams = {
  projectParams: {
    // Name of the project token
    name: string
    // Symbol of the project token
    symbol: string
    // Address of the existing creator token
    paymentToken: `0x${string}`
    // Address that will own the project token contract
    owner: `0x${string}`
    // Whether the project is long form
    longForm: boolean
  }
  // Base URI for token metadata
  baseURI: string
  // Initial mint fee for the project
  mintFee: bigint
  // Initial fee growth rate for the project
  feeGrowthRate: bigint
  // Array of tag IDs for the project
  tagIds: bigint[]
  // Array of selectors for the project
  selectors: `0x${string}`[]
  // Minting configuration (price and max supply)
  mintInfo: {
    price: bigint
    maxSupply: bigint
    startTime: bigint
  }
}

export class ProjectFactoryCreateProjectWithCreatorTokenEthOperation extends EthereumContractOperation<TProjectFactoryCreateProjectWithCreatorTokenEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof projectFactoryV2Abi,
      "createProjectWithCreatorToken"
    > = {
      address: config.base.contracts.fx_project_factory_v2,
      abi: projectFactoryV2Abi,
      functionName: "createProjectWithCreatorToken",
      args: [
        this.params.projectParams,
        this.params.baseURI,
        this.params.mintFee,
        this.params.feeGrowthRate,
        this.params.tagIds,
        this.params.selectors,
        this.params.mintInfo,
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
