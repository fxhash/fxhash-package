import { EthereumContractOperation } from "../contractOperation.js"
import { TransactionReceipt, encodeFunctionData, getAddress } from "viem"
import { FX_ISSUER_FACTORY_ABI } from "@/abi/FxIssuerFactory.js"

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
} from "@/services/operations/EthCommon.js"
import { ZERO_ADDRESS, processAndFormatMintInfos } from "@/utils/index.js"
import { proposeSafeTransaction } from "@/services/Safe.js"
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
import { getHashFromIPFSCID } from "@/utils/ipfs.js"
import {
  encodeProjectFactoryArgs,
  encodeTicketFactoryArgs,
} from "@/utils/factories.js"
import { TransactionType } from "@fxhash/shared"
import { invariant } from "@fxhash/utils"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"

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
    renderer: "ipfs" | "onchfs"
    onchainData?: `0x${string}`
  }
  projectInfo: {
    mintEnabled: boolean
    burnEnabled: boolean
    maxSupply: bigint
    inputSize: bigint
    earliestStartTime?: number
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
  collabAddress?: string
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
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const primaryReceivers = prepareReceivers(
      this.chain,
      this.params.primaryReceivers,
      "primary"
    )

    if (this.params.royalties > 2500) {
      throw Error("Royalties should be lower or equal to 25%")
    }

    const secondaryReceivers = prepareReceivers(
      this.chain,
      this.params.royaltiesReceivers,
      "secondary"
    )

    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
    }

    const owner = (
      this.params.collabAddress
        ? this.params.collabAddress
        : this.manager.address
    ) as `0x${string}`

    const initInfo: InitInfo = {
      name: this.params.initInfo.name,
      symbol: this.params.initInfo.symbol,
      randomizer: currentConfig.contracts.randomizer_v1 as `0x${string}`,
      /**
       * TODO
       * -------------------------------------------------------------------
       * @note For now the ONCHFS renderer doesn't work as we want it to work,
       * so we'll use the IPFS renderer for all the projects, and we'll swap
       * out the IPFS renderer by the ONCHFS one down the line.
       * Only then, the ONCHFS renderer will be used on onchfs projects.
       */
      renderer: currentConfig.contracts.ipfs_renderer_v1 as any,
      // this.params.initInfo.renderer === "ipfs"
      //   ? (FxhashContracts.ETH_IPFS_RENDERER_V1 as any)
      //   : FxhashContracts.ETH_ONCHFS_RENDERER_V1,
      tagIds: this.params.initInfo.tagIds,
      primaryReceivers: primaryReceivers.map(entry => entry.address),
      allocations: primaryReceivers.map(entry => entry.pct),
      onchainData: this.params.initInfo.onchainData
        ? this.params.initInfo.onchainData
        : "0x",
    }

    const projectInfo: ProjectInfo = {
      burnEnabled: this.params.projectInfo.burnEnabled,
      inputSize: this.params.projectInfo.inputSize,
      maxSupply: this.params.projectInfo.maxSupply,
      mintEnabled: this.params.projectInfo.mintEnabled,
      earliestStartTime: this.params.projectInfo.earliestStartTime
        ? this.params.projectInfo.earliestStartTime
        : 0,
    }

    let baseURI = ""
    let onchainPointer = ZERO_ADDRESS
    if (this.params.metadataInfo) {
      invariant(
        this.params.metadataInfo.baseURI,
        "baseURI or onchainPointer is required"
      )
      baseURI = this.params.metadataInfo.baseURI
      if (this.params.metadataInfo.baseURI) {
        if (this.params.metadataInfo.baseURI.startsWith("ipfs://")) {
          baseURI = getHashFromIPFSCID(
            this.params.metadataInfo.baseURI.split("ipfs://")[1]
          )
        } else if (this.params.metadataInfo.baseURI.startsWith("onchfs://")) {
          baseURI = this.params.metadataInfo.baseURI.replace("onchfs://", "")
        } else {
          throw new Error("base URI format is not supported")
        }
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
      this.manager,
      this.chain
    )

    const hasTicketMintInfo = this.params.mintInfo.some(mint => {
      return mint.type === MintTypes.TICKET
    })

    let args: unknown[]
    let functionName: string
    if (hasTicketMintInfo && !this.params.ticketInfo) {
      throw Error("Ticket mint info required")
    } else if (hasTicketMintInfo && this.params.ticketInfo) {
      functionName = "createProjectWithTicket"
      /**
       * this scenario requires calling a different endpoint and encoding
       * the parameters as bytes
       */
      const projectEncodedArgs = encodeProjectFactoryArgs(
        owner,
        initInfo,
        projectInfo,
        metadataInfo,
        mintInfos,
        secondaryReceivers.map(entry => entry.address),
        secondaryReceivers.map(entry => Number(entry.pct)),
        this.params.royalties
      )
      const ticketEncodedArgs = encodeTicketFactoryArgs(
        owner,
        await predictFxContractAddress(
          owner,
          "issuer",
          this.manager,
          this.chain
        ),
        currentConfig.contracts.ticket_redeemer_v1,
        currentConfig.contracts.ipfs_renderer_v1,
        this.params.ticketInfo.gracePeriod,
        await processAndFormatMintInfos(
          this.params.ticketInfo.mintInfo,
          this.manager,
          this.chain
        )
      )
      args = [
        projectEncodedArgs,
        ticketEncodedArgs,
        currentConfig.contracts.mint_ticket_factory_v1,
      ]
    } else {
      functionName = "createProjectWithParams"

      args = [
        owner,
        initInfo,
        projectInfo,
        metadataInfo,
        mintInfos,
        secondaryReceivers.map(entry => entry.address),
        secondaryReceivers.map(entry => entry.pct),
        this.params.royalties,
      ]
    }
    if (this.params.collabAddress) {
      const safeTransactionData: MetaTransactionData = {
        to: getAddress(currentConfig.contracts.project_factory_v1),
        data: encodeFunctionData({
          abi: FX_ISSUER_FACTORY_ABI,
          functionName: functionName,
          args: args,
        }),
        value: "0",
      }

      const transactionHash = await proposeSafeTransaction(
        this.chain,
        [safeTransactionData],
        this.manager
      )
      return {
        type: TransactionType.OFFCHAIN,
        hash: transactionHash,
      }
    } else {
      //prepare the actual request to be able to simulate the transaction outcome
      const contractArgs: SimulateAndExecuteContractRequest = {
        address: currentConfig.contracts.project_factory_v1,
        abi: FX_ISSUER_FACTORY_ABI,
        functionName: functionName,
        args: args,
        account: this.manager.address as `0x${string}`,
        chain: getCurrentChain(this.chain),
      }
      //simulate the transaction and execute it, will throw an error if it fails
      const transactionHash = await simulateAndExecuteContract(
        this.manager,
        contractArgs
      )
      return {
        type: TransactionType.ONCHAIN,
        hash: transactionHash,
      }
    }
  }

  success(): string {
    return `Your project is successfully published`
  }
}
