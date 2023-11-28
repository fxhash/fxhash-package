import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import {
  TransactionReceipt,
  encodeFunctionData,
  getAddress,
  getContract,
} from "viem"
import { FX_ISSUER_FACTORY_ABI } from "@/abi/FxIssuerFactory"
import { SPLITS_MAIN_ABI } from "@/abi/SplitsMain"

import {
  DutchAuctionMintInfoArgs,
  FixedPriceMintInfoArgs,
  InitInfo,
  MetadataInfo,
  MintInfo,
  MintTypes,
  predictFxContractAddress,
  prepareReceivers,
  ProjectInfo,
  ReceiverEntry,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
  TicketMintInfoArgs,
} from "@/services/operations/EthCommon"
import { ZERO_ADDRESS, processAndFormatMintInfos } from "@/utils"
import { proposeSafeTransaction } from "@/services/Safe"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import { getHashFromIPFSCID } from "@/utils/ipfs"
import {
  encodeProjectFactoryArgs,
  encodeTicketFactoryArgs,
} from "@/utils/factories"

export type ScriptyHTMLTag = {
  name: string
  contractAddress: string
  contractData: string
  tagType: string
  tagOpen: string
  tagClose: string
  tagContent: string
}

/**
 * The above type represents the parameters required for an operation in the TMintEthIssuerV1 contract.
 * @property initInfo - The `initInfo` property contains information about the initial setup of the
 * token. It includes the following properties:
 * @property projectInfo - The `projectInfo` property contains information about the project or token.
 * Here's a breakdown of its properties:
 * @property metadataInfo - - `baseURI`: The base URI for the metadata of the minted tokens.
 * @property {(
 *     | FixedPriceMintInfoArgs
 *     | DutchAuctionMintInfoArgs
 *     | TicketMintInfoArgs
 *   )[]} mintInfo - The `mintInfo` property is an array that contains objects with information about
 * the different types of minting methods for the token. There are three possible types of minting
 * methods:
 * @property {ReceiverEntry[]} primaryReceivers - The `primaryReceivers` property is an array of
 * `ReceiverEntry` objects. Each `ReceiverEntry` object represents a primary receiver of the minted
 * tokens and its share
 * @property {ReceiverEntry[]} royaltiesReceivers - The `royaltiesReceivers` property is an array of
 * `ReceiverEntry` objects. Each `ReceiverEntry` object represents a receiver of royalties and its share
 * @dev {ReceiverEntry[]} primaryReceivers should use a base of 10000 for 100%, and the total of all
 * the entries SHOULD BE 10000
 * @dev {ReceiverEntry[]} royaltiesReceivers should use a base of 10000 for 100%, and the total of all
 * the entries SHOULD BE LOWER than 10000
 */
export type TCreateProjectEthV1OperationParams = {
  initInfo: {
    name: string
    symbol: string
    tagIds: bigint[]
  }
  projectInfo: {
    mintEnabled: boolean
    burnEnabled: boolean
    maxSupply: bigint
    inputSize: bigint
  }
  metadataInfo?: {
    baseURI?: string
    onchainPointer?: `0x${string}`
  }
  mintInfo: (
    | FixedPriceMintInfoArgs
    | DutchAuctionMintInfoArgs
    | TicketMintInfoArgs
  )[]
  primaryReceivers: ReceiverEntry[]
  royalties: bigint
  royaltiesReceivers: ReceiverEntry[]
  ticketInfo?: {
    gracePeriod: number
    mintInfo: (
      | FixedPriceMintInfoArgs
      | DutchAuctionMintInfoArgs
      | TicketMintInfoArgs
    )[]
  }
  isCollab: boolean
}

/**
 * Call the Issuer factory to create a new project
 */
export class CreateProjectEthV1Operation extends EthereumContractOperation<TCreateProjectEthV1OperationParams> {
  static getDeployedTokenFromReceipt(receipt: TransactionReceipt) {
    return receipt.logs[1].address
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    const splitsFactory = getContract({
      address: FxhashContracts.ETH_SPLITS_MAIN as `0x${string}`,
      abi: SPLITS_MAIN_ABI,
      walletClient: this.manager.walletClient,
      publicClient: this.manager.publicClient,
    })

    const primaryReceivers = prepareReceivers(
      this.params.primaryReceivers,
      "primary"
    )

    //since we are using splits, we need to create the splits first. So we get the immutable address of the splits
    const splitsAddress = await splitsFactory.read.predictImmutableSplitAddress(
      [
        primaryReceivers.map(entry => entry.address),
        primaryReceivers.map(entry => entry.pct),
        0,
      ]
    )

    if (typeof splitsAddress != "string") {
      throw Error("Could not get split address")
    }

    if (this.params.royalties > 2500) {
      throw Error("Royalties should be lower or equal to 25%")
    }

    const secondaryReceivers = prepareReceivers(
      this.params.royaltiesReceivers,
      "secondary"
    )

    const owner = this.params.isCollab
      ? await this.manager.safe.getAddress()
      : this.manager.address

    const initInfo: InitInfo = {
      name: this.params.initInfo.name,
      symbol: this.params.initInfo.symbol,
      randomizer: FxhashContracts.ETH_RANDOMIZER_V1 as `0x${string}`,
      renderer: FxhashContracts.ETH_IPFS_RENDERER_V1 as `0x${string}`,
      tagIds: this.params.initInfo.tagIds,
      primaryReceiver: splitsAddress as `0x${string}`,
    }

    const projectInfo: ProjectInfo = {
      burnEnabled: this.params.projectInfo.burnEnabled,
      inputSize: this.params.projectInfo.inputSize,
      maxSupply: this.params.projectInfo.maxSupply,
      mintEnabled: this.params.projectInfo.mintEnabled,
    }

    let baseURI = ""
    let onchainPointer = ZERO_ADDRESS
    if (this.params.metadataInfo) {
      baseURI = this.params.metadataInfo.baseURI
      if (this.params.metadataInfo.baseURI) {
        if (!this.params.metadataInfo.baseURI.startsWith("ipfs://"))
          throw Error("Invalid baseURI")
        baseURI = getHashFromIPFSCID(
          this.params.metadataInfo.baseURI.split("ipfs://")[1]
        )
      } else {
        baseURI = ""
      }
      onchainPointer = this.params.metadataInfo.onchainPointer
        ? this.params.metadataInfo.onchainPointer
        : ZERO_ADDRESS
    }
    const metadataInfo: MetadataInfo = {
      baseURI: baseURI as `0x${string}`,
      onchainPointer: onchainPointer,
    }

    const mintInfos: MintInfo[] = await processAndFormatMintInfos(
      this.params.mintInfo,
      this.manager
    )

    const hasTicketMintInfo = this.params.mintInfo.some(mint => {
      return mint.type === MintTypes.TICKET
    })

    let args: unknown[]
    if (hasTicketMintInfo && !this.params.ticketInfo) {
      throw Error("Ticket mint info required")
    } else if (hasTicketMintInfo && this.params.ticketInfo) {
      /**
       * this scenario requires calling a different endpoint and encoding
       * the parameters as bytes
       */
      const projectEncodedArgs = encodeProjectFactoryArgs(
        this.manager.address as `0x${string}`,
        initInfo,
        projectInfo,
        metadataInfo,
        mintInfos,
        secondaryReceivers.map(entry => entry.address),
        secondaryReceivers.map(entry => Number(entry.pct)),
        this.params.royalties
      )
      const ticketEncodedArgs = encodeTicketFactoryArgs(
        this.manager.address as `0x${string}`,
        await predictFxContractAddress(owner, "issuer", this.manager),
        FxhashContracts.ETH_TICKET_REDEEMER_V1,
        FxhashContracts.ETH_IPFS_RENDERER_V1,
        this.params.ticketInfo.gracePeriod,
        await processAndFormatMintInfos(
          this.params.ticketInfo.mintInfo,
          this.manager
        )
      )
      args = [
        projectEncodedArgs,
        ticketEncodedArgs,
        FxhashContracts.ETH_MINT_TICKETS_FACTORY_V1,
      ]
    } else {
      args = [
        this.manager.address,
        initInfo,
        projectInfo,
        metadataInfo,
        mintInfos,
        secondaryReceivers.map(entry => entry.address),
        secondaryReceivers.map(entry => entry.pct),
        this.params.royalties,
      ]
    }
    if (this.params.isCollab) {
      const safeTransactionData: SafeTransactionDataPartial = {
        to: getAddress(FxhashContracts.ETH_PROJECT_FACTORY),
        data: encodeFunctionData({
          abi: FX_ISSUER_FACTORY_ABI,
          functionName: "createProject",
          args: args,
        }),
        value: "0",
      }

      return await proposeSafeTransaction(safeTransactionData, this.manager)
    } else {
      //prepare the actual request to be able to simulate the transaction outcome
      const contractArgs: SimulateAndExecuteContractRequest = {
        address: FxhashContracts.ETH_PROJECT_FACTORY as `0x${string}`,
        abi: FX_ISSUER_FACTORY_ABI,
        functionName: "createProject",
        args: args,
        account: this.manager.address as `0x${string}`,
      }
      //simulate the transaction and execute it, will throw an error if it fails
      return simulateAndExecuteContract(this.manager, contractArgs)
    }
  }

  success(): string {
    return `Your project is successfully published`
  }
}
