/**
 * Event-related service
 * (Live Minting Events)
 */

import { config } from "@fxhash/config"

interface IMintPassPayload {
  token: string
  project: number
  address: string
}

export async function apiEventsSignPayload(payload: IMintPassPayload): Promise<any> {
  const response = await fetch(
    `${config.apis.dashboard.backend}/graphql/sign-payload`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  if (response.status === 200) {
    return await response.json()
  }
  throw new Error("Error when signing the mint pass.")
}
