import { TransactionType } from "@fxhash/shared"
import { EthereumContractOperation } from "../contractOperation"
import { cancelOrder } from "../Marketplace"

export type TCancelOrderEthV1OperationParams = {
  orderIds: string[]
}

/**
 * Cancel a Reservoir listing
 */
export class CancelOrderEthV1Operation extends EthereumContractOperation<TCancelOrderEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType.OFFCHAIN; hash: string }> {
    const transactionHash = await cancelOrder(
      this.params.orderIds,
      this.manager,
      this.chain
    )
    return {
      type: TransactionType.OFFCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `You successfully canceled your order`
  }
}
