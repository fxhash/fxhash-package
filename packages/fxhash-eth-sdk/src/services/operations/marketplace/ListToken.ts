import { EthereumContractOperation } from "../contractOperation"
import {
  ReservoirListingParams,
} from "@/services/reservoir/types"
import {
  listToken,
} from "../Marketplace"
import { RESERVOIR_ORDERBOOK, RESERVOIR_ORDER_KIND } from "@/services/Reservoir"
import { getAddress } from "viem"

export type TListTokenEthV1OperationParams = {
  token: string
  tokenId: string
  price: string
  amount: number
  expiration?: string
}

/**
 * List a token using Reservoir
 */
export class ListTokenEthV1Operation extends EthereumContractOperation<TListTokenEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<string> {
    const hash: string = "TODO"

    // Prepare listing parameters
    const listingParams: ReservoirListingParams = [
      {
        token: `${getAddress(this.params.token)}:${this.params.tokenId}`,
        weiPrice: this.params.price,
        quantity: this.params.amount,
        orderbook: RESERVOIR_ORDERBOOK,
        orderKind: RESERVOIR_ORDER_KIND,
        expirationTime: this.params.expiration
          ? this.params.expiration
          : undefined,
      },
    ]

    // Fetch and override steps

    return await listToken(listingParams, this.manager.walletClient)
  }

  success(): string {
    return `You listed successfully`
  }
}
