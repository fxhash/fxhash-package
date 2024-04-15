import { clamp } from "./math"
import { GenerativeToken } from "@fxhash/shared"

const differenceInSeconds = (d1: Date, d2: Date) => {
  const diffInMilliseconds = d2.getTime() - d1.getTime()
  return Math.floor(diffInMilliseconds / 1000)
}

/**
 * Outputs the current price of a Generative Token based on its pricing
 * settings and based on the current time
 */

export function genTokCurrentPrice(token: GenerativeToken): number {
  let price = 0
  if (token.pricingFixed) {
    price = token.pricingFixed.price
  } else if (token.pricingDutchAuction) {
    const da = token.pricingDutchAuction
    // if there's a final price for the auction, we set it
    if (da.finalPrice) {
      price = da.finalPrice
    }

    // otherwise we compute price based on timer
    else {
      const diff = differenceInSeconds(new Date(), new Date(da.opensAt!))
      const idx = clamp(
        Math.floor(diff / da.decrementDuration),
        0,
        da.levels.length - 1
      )
      price = da.levels[idx]
    }
  }
  return price
}
