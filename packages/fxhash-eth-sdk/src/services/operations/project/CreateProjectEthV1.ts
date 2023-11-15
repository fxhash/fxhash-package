import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import {
  TransactionReceipt,
  encodeAbiParameters,
  encodeFunctionData,
  getAddress,
} from "viem"
import { FX_ISSUER_FACTORY_ABI } from "@/abi/FxIssuerFactory"
import {
  defineReserveInfo,
  DutchAuctionMintInfoArgs,
  FixedPriceMintInfoArgs,
  InitInfo,
  MetadataInfo,
  MintInfo,
  MintTypes,
  predictTicketContractAddress,
  ProjectInfo,
  ReceiverEntry,
  ReserveInfo,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
  TicketMintInfoArgs,
} from "@/services/operations/EthCommon"
import {
  MAX_UINT_64,
  flattenWhitelist,
  getDutchAuctionMinterEncodedParams,
  getFixedPriceMinterEncodedParams,
} from "@/utils"
import { proposeSafeTransaction } from "@/services/Safe"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"

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
    tagIds: number[]
  }
  projectInfo: {
    onchain: boolean
    mintEnabled: boolean
    burnEnabled: boolean
    maxSupply: bigint
    inputSize: number
    contractURI: string
  }
  metadataInfo: {
    baseURI: string
    imageURI: string
    onchainData?: string
  }
  mintInfo: (
    | FixedPriceMintInfoArgs
    | DutchAuctionMintInfoArgs
    | TicketMintInfoArgs
  )[]
  primaryReceiver: string
  royalties: number
  royaltiesReceivers: ReceiverEntry[]
  isCollab: boolean
}

/**
 * Call the Issuer factory to create a new project
 */
export class CreateProjectEthV1Operation extends EthereumContractOperation<TCreateProjectEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    if (this.params.royalties > 2500) {
      throw Error("Royalties should be lower or equal to 25%")
    }
    const secondaryTotal = this.params.royaltiesReceivers.reduce(
      (acc, entry) => acc + entry.value,
      0
    )

    if (secondaryTotal != 10000) {
      throw Error("Royalties total should be 100%")
    }

    const parsedRoyalties = this.params.royaltiesReceivers.map(entry => {
      return {
        account: entry.account,
        value: (entry.value * this.params.royalties) / 10000,
      }
    })

    const initInfo: InitInfo = {
      name: this.params.initInfo.name,
      symbol: this.params.initInfo.symbol,
      randomizer: FxhashContracts.ETH_RANDOMIZER_V1,
      renderer: FxhashContracts.ETH_RENDERER_V1,
      tagIds: this.params.initInfo.tagIds,
      primaryReceiver: this.params.primaryReceiver,
    }

    const projectInfo: ProjectInfo = {
      burnEnabled: this.params.projectInfo.burnEnabled,
      contractURI: this.params.projectInfo.contractURI,
      inputSize: this.params.projectInfo.inputSize,
      maxSupply: this.params.projectInfo.maxSupply,
      mintEnabled: this.params.projectInfo.mintEnabled,
      onchain: this.params.projectInfo.onchain,
    }

    const metadataInfo: MetadataInfo = {
      baseURI: this.params.metadataInfo.baseURI,
      imageURI: this.params.metadataInfo.imageURI,
      onchainData: this.params.metadataInfo.onchainData
        ? this.params.metadataInfo.onchainData
        : "",
    }

    const mintInfos: MintInfo[] = await Promise.all(
      this.params.mintInfo.map(async argsMintInfo => {
        if (argsMintInfo.type === MintTypes.FIXED_PRICE) {
          const mintInfo: MintInfo = {
            minter: FxhashContracts.ETH_FIXED_PRICE_MINTER_V1,
            reserveInfo: defineReserveInfo(argsMintInfo.reserveInfo),
            params: getFixedPriceMinterEncodedParams(
              argsMintInfo.params.price,
              argsMintInfo.params.whitelist,
              argsMintInfo.params.mintPassSigner
                ? (argsMintInfo.params.mintPassSigner as `0x${string}`)
                : undefined
            ),
          }
          return mintInfo
        } else if (argsMintInfo.type === MintTypes.DUTCH_AUCTION) {
          const mintInfo: MintInfo = {
            minter: FxhashContracts.ETH_DUTCH_AUCTION_V1,
            reserveInfo: {
              allocation: argsMintInfo.reserveInfo.allocation,
              endTime: argsMintInfo.reserveInfo.endTime || MAX_UINT_64,
              startTime: argsMintInfo.reserveInfo.startTime,
            },
            params: getDutchAuctionMinterEncodedParams(
              argsMintInfo.params.prices,
              argsMintInfo.params.stepLength,
              argsMintInfo.params.refunded,
              argsMintInfo.params.whitelist,
              argsMintInfo.params.mintPassSigner
                ? (argsMintInfo.params.mintPassSigner as `0x${string}`)
                : undefined
            ),
          }
          return mintInfo
        } else if (argsMintInfo.type === MintTypes.TICKET) {
          const predictedAddress = await predictTicketContractAddress(
            this.manager.address,
            this.manager
          )
          const encodedPredictedAddress = encodeAbiParameters(
            [{ name: "address", type: "address" }],
            [predictedAddress as `0x${string}`]
          )
          const mintInfo: MintInfo = {
            minter: FxhashContracts.ETH_MINT_TICKETS_FACTORY_V1,
            reserveInfo: defineReserveInfo(argsMintInfo.reserveInfo),
            params: encodedPredictedAddress,
          }
          return mintInfo
        } else {
          throw Error("Invalid mint type")
        }
      })
    )

    if (this.params.isCollab) {
      const safeTransactionData: SafeTransactionDataPartial = {
        to: getAddress(FxhashContracts.ETH_PROJECT_FACTORY),
        data: encodeFunctionData({
          abi: FX_ISSUER_FACTORY_ABI,
          functionName: "createProject",
          args: [
            this.manager.address,
            initInfo,
            projectInfo,
            metadataInfo,
            mintInfos,
            parsedRoyalties.map(entry => entry.account),
            parsedRoyalties.map(entry => entry.value),
          ],
        }),
        value: "0",
      }

      return await proposeSafeTransaction(safeTransactionData, this.manager)
    } else {
      //prepare the actual request to be able to simulate the transaction outcome
      const args: SimulateAndExecuteContractRequest = {
        address: FxhashContracts.ETH_PROJECT_FACTORY as `0x${string}`,
        abi: FX_ISSUER_FACTORY_ABI,
        functionName: "createProject",
        args: [
          this.manager.address,
          initInfo,
          projectInfo,
          metadataInfo,
          mintInfos,
          parsedRoyalties.map(entry => entry.account),
          parsedRoyalties.map(entry => entry.value),
        ],
        account: this.manager.address,
      }
      console.log(args)
      //simulate the transaction and execute it, will throw an error if it fails
      return simulateAndExecuteContract(this.manager, args)
    }
  }

  success(): string {
    return `Your project is successfully published`
  }
}
