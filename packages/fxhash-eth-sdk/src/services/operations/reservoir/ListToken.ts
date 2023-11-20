import { EthereumContractOperation } from "../contractOperation"
import { ReservoirListingParams } from "@/services/reservoir/types"
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
export class ListTokenEthOperation extends EthereumContractOperation<TListTokenEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<string> {
    const args: ReservoirListingParams = [
      {
        token: `${this.params.token}:${this.params.tokenId}`,
        weiPrice: this.params.price,
        orderbook: "reservoir",
        orderKind: "seaport-v1.5",
      },
    ]
    return await listToken(args, this.manager.walletClient)
  }

  success(): string {
    return `You listed successfully`
  }
}
