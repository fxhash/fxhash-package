import { EthereumContractOperation } from "../contractOperation.js"
import { ReservoirBuyTokenParams } from "@/services/reservoir/types.js"
import { buyToken } from "../Marketplace.js"
import { TransactionType, TransactionUnknownError } from "@fxhash/shared"
import { extractReservoirError } from "@/utils/index.js"

export type TBuyTokenEthV1OperationParams = {
  orderIds: string[]
}

/**
 * Buy a Reservoir listing
 */
export class BuyTokenEthV1Operation extends EthereumContractOperation<TBuyTokenEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType.OFFCHAIN; hash: string }> {
    const args: ReservoirBuyTokenParams = this.params.orderIds.map(orderId => {
      return {
        orderId: orderId,
      }
    })
    try {
      const transactionHash = await buyToken(args, this.manager, this.chain)
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
    return `You successfully bought the token`
  }
}
