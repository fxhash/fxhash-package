import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { FX_TICKETS_FACTORY_ABI } from "@/abi/FxTicketFactory"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { MAX_UINT_64 } from "@/utils"

export type TCreateTicketEthV1OperationParams = {
  token: string
  gracePeriod: number
  baseURI: string
  mintInfo: [
    {
      minter: string
      reserveInfo: {
        startTime?: bigint
        endTime?: bigint
        allocation: bigint
      }
      params: string
    }
  ]
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
    this.params.mintInfo.forEach(mintInfo => {
      if (!mintInfo.reserveInfo.startTime) {
        mintInfo.reserveInfo.startTime = BigInt(0)
      }
      if (!mintInfo.reserveInfo.endTime) {
        mintInfo.reserveInfo.endTime = MAX_UINT_64
      }
    })
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_MINT_TICKETS_FACTORY_V1 as `0x${string}`,
      abi: FX_TICKETS_FACTORY_ABI,
      functionName: "createTicket",
      args: [
        this.manager.address,
        this.params.token,
        FxhashContracts.ETH_TICKET_REDEEMER_V1,
        this.params.gracePeriod,
        this.params.baseURI,
        this.params.mintInfo,
      ],
      account: this.manager.address,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully minted mint ticket ${this.params.token}`
  }
}
