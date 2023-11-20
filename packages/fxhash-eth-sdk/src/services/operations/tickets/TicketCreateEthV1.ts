import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { FX_TICKETS_FACTORY_ABI } from "@/abi/FxTicketFactory"
import {
  DutchAuctionMintInfoArgs,
  FixedPriceMintInfoArgs,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
  TicketMintInfoArgs,
} from "@/services/operations/EthCommon"
import { processAndFormatMintInfos } from "@/utils/minters"
import { getHashFromIPFSCID } from "@/utils"

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
        FxhashContracts.ETH_IPFS_RENDERER_V1,
        this.params.gracePeriod,
        baseURI,
        await processAndFormatMintInfos(this.params.mintInfo, this.manager),
      ],
      account: this.manager.address,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully minted mint ticket ${this.params.token}`
  }
}
