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
  async call(): Promise<string> {
    return await cancelOrder(this.params.orderIds, this.manager.walletClient)
  }

  success(): string {
    return `You successfully canceled your order`
  }
}
