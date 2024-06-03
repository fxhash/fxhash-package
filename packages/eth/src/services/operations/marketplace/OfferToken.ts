import { EthereumContractOperation } from "../contractOperation.js"
import { ReservoirPlaceBidParams } from "@/services/reservoir/types.js"
import { placeBid } from "../Marketplace.js"
import {
  RESERVOIR_ORDERBOOK,
  RESERVOIR_ORDER_KIND,
} from "@/services/Reservoir.js"
import { TransactionType } from "@fxhash/shared"
import {
  getProjectRoyalties,
  processOverridenRoyalties,
} from "@/utils/royalties.js"

export type TMakeOfferEthV1OperationParams = {
  orders: {
    token: string
    tokenId: string
    amount: number
    price: string
    expiration?: string
    orderIdToReplace?: string
  }[]
}

/**
 * Create a tokenId specific offer for a one or several specific tokens through Reservoir
 */
export class MakeOfferEthV1Operation extends EthereumContractOperation<TMakeOfferEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType.OFFCHAIN; hash: string }> {
    const args: ReservoirPlaceBidParams = []
    for (const order of this.params.orders) {
      let options = {}
      if (order.orderIdToReplace) {
        options = {
          "seaport-v1.5": {
            useOffChainCancellation: true,
            replaceOrderId: order.orderIdToReplace,
          },
        }
      } else {
        options = {
          "seaport-v1.5": {
            useOffChainCancellation: true,
          },
        }
      }
      const royalties = await getProjectRoyalties(order.token)
      if (!royalties) throw new Error("Royalties not found")
      args.push({
        token: `${order.token}:${order.tokenId}`,
        weiPrice: order.price,
        quantity: order.amount,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        options: options,
        automatedRoyalties: false,
        customRoyalties: processOverridenRoyalties(royalties, this.chain),
      })
    }

    const transactionHash = await placeBid(args, this.manager, this.chain)
    return {
      type: TransactionType.OFFCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `You successfully placed an offer`
  }
}
