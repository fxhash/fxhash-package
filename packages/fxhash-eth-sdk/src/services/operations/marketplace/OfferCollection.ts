import { EthereumContractOperation } from "../contractOperation"
import { ReservoirPlaceBidParams } from "@/services/reservoir/types"
import { placeBid } from "../Marketplace"
import { RESERVOIR_ORDERBOOK, RESERVOIR_ORDER_KIND } from "@/services/Reservoir"
import { TransactionType } from "@fxhash/contracts-shared"

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
    const args: ReservoirPlaceBidParams = this.params.orders.map(order => {
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
      return {
        collection: order.token,
        weiPrice: (
          BigInt(order.pricePerItem) * BigInt(order.amount)
        ).toString(),
        quantity: order.amount,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        automatedRoyalties: true,
        options: options,
      }
    })
    const transactionHash = await placeBid(args, this.manager.walletClient)
    return {
      type: TransactionType.OFFCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `You successfully placed a collection offer`
  }
}
