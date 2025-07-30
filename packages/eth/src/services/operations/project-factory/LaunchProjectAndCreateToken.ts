import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { projectFactoryV2Abi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TLaunchTokenAndCreateProjectEthOperationParams = {
  // Name of both the project and creator tokens
  name: string
  // Symbol for both the project and creator tokens
  symbol: string
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
  // Amount of FX tokens to stake for creator token launch
  fxAmount: bigint
  // Initial mint fee for the project
  mintFee: bigint
  // URI for creator token contract metadata
  contractURI: string
  // The public trading time of the coin
  publicTradingTime: bigint
}

export class LaunchTokenAndCreateProjectEthOperation extends EthereumContractOperation<TLaunchTokenAndCreateProjectEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof projectFactoryV2Abi,
      "launchTokenAndCreateProject"
    > = {
      address: config.base.contracts.fx_project_factory,
      abi: projectFactoryV2Abi,
      functionName: "launchTokenAndCreateProject",
      args: [
        this.params.name,
        this.params.symbol,
        this.params.owner,
        this.params.baseURI,
        this.params.mintInfo,
        this.params.tagIds,
        this.params.fxAmount,
        this.params.mintFee,
        this.params.contractURI,
        this.params.publicTradingTime,
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
