import { Execute } from "@reservoir0x/reservoir-sdk"
import { API_METHODS, fetchReservoir } from "@/services/Reservoir"
import {
  ReservoirExecuteBidParams,
  ReservoirExecuteBuyParams,
  ReservoirExecuteListParams,
  ReservoirGetCollectionResponse,
  ReservoirGetOfferResponse,
  ReservoirGetTokenResponse,
} from "./types"

/**
 * Fetches the listing steps.
 * @param {ReservoirExecuteListParams} params - The parameters for the API call.
 * @returns {Promise<Execute>} - The Execute object containing steps.
 * @dev this is only intended for internal use, it is not needed suitable for the integration
 */
export const getListingSteps = async (
  params: ReservoirExecuteListParams
): Promise<Execute> => {
  return await fetchReservoir<Execute>(
    API_METHODS.POST,
    "/execute/list/v5",
    JSON.stringify(params)
  )
}

/**
 * Fetches the bid steps.
 * @param {ReservoirExecuteBidParams} params - The parameters for the API call.
 * @returns {Promise<Execute>} - The Execute object containing steps.
 * @dev this is only intended for internal use, it is not needed suitable for the integration
 */
export const getBidSteps = async (
  params: ReservoirExecuteBidParams
): Promise<Execute> => {
  return await fetchReservoir<Execute>(
    API_METHODS.POST,
    "/execute/bid/v5",
    JSON.stringify(params)
  )
}

export const getBuySteps = async (
  params: ReservoirExecuteBuyParams
): Promise<Execute> => {
  return await fetchReservoir<Execute>(
    API_METHODS.POST,
    "/execute/buy/v7",
    JSON.stringify(params)
  )
}

/**
 * Fetches collection data from reservoir API.
 * @param {string} collection - The `collection` parameter is a string that represents the token contract.
 * @returns Return a `ReservoirGetCollectionResponse` object containing the collection data.
 */
export async function getCollection(
  collection: string
): Promise<ReservoirGetCollectionResponse> {
  return await fetchReservoir<ReservoirGetCollectionResponse>(
    API_METHODS.GET,
    `/collections/v7?id=${collection}`,
    undefined
  )
}

/**
 * Fetches token data from reservoir API.
 * @param {string} token - The `token` parameter is a string that represents the token id.
 * it must be in the form `contractAddress:tokenId`
 * @returns Return a `ReservoirGetTokenResponse` object containing the token data.
 */
export async function getToken(
  token: string
): Promise<ReservoirGetTokenResponse> {
  return await fetchReservoir<ReservoirGetTokenResponse>(
    API_METHODS.GET,
    `/tokens/v6?tokens=${token}`,
    undefined
  )
}

/**
 * Fetches offer data from reservoir API.
 * @param {string} offerId - the id of the offer.
 * @returns the bid data.
 */
export async function getOffer(
  offerId: string
): Promise<ReservoirGetOfferResponse> {
  return await fetchReservoir<ReservoirGetOfferResponse>(
    API_METHODS.GET,
    `/orders/bids/v6?id=${offerId}`,
    undefined
  )
}
