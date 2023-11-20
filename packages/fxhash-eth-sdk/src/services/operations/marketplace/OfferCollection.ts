import { EthereumContractOperation } from "../contractOperation"
import { ReservoirPlaceBidParams } from "@/services/reservoir/types"
import { placeBid } from "../Marketplace"

export type TMakeCollectionOfferEthV1OperationParams = {
  token: string
  amount: number
  price: string
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
        weiPrice: this.params.price,
        quantity: this.params.amount,
        orderbook: "reservoir",
        orderKind: "seaport-v1.5",
      },
    ]
    return await placeBid(args, this.manager.walletClient)
  }

  success(): string {
    return `You successfully placed a collection offer`
  }
}
