import { EthereumContractOperation } from "../contractOperation"
import { ReservoirAcceptOfferParams } from "@/services/reservoir/types"
import { acceptOffer } from "../Marketplace"
import { TransactionType } from "@fxhash/contracts-shared"

export type TAcceptOfferEthV1OperationParams = {
  orderId: string
  tokens: { token: string; tokenId: string }[]
}

/**
 * Accept a Reservoir offer (normal or collection)
 */
export class AcceptOfferEthV1Operation extends EthereumContractOperation<TAcceptOfferEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType.OFFCHAIN; hash: string }> {
    const args: ReservoirAcceptOfferParams = this.params.tokens.map(token => {
      return {
        orderId: this.params.orderId,
        token: `${token.token}:${token.tokenId}`,
      }
    })
    const transactionHash = await acceptOffer(args, this.manager.walletClient)
    return {
      type: TransactionType.OFFCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `You successfully accepted a bid`
  }
}
