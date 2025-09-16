import { EthereumContractOperation } from "../contractOperation.js"
import type { ReservoirListingParams } from "@/services/reservoir/types.js"
import {
  RESERVOIR_ORDERBOOK,
  RESERVOIR_ORDER_KIND,
} from "@/services/Reservoir.js"
import { listToken } from "../Marketplace.js"
import { TransactionType } from "@fxhash/shared"

export type TListTokenEthV1OperationParams = {
  orders: {
    token: string
    tokenId: string
    price: bigint
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
    const args: ReservoirListingParams = []
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
      args.push({
        token: `${order.token}:${order.tokenId}`,
        weiPrice: order.price.toString(),
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        options: options,
        automatedRoyalties: true,
        expirationTime: order.expiration ? order.expiration : undefined,
      })
    }
    const transactionHash = await listToken(args, this.manager, this.chain)
    return {
      type: TransactionType.OFFCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return "your listing has been created!"
  }
}
