import { EthereumContractOperation } from "../contractOperation.js"
import type { ReservoirPlaceBidParams } from "@/services/reservoir/types.js"
import { placeBid } from "../Marketplace.js"
import {
  RESERVOIR_ORDERBOOK,
  RESERVOIR_ORDER_KIND,
} from "@/services/Reservoir.js"
import { TransactionType } from "@fxhash/shared"

type CollectionOffer = {
  token: string
  amount: number
  price: bigint
  expiration?: string
  orderIdToReplace?: string
}

export type TMakeCollectionOfferEthV1OperationParams =
  | CollectionOffer
  | CollectionOffer[]

/**
 * Create a collection offer for a token through Reservoir
 */
export class MakeCollectionOfferEthV1Operation extends EthereumContractOperation<TMakeCollectionOfferEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType.OFFCHAIN; hash: string }> {
    const args: ReservoirPlaceBidParams = []
    const orders: CollectionOffer[] =
      typeof this.params === "object"
        ? [this.params as CollectionOffer]
        : this.params
    for (const order of orders) {
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
      args.push({
        collection: order.token,
        weiPrice: (order.price * BigInt(order.amount)).toString(),
        quantity: order.amount,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        automatedRoyalties: true,
        options: options,
      })
    }

    const transactionHash = await placeBid(args, this.manager, this.chain)
    return {
      type: TransactionType.OFFCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return "You successfully placed a collection offer"
  }
}
