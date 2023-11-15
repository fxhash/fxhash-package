import { adaptViemWallet, getClient } from "@reservoir0x/reservoir-sdk"
import { config } from "@fxhash/config"
import { EthereumContractOperation } from "../contractOperation"
import {
  ReservoirExecuteListParams,
  ReservoirListingParams,
} from "@/services/reservoir/types"
import { getListingSteps } from "@/services/reservoir/api"
import {
  handleAction,
  overrideSellStepsParameters,
  stepHandler,
} from "../Marketplace"

/**
 * Call the Issuer factory to create a new project
 */
export class ListTokenOperation extends EthereumContractOperation<ReservoirListingParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    // Prepare listing parameters
    const listingParams: ReservoirExecuteListParams = {
      maker: this.manager.walletClient.account.address,
      source: getClient().source,
      params: this.params,
    }

    // Fetch and override steps
    const fetchedSteps = await getListingSteps(listingParams)
    overrideSellStepsParameters(fetchedSteps)

    // Execute steps and handle actions
    await handleAction(
      getClient().utils.executeSteps(
        {
          baseURL: config.eth.apis.reservoir,
        },
        adaptViemWallet(this.manager.walletClient),
        stepHandler,
        fetchedSteps,
        undefined,
        this.manager.walletClient.chain.id
      )
    )
    return
  }

  success(): string {
    return `Your project is successfully published`
  }
}
