import { EthereumContractOperation } from "../contractOperation"
import { ReservoirAcceptOfferParams } from "@/services/reservoir/types"
import { acceptOffer } from "../Marketplace"

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
  async call(): Promise<string> {
    const args: ReservoirAcceptOfferParams = this.params.tokens.map(token => {
      return {
        orderId: this.params.orderId,
        token: `${token.token}:${token.tokenId}`,
      }
    })
    return await acceptOffer(args, this.manager.walletClient)
  }

  success(): string {
    return `You successfully accepted a bid`
  }
}
