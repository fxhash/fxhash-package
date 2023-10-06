import { config } from "@fxhash/config"
import { createClient } from "@reservoir0x/reservoir-sdk"

//API key used for interacting with Reservoir API
export const RESERVOIR_API_KEY = process.env.RESERVOIR_API_KEY

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
  chains: [
    {
      id: parseInt(config.ETH_CHAIN_ID),
      baseApiUrl: config.ETH_RESERVOIR_API,
      active: true,
      apiKey: RESERVOIR_API_KEY,
    },
  ],
  source: "fxhash.xyz",
})

//Creates a generic fetch function for interacting with Reservoir API
//it wraps the call, error handling and parsing of the response
export async function fetchReservoir<T>(
  method: API_METHODS,
  path: string,
  body: string
): Promise<T> {
  try {
    const response = await fetch(`${config.ETH_RESERVOIR_API}${path}`, {
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
