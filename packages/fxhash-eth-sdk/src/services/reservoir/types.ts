import { paths } from "@reservoir0x/reservoir-sdk"

/**
 * The types defined in this file are used as placeholders
 * to improve readability and maintainability
 * They represent Reservoir's API model
 */

/**
 * @typedef {Object} ReservoirExecuteListParams
 * Represents the body parameters for executing a list operation.
 */
export type ReservoirExecuteListParams =
  paths["/execute/list/v5"]["post"]["parameters"]["body"]["body"]

/**
 * @typedef {Object} ReservoirExecuteBidParams
 * Represents the body parameters for executing a bid operation.
 */
export type ReservoirExecuteBidParams =
  paths["/execute/bid/v5"]["post"]["parameters"]["body"]["body"]

/**
 * @typedef {Object} ReservoirExecuteBuyParams
 * Represents the body parameters for executing a buy operation.
 */
export type ReservoirExecuteBuyParams =
  paths["/execute/buy/v7"]["post"]["parameters"]["body"]["body"]

/**
 * @typedef {Object} ReservoirListingParams
 * Represents the specific 'params' section within the body for a listing operation.
 */
export type ReservoirListingParams =
  paths["/execute/list/v5"]["post"]["parameters"]["body"]["body"]["params"]

/**
 * @typedef {Object} ReservoirBuyTokenParams
 * Represents the 'items' section within the body parameters for a buy operation.
 */
export type ReservoirBuyTokenParams =
  paths["/execute/buy/v7"]["post"]["parameters"]["body"]["body"]["items"]

/**
 * @typedef {Object} ReservoirPlaceBidParams
 * Represents the 'params' section within the body parameters for a bid operation.
 */
export type ReservoirPlaceBidParams =
  paths["/execute/bid/v5"]["post"]["parameters"]["body"]["body"]["params"]

/**
 * @typedef {Object} ReservoirAcceptOfferParams
 * Represents the 'items' section within the body parameters for accepting an offer.
 */
export type ReservoirAcceptOfferParams =
  paths["/execute/sell/v7"]["post"]["parameters"]["body"]["body"]["items"]

/**
 * @typedef {Object} ReservoirGetCollectionParams
 * Represents the 'query' section within the body parameters for getting
 * collection information from Reservoir
 */
export type ReservoirGetCollectionParams =
  paths["/collections/v7"]["get"]["parameters"]["query"]

/**
 * @typedef {Object} ReservoirGetCollectionResponse
 * Represents the model returned by the following endpoint:
 * `https://docs.reservoir.tools/reference/getcollections/v7`
 */
export type ReservoirGetCollectionResponse =
  paths["/collections/v7"]["get"]["responses"]["200"]["schema"]

/**
 * @typedef {Object} ReservoirGetTokenParams
 * Represents the 'query' section within the body parameters for getting
 * token information from Reservoir
 */
export type ReservoirGetTokenParams =
  paths["/tokens/v7"]["get"]["parameters"]["query"]

/**
 * @typedef {Object} ReservoirGetTokenResponse
 * Represents the model returned by the following endpoint:
 * `https://docs.reservoir.tools/reference/gettokensv6`
 */
export type ReservoirGetTokenResponse =
  paths["/tokens/v7"]["get"]["responses"]["200"]["schema"]
