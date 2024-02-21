import { createClient } from "@reservoir0x/reservoir-sdk"
import { chains, getConfigForChain } from "./Wallet"
import { BlockchainType } from "@fxhash/shared"

export const RESERVOIR_API_URLS = {
  1: "https://api.reservoir.tools/",
  11155111: "https://api-sepolia.reservoir.tools",
  8453: "https://api-base.reservoir.tools",
  84532: "https://api-base-sepolia.reservoir.tools/",
}

//API key used for interacting with Reservoir API
export const RESERVOIR_API_KEY = process.env.RESERVOIR_API_KEY

//source used for interacting with Reservoir API and be able to easily filter on only our orders
export const RESERVOIR_SOURCE = "fxhash.xyz"

//orderbook used for interacting with Reservoir API
export const RESERVOIR_ORDERBOOK = "reservoir"

//order kind used for interacting with Reservoir API
export const RESERVOIR_ORDER_KIND = "seaport-v1.5"

//Defines the headers used for interacting with Reservoir API
const headers = {
  accept: "*/*",
  "content-type": "application/json",
  "x-api-key": RESERVOIR_API_KEY,
}

//Defines the supported API methods
export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

//Defines the global Reservoir client used by the SDK
createClient({
  chains: [],
  apiKey: RESERVOIR_API_KEY,
  source: RESERVOIR_SOURCE,
})

//Creates a generic fetch function for interacting with Reservoir API
//it wraps the call, error handling and parsing of the response
export async function fetchReservoir<T>(
  chain: BlockchainType,
  method: API_METHODS,
  path: string,
  body: string | undefined = undefined
): Promise<T> {
  try {
    const reservoirUrl = getConfigForChain(chain).apis?.reservoir
    const response = await fetch(`${reservoirUrl}${path}`, {
      method: method,
      body: body,
      headers: headers,
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(
        `HTTP error! Error ${response.status}: ${JSON.stringify(data)}`
      )
    }

    return await data
  } catch (error) {
    console.error(error)
    throw error
  }
}
