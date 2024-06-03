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

export type TMakeCollectionOfferEthV1OperationParams = {
  orders: {
    token: string
    amount: number
    pricePerItem: string
    expiration?: string
    orderIdToReplace?: string
  }[]
}

/**
 * Create a collection offer for a token through Reservoir
 */
export class MakeCollectionOfferEthV1Operation extends EthereumContractOperation<TMakeCollectionOfferEthV1OperationParams> {
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
        collection: order.token,
        weiPrice: (
          BigInt(order.pricePerItem) * BigInt(order.amount)
        ).toString(),
        quantity: order.amount,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        automatedRoyalties: false,
        customRoyalties: processOverridenRoyalties(royalties, this.chain),
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
    return `You successfully placed a collection offer`
  }
}
