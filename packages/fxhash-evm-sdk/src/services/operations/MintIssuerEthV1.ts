import { FxhashContracts } from "@/contracts/Contracts"
import { ContractOperation } from "./contractOperation"
import { TransactionReceipt, getContract } from "viem"
import { ABI as ISplitsMainABI } from "@/abi/ISplitsMain"
import { ABI as IssuerFactoryABI } from "@/abi/FxIssuerFactory"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { getConfig } from "../Wallet"

export type ScriptyHTMLTag = {
  name: string
  contractAddress: string
  contractData: string
  tagType: string
  tagOpen: string
  tagClose: string
  tagContent: string
}
export type TMintEthIssuerV1OperationParams = {
  projectInfo: {
    enabled: boolean
    onchain: boolean
    supply: bigint
    contractURI: string
  }
  metadataInfo: {
    baseURI: string
    imageURI: string
    animation: {
      bodyTags: ScriptyHTMLTag[]
      headTags: ScriptyHTMLTag[]
    }
    attributes: {
      bodyTags: ScriptyHTMLTag[]
      headTags: ScriptyHTMLTag[]
    }
  }
  mintInfo: [
    {
      minter: string
      reserveInfo: {
        startTime: number
        endTime: number
        allocation: bigint
      }
      params: string
    }
  ]
  primaryReceivers: string[]
  primaryBasisPoints: bigint[]
  royaltiesReceivers: string[]
  basisPoints: bigint[]
}

/**
 * Mint an unique iteration of a Generative Token
 */
export class MintEthIssuerV1Operation extends ContractOperation<TMintEthIssuerV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const splitsFactory = getContract({
      address: FxhashContracts.ETH_SPLITS_MAIN as `0x${string}`,
      abi: ISplitsMainABI,
      walletClient: this.manager.walletClient,
      publicClient: getConfig().publicClient,
    })

    //get the address from the wallet
    const account = this.manager.walletClient.account.address

    //since we are using splits, we need to create the splits first. So we get the immutable address of the splits
    const splitsAddress = await splitsFactory.read.predictImmutableSplitAddress(
      [this.params.primaryReceivers, this.params.primaryBasisPoints, 0]
    )

    //prepare the actual request to be able to simulate the transaction outcome
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_PROJECT_FACTORY as `0x${string}`,
      abi: IssuerFactoryABI,
      functionName: "createProject",
      args: [
        account,
        splitsAddress,
        this.params.projectInfo,
        this.params.metadataInfo,
        this.params.mintInfo,
        this.params.royaltiesReceivers,
        this.params.basisPoints,
      ],
      account: account,
    }
    //simulate the transaction and execute it, will throw an error if it fails
    return simulateAndExecuteContract(
      getConfig().publicClient,
      this.manager.walletClient,
      args
    )
  }

  success(): string {
    return `Your project is successfully published`
  }
}
