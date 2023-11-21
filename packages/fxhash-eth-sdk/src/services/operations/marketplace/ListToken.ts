import { EthereumContractOperation } from "../contractOperation"
import { ReservoirListingParams } from "@/services/reservoir/types"
import { RESERVOIR_ORDERBOOK, RESERVOIR_ORDER_KIND } from "@/services/Reservoir"

import { listToken } from "../Marketplace"


export type TListTokenEthV1OperationParams = {
  token: string
  tokenId: string
  price: string
  expiration?: string
}

/**
 * Call the Issuer factory to create a new project
 */
export class ListTokenEthV1Operation extends EthereumContractOperation<TListTokenEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<string> {
    const args: ReservoirListingParams = [
      {
        token: `${this.params.token}:${this.params.tokenId}`,
        weiPrice: this.params.price,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        expirationTime: this.params.expiration
          ? this.params.expiration
          : undefined,
      },
    ]
    return await listToken(args, this.manager.walletClient)
  }

  success(): string {
    return `You listed successfully`
  }
}
