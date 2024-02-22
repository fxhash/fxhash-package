import { EthereumContractOperation } from "../contractOperation"
import { ReservoirListingParams } from "@/services/reservoir/types"
import { RESERVOIR_ORDERBOOK, RESERVOIR_ORDER_KIND } from "@/services/Reservoir"
import { listToken } from "../Marketplace"
import { TransactionType } from "@fxhash/shared"

export type TListTokenEthV1OperationParams = {
  orders: {
    token: string
    tokenId: string
    price: string
    expiration?: string
    orderIdToReplace?: string
  }[]
}

/**
 * Call the Issuer factory to create a new project
 */
export class ListTokenEthV1Operation extends EthereumContractOperation<TListTokenEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType.OFFCHAIN; hash: string }> {
    const args: ReservoirListingParams = this.params.orders.map(order => {
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
        token: `${order.token}:${order.tokenId}`,
        weiPrice: order.price,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        options: options,
        automatedRoyalties: true,
        expirationTime: order.expiration ? order.expiration : undefined,
      }
    })
    const transactionHash = await listToken(args, this.manager, this.chain)
    return {
      type: TransactionType.OFFCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `You listed successfully`
  }
}
