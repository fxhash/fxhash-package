import { EthereumContractOperation } from "../contractOperation"
import { ReservoirBuyTokenParams } from "@/services/reservoir/types"
import { buyToken } from "../Marketplace"
import { TransactionType } from "@fxhash/contracts-shared"

export type TBuyTokenEthV1OperationParams = {
  orderId: string
}

/**
 * Buy a Reservoir listing
 */
export class BuyTokenEthV1Operation extends EthereumContractOperation<TBuyTokenEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType.OFFCHAIN; hash: string }> {
    const args: ReservoirBuyTokenParams = [
      {
        orderId: this.params.orderId,
      },
    ]
    const transactionHash = await buyToken(args, this.manager.walletClient)
    return {
      type: TransactionType.OFFCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `You successfully bought the token`
  }
}
