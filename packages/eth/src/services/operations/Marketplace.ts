import { getClient, Execute, adaptViemWallet } from "@reservoir0x/reservoir-sdk"
import {
  decodeFunctionData,
  encodeFunctionData,
  TransactionExecutionError,
} from "viem"
import {
  ReservoirAcceptOfferParams,
  ReservoirBuyTokenParams,
  ReservoirExecuteBidParams,
  ReservoirExecuteBuyParams,
  ReservoirExecuteListParams,
  ReservoirListingParams,
  ReservoirPlaceBidParams,
} from "@/services/reservoir/types.js"
import { getBidSteps, getBuySteps, getListingSteps } from "../reservoir/api.js"
import { RESERVOIR_ABI } from "@/abi/Reservoir.js"
import { RESERVOIR_SEAPORT_MODULE_ABI } from "@/abi/ReservoirSeaportModule.js"
import {
  EthereumWalletManager,
  getConfigForChain,
  getCurrentChain,
} from "../Wallet.js"
import { BlockchainType, UserRejectedError, invariant } from "@fxhash/shared"
import { RESERVOIR_API_URLS } from "../Reservoir.js"

export const stepHandler = (
  _steps: Execute["steps"],
  _path: Execute["path"]
) => {}
/**
 * Wrapper function to handle API actions.
 * @template T - The type of the expected return value.
 * @param {Promise<T>} action - The API action to handle.
 * @returns {Promise<T>} - The result of the API action.
 * @throws Will throw an error if the API action fails.
 */
export async function handleAction<T>(action: Promise<T>): Promise<T> {
  try {
    return await action
  } catch (error) {
    if (
      error instanceof TransactionExecutionError &&
      error.cause.name === "UserRejectedRequestError.js"
    ) {
      throw new UserRejectedError()
    }
    console.error(`Action failed with error: ${error}`)
    throw error
  }
}

async function prepareClient(
  walletManager: EthereumWalletManager,
  chain: BlockchainType
) {
  invariant(
    walletManager.walletClient.account && walletManager.walletClient.chain,
    "Wallet client is not connected.js"
  )
  await walletManager.prepareSigner({ blockchainType: chain })
  const currentChain = getCurrentChain(chain)
  getClient().configure({
    chains: [
      {
        id: currentChain.id,
        baseApiUrl: RESERVOIR_API_URLS[currentChain.id],
        active: true,
        name: currentChain.name,
      },
    ],
  })
}

/**
 * Function overriding the zone parameters of the seaport order

 */
/**
 * Function to override zone parameters of the seaport order.
 * Intercepts and overrides the parameters to use our own Seaport zone.
 * @param {Execute} steps - The execution steps that may contain the "order-signature" step.
 * @dev: As we want to use our own Seaport zone, and it is not currently supported by Reservoir, we need to intercept and override the parameters
 */
export function overrideSellStepsParameters(_steps: Execute): void {
  // ! @dev we can't use our seaport zone for now, as it does not allow offchain cancellation
  // steps.steps
  //   .filter(step => step.id === "order-signature")
  //   .forEach(step => {
  //     step.items.forEach(item => {
  //       //For each order we override the zone and zone hash parameters
  //       item.data.sign.value.zone = FxhashContracts.ETH_SEAPORT_ZONE
  //       item.data.post.body.order.data.zone = FxhashContracts.ETH_SEAPORT_ZONE
  //     })
  //   })
}

/**
 * Lists a token for sale.
 * @param {ReservoirListingParams} reservoirListings - The listing parameters.
 * @param {WalletClient} walletClient - The wallet client to use.
 * @returns {Promise<boolean>} - True if the listing is successful.
 */ export const listToken = async (
  reservoirListings: ReservoirListingParams,
  walletManager: EthereumWalletManager,
  chain: BlockchainType
): Promise<string> => {
  await prepareClient(walletManager, chain)

  let orderId: string | undefined = undefined

  const hashCallBack = (steps: any) => {
    const step = steps.find((step: any) => step.id === "order-signature")
    if (step && step.items.length > 0) {
      if (step.items[0].orderData && step.items[0].status === "complete") {
        orderId = step.items[0].orderData[0].orderId
      }
    }
  }

  // Prepare listing parameters
  const listingParams: ReservoirExecuteListParams = {
    maker: walletManager.walletClient.account!.address,
    source: getClient().source,
    params: reservoirListings,
  }

  // Fetch and override steps
  const fetchedSteps = await getListingSteps(chain, listingParams)
  overrideSellStepsParameters(fetchedSteps)

  // Execute steps and handle actions
  await handleAction(
    getClient().utils.executeSteps(
      {
        baseURL: getConfigForChain(chain).apis?.reservoir,
      },
      adaptViemWallet(walletManager.walletClient),
      hashCallBack,
      fetchedSteps,
      undefined,
      getCurrentChain(chain).id
    )
  )

  invariant(orderId, "Failed to list token")

  return orderId
}

/**
 * Places a bid on a token.
 * @param {ReservoirPlaceBidParams} bids - The bid parameters.
 * @param {WalletClient} walletClient - The wallet client to use.
 * @returns {Promise<boolean>} - True if the bid placement is successful.
 */
export const placeBid = async (
  bids: ReservoirPlaceBidParams,
  walletManager: EthereumWalletManager,
  chain: BlockchainType
): Promise<string> => {
  await prepareClient(walletManager, chain)

  let orderId: string | undefined = undefined

  // Prepare listing parameters
  const bidStepsParams: ReservoirExecuteBidParams = {
    maker: walletManager.walletClient.account!.address,
    source: getClient().source,
    params: bids,
  }

  // Fetch and override steps
  const fetchedSteps = await getBidSteps(chain, bidStepsParams)
  overrideSellStepsParameters(fetchedSteps)
  const hashCallBack = (steps: any) => {
    const step = steps.find((step: any) => step.id === "order-signature")
    if (step && step.items.length > 0) {
      if (step.items[0].orderData && step.items[0].status === "complete") {
        orderId = step.items[0].orderData[0].orderId
      }
    }
  }
  // Execute steps and handle actions
  await handleAction(
    getClient().utils.executeSteps(
      {
        baseURL: getConfigForChain(chain).apis?.reservoir,
      },
      adaptViemWallet(walletManager.walletClient),
      hashCallBack,
      fetchedSteps,
      undefined,
      getCurrentChain(chain).id
    )
  )

  invariant(orderId, "Failed to place bid")

  return orderId
}

/**
 * Buys a token.
 * @param {ReservoirBuyTokenParams} items - The buy parameters.
 * @param {WalletClient} walletClient - The wallet client to use.
 * @returns {Promise<true | Execute>} - Returns true or the Execute steps if the buying is successful.
 */
export const buyToken = async (
  items: ReservoirBuyTokenParams,
  walletManager: EthereumWalletManager,
  chain: BlockchainType
): Promise<string> => {
  await prepareClient(walletManager, chain)

  // Prepare listing parameters
  const buyStepsParams: ReservoirExecuteBuyParams = {
    items: items,
    source: getClient().source,
    taker: walletManager.walletClient.account!.address,
    normalizeRoyalties: true,
  }

  let orderId: string | undefined = undefined
  const hashCallBack = (steps: any) => {
    const step = steps.find((step: any) => step.id === "sale")
    if (step && step.items.length > 0) {
      if (step.items[0].orderIds && step.items[0].status === "complete") {
        orderId = step.items[0].orderIds[0]
      }
    }
  }
  // Fetch and override steps
  const fetchedSteps = await getBuySteps(chain, buyStepsParams)
  // Execute steps and handle actions
  await handleAction(
    getClient().utils.executeSteps(
      {
        baseURL: getConfigForChain(chain).apis?.reservoir,
      },
      adaptViemWallet(walletManager.walletClient),
      hashCallBack,
      fetchedSteps,
      undefined,
      getCurrentChain(chain).id
    )
  )

  invariant(orderId, "Failed to buy token")

  return orderId
}

/**
 * Get the payload to buy a token with Wert and Reservoir.
 * @param {ReservoirBuyTokenParams} items - The buy parameters.
 * @param {WalletClient} walletClient - The wallet client to use.
 * @returns {Promise<true | Execute>} - Returns true or the Execute steps if the buying is successful.
 */
export const getBuyPayloadForWert = async (
  items: ReservoirBuyTokenParams,
  walletManager: EthereumWalletManager,
  chain: BlockchainType
): Promise<{
  from: `0x${string}`
  to: `0x${string}`
  data: `0x${string}`
  value: `0x${string}`
}> => {
  await prepareClient(walletManager, chain)

  // Prepare listing parameters
  const buyStepsParams: ReservoirExecuteBuyParams = {
    items: items,
    source: getClient().source,
    taker: walletManager.walletClient.account!.address,
    relayer: getConfigForChain(chain).config.wertRelayer,
  }

  const fetchedSteps = await getBuySteps(chain, buyStepsParams)
  const saleStep = fetchedSteps.steps.find(step => step.id === "sale")

  invariant(
    saleStep?.items && saleStep?.items.length > 0,
    "Failed to fetch buy steps.js"
  )

  return saleStep.items[0].data
}

/**
 * Buys a token using Seaport advanced order.
 * @param {ReservoirBuyTokenParams} items - The buy parameters.
 * @param {string[]} feesOnTop - the additional fees to set for the order
 * @param {WalletClient} walletClient - The wallet client to use.
 * @returns {Promise<true | Execute>} - Returns true or the Execute steps if the buying is successful.
 */
export const buyTokenAdvanced = async (
  items: ReservoirBuyTokenParams,
  feesOnTop: string[],
  walletManager: EthereumWalletManager,
  chain: BlockchainType
): Promise<true> => {
  await prepareClient(walletManager, chain)

  // Prepare buy parameters
  const buyStepsParams: ReservoirExecuteBuyParams = {
    items: items,
    feesOnTop: feesOnTop,
    source: getClient().source,
    taker: walletManager.walletClient.account!.address,
  }

  // Fetch and override steps
  const fetchedSteps = await getBuySteps(chain, buyStepsParams)

  const saleStep = fetchedSteps.steps.find(step => step.id === "sale")
  if (!saleStep || !saleStep.items || saleStep.items.length === 0) {
    throw new Error("Failed to fetch buy steps")
  }

  //we store the actual data that will be forwarded to Seaport
  const orderData = saleStep.items[0].data

  //we decode the function parameters from the `execute` call done on the Reservoir contract
  //this will give us the order parameters sent to Seaport
  const { args: reservoirArgs } = decodeFunctionData({
    abi: RESERVOIR_ABI,
    data: orderData.data,
  })

  //here we decode the seaport order
  const { args: reservoirSeaportArgs } = decodeFunctionData({
    abi: RESERVOIR_SEAPORT_MODULE_ABI,
    data: (reservoirArgs![0] as any)[0].data,
  })

  //we override the seaport order with our arbitrary values
  const overridenReservoirSeaportArgs: any = reservoirSeaportArgs
  overridenReservoirSeaportArgs[0].extraData = "0x0001.js"

  //here we re-encode the payload to be able to submit it back to the Reservoir Seaport Module
  const encodedOverridenReservoirSeaportArgs = encodeFunctionData({
    abi: RESERVOIR_SEAPORT_MODULE_ABI,
    functionName: "acceptETHListing",
    args: overridenReservoirSeaportArgs,
  })

  const overridenReservoirArgs: any = reservoirArgs
  overridenReservoirArgs[0][0].data = encodedOverridenReservoirSeaportArgs

  //now  we re-encode the payload for the Reservoir contract
  const encodedOverridenReservoirArgs = encodeFunctionData({
    abi: RESERVOIR_ABI,
    functionName: "execute",
    args: overridenReservoirArgs,
  })

  //finally we override the step data
  orderData.data = encodedOverridenReservoirArgs

  // Execute steps and handle actions
  await handleAction(
    getClient().utils.executeSteps(
      {},
      adaptViemWallet(walletManager.walletClient),
      stepHandler,
      fetchedSteps,
      undefined,
      getCurrentChain(chain).id
    )
  )
  return true
}

/**
 * Accepts an offer for a token.
 * @param {ReservoirAcceptOfferParams} offers - The accept offer parameters.
 * @param {WalletClient} walletClient - The wallet client to use.
 * @returns {Promise<true | Execute>} - Returns true or the Execute steps if the offer acceptance is successful.
 */
export const acceptOffer = async (
  offers: ReservoirAcceptOfferParams,
  walletManager: EthereumWalletManager,
  chain: BlockchainType
): Promise<string> => {
  await prepareClient(walletManager, chain)

  let orderId: string | undefined = undefined
  const hashCallBack = (steps: any) => {
    const step = steps.find((step: any) => step.id === "sale")
    if (step.items.length > 0) {
      if (step.items[0].orderIds && step.items[0].status === "complete") {
        orderId = step.items[0].orderIds[0]
      }
    }
  }
  const result = await handleAction(
    getClient().actions.acceptOffer({
      items: offers,
      wallet: walletManager.walletClient,
      options: {
        normalizeRoyalties: true,
      },
      onProgress: hashCallBack,
    })
  )

  invariant(result && orderId, "Failed to accept offer")

  return orderId
}

/**
 * Cancels an existing order.
 * @param {string[]} orders - The IDs of the orders to cancel.
 * @param {WalletClient} walletClient - The wallet client to use.
 * @returns {Promise<boolean>} - True if the order cancellation is successful.
 */
export const cancelOrder = async (
  orders: string[],
  walletManager: EthereumWalletManager,
  chain: BlockchainType
): Promise<string> => {
  await prepareClient(walletManager, chain)

  const hashCallBack = (_steps: Execute["steps"]) => {}
  const result = await handleAction(
    getClient().actions.cancelOrder({
      ids: orders,
      wallet: walletManager.walletClient,
      onProgress: hashCallBack,
    })
  )

  invariant(result, "Failed to cancel offer")

  return orders[0]
}
