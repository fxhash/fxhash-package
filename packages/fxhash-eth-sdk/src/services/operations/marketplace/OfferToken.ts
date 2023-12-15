import { EthereumContractOperation } from "../contractOperation"
import { ReservoirPlaceBidParams } from "@/services/reservoir/types"
import { placeBid } from "../Marketplace"
import { RESERVOIR_ORDERBOOK, RESERVOIR_ORDER_KIND } from "@/services/Reservoir"

export type TMakeOfferEthV1OperationParams = {
  token: string
  tokenId: string
  amount: number
  price: string
  expiration?: string
}

/**
 * Create a tokenId specific offer for a one or several specific tokens through Reservoir
 */
export class MakeOfferEthV1Operation extends EthereumContractOperation<TMakeOfferEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<string> {
    const args: ReservoirPlaceBidParams = [
      {
        token: `${this.params.token}:${this.params.tokenId}`,
        weiPrice: this.params.price,
        quantity: this.params.amount,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        options: {
          "seaport-v1.5": {
            useOffChainCancellation: true,
          },
        },
        automatedRoyalties: true,
      },
    ]
    return await placeBid(args, this.manager.walletClient)
  }

  success(): string {
    return `You successfully placed an offer`
  }
}
