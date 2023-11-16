import { adaptViemWallet, getClient } from "@reservoir0x/reservoir-sdk"
import { config } from "@fxhash/config"
import { EthereumContractOperation } from "../contractOperation"
import {
  ReservoirExecuteBidParams,
  ReservoirExecuteListParams,
  ReservoirPlaceBidParams,
} from "@/services/reservoir/types"
import { getListingSteps } from "@/services/reservoir/api"
import {
  handleAction,
  overrideSellStepsParameters,
  placeBid,
} from "../Marketplace"

export type TMakeOfferEthV1OperationParams = {
  contract: string
  tokenId: string
  amount: number
  price: string
  expiration?: string
}

/**
 * Call the Issuer factory to create a new project
 */
export class MakeOfferEthV1Operation extends EthereumContractOperation<TMakeOfferEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<string> {
    const args: ReservoirPlaceBidParams = [
      {
        token: `${this.params.contract}:${this.params.tokenId}`,
        weiPrice: this.params.price,
        quantity: this.params.amount,
        orderbook: "reservoir",
        orderKind: "seaport-v1.5",
      },
    ]
    return await placeBid(args, this.manager.walletClient)
  }

  success(): string {
    return `You successfully placed a bid`
  }
}
