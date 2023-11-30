import { EthereumContractOperation } from "../contractOperation"
import { ReservoirBuyTokenParams } from "@/services/reservoir/types"
import { buyToken } from "../Marketplace"

export type TBuyTokenEthV1OperationParams = {
  orderId: string
}

/**
 * Buy a Reservoir listing
 */
export class BuyTokenEthV1Operation extends EthereumContractOperation<TBuyTokenEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<string> {
    const args: ReservoirBuyTokenParams = [
      {
        orderId: this.params.orderId,
      },
    ]
    return await buyToken(args, this.manager.walletClient)
  }

  success(): string {
    return `You successfully bought the token`
  }
}
