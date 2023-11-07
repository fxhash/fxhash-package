import { Execute } from "@reservoir0x/reservoir-sdk"
import { API_METHODS, fetchReservoir } from "@/services/Reservoir"
import {
  ReservoirExecuteBidParams,
  ReservoirExecuteBuyParams,
  ReservoirExecuteListParams,
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
