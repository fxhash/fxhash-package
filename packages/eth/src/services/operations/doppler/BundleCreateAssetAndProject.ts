import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { fxDopplerFactoryAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type PausedFunctions =
  | "evolve"
  | "mint"
  | "liquidate"
  | "lockMetadata"
  | "regenerate"

export type TBundleCreateAssetAndProjectEthOperationParams = {
  // Creation data to pass to the Airlock contract
  createData: {
    initialSupply: bigint
    numTokensToSell: bigint
    numeraire: `0x${string}`
    tokenFactory: `0x${string}`
    tokenFactoryData: `0x${string}`
    governanceFactory: `0x${string}`
    governanceFactoryData: `0x${string}`
    poolInitializer: `0x${string}`
    poolInitializerData: `0x${string}`
    liquidityMigrator: `0x${string}`
    liquidityMigratorData: `0x${string}`
    integrator: `0x${string}`
    salt: `0x${string}`
  }
  // Name of the project token
  name: string
  // Symbol of the project token
  symbol: string
  // Owner of the project token
  owner: `0x${string}`
  // Initialization parameters
  initParams: {
    // The base URI for the project
    baseURI: string
    renderer: `0x${string}`
    versionManager: `0x${string}`
    feeCurrency: `0x${string}`
    mintFee: bigint
    feeGrowthRate: bigint
    tagIds: bigint[]
    pausedFunctions: PausedFunctions[]
  }
  // Minting configuration
  mintInfo: {
    startTime: bigint
    price: bigint
    maxSupply: bigint
  }
  // Universal Router commands for token purchase
  commands: `0x${string}`
  // Universal Router inputs for token purchase
  inputs: `0x${string}`[]
}

export class BundleCreateAssetAndProjectEthOperation extends EthereumContractOperation<TBundleCreateAssetAndProjectEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof fxDopplerFactoryAbi,
      "bundleCreateAssetAndProject"
    > = {
      address: config.base.contracts.fx_project_factory,
      abi: fxDopplerFactoryAbi,
      functionName: "bundleCreateAssetAndProject",
      args: [
        this.params.createData,
        this.params.name,
        this.params.symbol,
        this.params.owner,
        this.params.initParams,
        this.params.mintInfo,
        this.params.commands,
        this.params.inputs,
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
