import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"
import { EthereumContractOperation } from "../contractOperation.js"
import { FX_TICKETS_FACTORY_ABI } from "@/abi/FxTicketFactory.js"
import {
  DutchAuctionMintInfoArgs,
  FixedPriceMintInfoArgs,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
  TicketMintInfoArgs,
} from "@/services/operations/EthCommon.js"
import { processAndFormatMintInfos } from "@/utils/minters.js"
import { GenerativeTokenVersion, TransactionType } from "@fxhash/shared"

export type TCreateTicketEthV1OperationParams = {
  token: string
  gracePeriod: number
  baseURI: string
  mintInfo: (
    | FixedPriceMintInfoArgs
    | DutchAuctionMintInfoArgs
    | TicketMintInfoArgs
  )[]
  version: GenerativeTokenVersion
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
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const args: SimulateAndExecuteContractRequest = {
      address: currentConfig.contracts.mint_ticket_factory_v1,
      abi: FX_TICKETS_FACTORY_ABI,
      functionName: "createTicket",
      args: [
        this.manager.address,
        this.params.token,
        currentConfig.contracts.ticket_redeemer_v1,
        currentConfig.contracts.ipfs_renderer_v1,
        this.params.gracePeriod,
        await processAndFormatMintInfos(
          this.params.mintInfo,
          this.manager,
          this.chain,
          this.params.version
        ),
      ],
      chain: getCurrentChain(this.chain),
      account: this.manager.address as `0x${string}`,
    }
    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `Successfully minted mint ticket ${this.params.token}`
  }
}
