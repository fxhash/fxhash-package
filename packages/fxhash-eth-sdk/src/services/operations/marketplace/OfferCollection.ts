import { EthereumContractOperation } from "../contractOperation"
import { ReservoirPlaceBidParams } from "@/services/reservoir/types"
import { placeBid } from "../Marketplace"
import { RESERVOIR_ORDERBOOK, RESERVOIR_ORDER_KIND } from "@/services/Reservoir"

export type TMakeCollectionOfferEthV1OperationParams = {
  token: string
  amount: number
  pricePerItem: string
  expiration?: string
}

/**
 * Create a collection offer for a token through Reservoir
 */
export class MakeCollectionOfferEthV1Operation extends EthereumContractOperation<TMakeCollectionOfferEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<string> {
    const args: ReservoirPlaceBidParams = [
      {
        collection: this.params.token,
        weiPrice: (
          Number(this.params.pricePerItem) * Number(this.params.amount)
        ).toString(),
        quantity: this.params.amount,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
      },
    ]
    return await placeBid(args, this.manager.walletClient)
  }

  success(): string {
    return `You successfully placed a collection offer`
  }
}
