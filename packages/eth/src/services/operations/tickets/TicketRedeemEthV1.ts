import { getCurrentChain } from "@/services/Wallet.js"
import { EthereumContractOperation } from "../contractOperation.js"
import { TICKET_REDEEMER_ABI } from "@/abi/TicketRedeemer.js"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { config } from "@fxhash/config"
import { TransactionType } from "@fxhash/shared"

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
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest = {
      address: config.eth.contracts.ticket_redeemer_v1 as `0x${string}`,
      abi: TICKET_REDEEMER_ABI,
      functionName: "redeem",
      args: [this.params.ticket, this.params.tokenId, this.params.params],
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
    return `Successfully redeemed mint ticket ${this.params.ticket} - ${this.params.tokenId}`
  }
}
