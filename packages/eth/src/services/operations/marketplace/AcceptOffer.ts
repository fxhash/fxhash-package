import { EthereumContractOperation } from "../contractOperation.js"
import { ReservoirAcceptOfferParams } from "@/services/reservoir/types.js"
import { acceptOffer } from "../Marketplace.js"
import { TransactionType, TransactionUnknownError } from "@fxhash/shared"
import { extractReservoirError } from "@/utils/index.js"

export type TAcceptOfferEthV1OperationParams = {
  orders: { orderId: string; token: { token: string; tokenId: string } }[]
}

/**
 * Accept a Reservoir offer (normal or collection)
 */
export class AcceptOfferEthV1Operation extends EthereumContractOperation<TAcceptOfferEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType.OFFCHAIN; hash: string }> {
    const args: ReservoirAcceptOfferParams = this.params.orders.map(order => {
      return {
        orderId: order.orderId,
        token: `${order.token.token}:${order.token.tokenId}`,
      }
    })
    try {
      const transactionHash = await acceptOffer(args, this.manager, this.chain)
      return {
        type: TransactionType.OFFCHAIN,
        hash: transactionHash,
      }
    } catch (e) {
      const message = extractReservoirError(e)
      throw new TransactionUnknownError(message)
    }
  }

  success(): string {
    return `You successfully accepted a bid`
  }
}
