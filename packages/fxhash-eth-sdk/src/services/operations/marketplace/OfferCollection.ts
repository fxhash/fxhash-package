import { EthereumContractOperation } from "../contractOperation"
import { ReservoirPlaceBidParams } from "@/services/reservoir/types"
import { placeBid } from "../Marketplace"
import { RESERVOIR_ORDERBOOK, RESERVOIR_ORDER_KIND } from "@/services/Reservoir"
import { TransactionType } from "@fxhash/contracts-shared"

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
  async call(): Promise<{ type: TransactionType.OFFCHAIN; hash: string }> {
    const args: ReservoirPlaceBidParams = [
      {
        collection: this.params.token,
        weiPrice: (
          BigInt(this.params.pricePerItem) * BigInt(this.params.amount)
        ).toString(),
        quantity: this.params.amount,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        automatedRoyalties: true,
        options: {
          "seaport-v1.5": {
            useOffChainCancellation: true,
          },
        },
      },
    ]
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
