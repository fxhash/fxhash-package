import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { TICKET_REDEEMER_ABI } from "@/abi/TicketRedeemer"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

import { config } from "@fxhash/config"

export type TRedeemTicketEthV1OperationParams = {
  ticket: string
  tokenId: number
  params: string
}

/**
 * Redeem an unique iteration of a Mint Ticket to transform it into the actual underlying token
 * @dev contract interface:
 * function redeem(address _ticket, uint256 _tokenId, bytes calldata _fxParams)
 */
export class RedeemTicketEthV1Operation extends EthereumContractOperation<TRedeemTicketEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const args: SimulateAndExecuteContractRequest = {
      address: config.eth.contracts.ticket_redeemer_v1 as `0x${string}`,
      abi: TICKET_REDEEMER_ABI,
      functionName: "redeem",
      args: [this.params.ticket, this.params.tokenId, this.params.params],
      account: this.manager.address,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully redeemed mint ticket ${this.params.ticket} - ${this.params.tokenId}`
  }
}
