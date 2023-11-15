import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { encodeAbiParameters, TransactionReceipt } from "viem"
import { FX_TICKETS_FACTORY_ABI } from "@/abi/FxTicketFactory"
import {
  defineReserveInfo,
  DutchAuctionMintInfoArgs,
  FixedPriceMintInfoArgs,
  MintInfo,
  MintTypes,
  predictTicketContractAddress,
  ReserveInfo,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
  TicketMintInfoArgs,
} from "@/services/operations/EthCommon"
import {
  flattenWhitelist,
  getDutchAuctionMinterEncodedParams,
  getFixedPriceMinterEncodedParams,
  getHashFromIPFSCID,
  MAX_UINT_64,
} from "@/utils"

export type TCreateTicketEthV1OperationParams = {
  token: string
  gracePeriod: number
  baseURI: string
  mintInfo: (
    | FixedPriceMintInfoArgs
    | DutchAuctionMintInfoArgs
    | TicketMintInfoArgs
  )[]
}

/**
 * Create a new mint ticket contract
 * @dev contract interface:
 * function createTicket(
 *      address _owner,
 *      address _genArt721,
 *      uint48 _gracePeriod,
 *      string calldata _baseURI
 *  )
 */
export class CreateTicketEthV1Operation extends EthereumContractOperation<TCreateTicketEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    //TODO: @flo need to clean that up
    const mintInfos: MintInfo[] = await Promise.all(
      this.params.mintInfo.map(async argsMintInfo => {
        const reserveInfo = defineReserveInfo(argsMintInfo.reserveInfo)
        if (argsMintInfo.type === MintTypes.FIXED_PRICE) {
          const mintInfo: MintInfo = {
            minter: FxhashContracts.ETH_FIXED_PRICE_MINTER_V1,
            reserveInfo: reserveInfo,
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
            reserveInfo: reserveInfo,
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
        } else {
          throw Error("Invalid mint type")
        }
      })
    )
    let baseURI = this.params.baseURI

    if (!this.params.baseURI.startsWith("ipfs://"))
      throw Error("Invalid baseURI")
    baseURI = getHashFromIPFSCID(this.params.baseURI.split("ipfs://")[1])

    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_MINT_TICKETS_FACTORY_V1 as `0x${string}`,
      abi: FX_TICKETS_FACTORY_ABI,
      functionName: "createTicket",
      args: [
        this.manager.address,
        this.params.token,
        FxhashContracts.ETH_TICKET_REDEEMER_V1,
        this.params.gracePeriod,
        baseURI,
        mintInfos,
      ],
      account: this.manager.address,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully minted mint ticket ${this.params.token}`
  }
}
