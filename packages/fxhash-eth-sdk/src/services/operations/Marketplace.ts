import { getClient, Execute, adaptViemWallet } from "@reservoir0x/reservoir-sdk"
import { decodeFunctionData, encodeFunctionData, WalletClient } from "viem"
import {
  ReservoirAcceptOfferParams,
  ReservoirBuyTokenParams,
  ReservoirExecuteBidParams,
  ReservoirExecuteBuyParams,
  ReservoirExecuteListParams,
  ReservoirListingParams,
  ReservoirPlaceBidParams,
} from "@/services/reservoir/types"
import { getBidSteps, getBuySteps, getListingSteps } from "../reservoir/api"
import { FxhashContracts } from "@/contracts/Contracts"
import { RESERVOIR_ABI } from "@/abi/Reservoir"
import { RESERVOIR_SEAPORT_MODULE_ABI } from "@/abi/ReservoirSeaportModule"
import { config } from "@fxhash/config"

export const stepHandler = (steps, path) => {}
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
    console.error(`Action failed with error: ${error}`)
    throw error
  }
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
export function overrideSellStepsParameters(steps: Execute): void {
  steps.steps
    .filter(step => step.id === "order-signature")
    .forEach(step => {
      step.items.forEach(item => {
        //For each order we override the zone and zone hash parameters
        item.data.sign.value.zone = FxhashContracts.ETH_SEAPORT_ZONE
        item.data.post.body.order.data.zone = FxhashContracts.ETH_SEAPORT_ZONE
      })
    })
}

/**
 * Lists a token for sale.
 * @param {ReservoirListingParams} reservoirListings - The listing parameters.
 * @param {WalletClient} walletClient - The wallet client to use.
 * @returns {Promise<boolean>} - True if the listing is successful.
 */ export const listToken = async (
  reservoirListings: ReservoirListingParams,
  walletClient: WalletClient
): Promise<string> => {
  let orderId: string = undefined
  const hashCallBack = (steps, path) => {
    const step = steps.find(step => step.id === "order-signature")
    if (step && step.items.length > 0) {
      if (step.items[0].orderData && step.items[0].status === "complete") {
        orderId = step.items[0].orderData[0].orderId
      }
    }
  }

  // Prepare listing parameters
  const listingParams: ReservoirExecuteListParams = {
    maker: walletClient.account.address,
    source: getClient().source,
    params: reservoirListings,
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
      adaptViemWallet(walletClient),
      hashCallBack,
      fetchedSteps,
      undefined,
      walletClient.chain.id
    )
  )

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
  walletClient: WalletClient
): Promise<string> => {
  // Prepare listing parameters
  const bidStepsParams: ReservoirExecuteBidParams = {
    maker: walletClient.account.address,
    source: getClient().source,
    params: bids,
  }

  // Fetch and override steps
  const fetchedSteps = await getBidSteps(bidStepsParams)
  overrideSellStepsParameters(fetchedSteps)
  let orderId: string = undefined
  const hashCallBack = (steps, path) => {
    const step = steps.find(step => step.id === "order-signature")
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
        baseURL: config.eth.apis.reservoir,
      },
      adaptViemWallet(walletClient),
      hashCallBack,
      fetchedSteps,
      undefined,
      walletClient.chain.id
    )
  )
  return orderId
}

/**
 * Buys a token.
 * @param {ReservoirBuyTokenParams} items - The buy parameters.
 * @param {string[]} feesOnTop - the additional fees to set for the order
 * @param {WalletClient} walletClient - The wallet client to use.
 * @returns {Promise<true | Execute>} - Returns true or the Execute steps if the buying is successful.
 */
export const buyToken = async (
  items: ReservoirBuyTokenParams,
  walletClient: WalletClient
): Promise<string> => {
  // Prepare listing parameters
  const buyStepsParams: ReservoirExecuteBuyParams = {
    items: items,
    source: getClient().source,
    taker: walletClient.account.address,
  }

  let orderId: string = undefined
  const hashCallBack = (steps, path) => {
    const step = steps.find(step => step.id === "sale")
    if (step && step.items.length > 0) {
      if (step.items[0].orderIds && step.items[0].status === "complete") {
        orderId = step.items[0].orderIds[0]
      }
    }
  }
  // Fetch and override steps
  const fetchedSteps = await getBuySteps(buyStepsParams)
  // Execute steps and handle actions
  await handleAction(
    getClient().utils.executeSteps(
      {
        baseURL: config.eth.apis.reservoir,
      },
      adaptViemWallet(walletClient),
      hashCallBack,
      fetchedSteps,
      undefined,
      walletClient.chain.id
    )
  )

  return orderId
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
  walletClient: WalletClient
): Promise<true> => {
  // Prepare buy parameters
  const buyStepsParams: ReservoirExecuteBuyParams = {
    items: items,
    feesOnTop: feesOnTop,
    source: getClient().source,
    taker: walletClient.account.address,
  }

  // Fetch and override steps
  const fetchedSteps = await getBuySteps(buyStepsParams)

  //we store the actual data that will be forwarded to Seaport
  const orderData = fetchedSteps.steps.find(step => step.id === "sale").items[0]
    .data

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
  overridenReservoirSeaportArgs[0].extraData = "0x0001"

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
      adaptViemWallet(walletClient),
      stepHandler,
      fetchedSteps,
      undefined,
      walletClient.chain.id
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
  walletClient: WalletClient
): Promise<string> => {
  let orderId: string = undefined
  const hashCallBack = (steps, path) => {
    const step = steps.find(step => step.id === "sale")
    if (step.items.length > 0) {
      if (step.items[0].orderIds && step.items[0].status === "complete") {
        orderId = step.items[0].orderIds[0]
      }
    }
  }
  const result = await handleAction(
    getClient().actions.acceptOffer({
      items: offers,
      wallet: walletClient,
      onProgress: hashCallBack,
    })
  )
  if (!result) {
    throw new Error("Failed to accept offer")
  }
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
  walletClient: WalletClient
): Promise<string> => {
  const hashCallBack = steps => {
  }
  const result = await handleAction(
    getClient().actions.cancelOrder({
      ids: orders,
      wallet: walletClient,
      onProgress: hashCallBack,
    })
  )

  if (!result) {
    throw new Error("Failed to accept offer")
  }
  return orders[0]
}
