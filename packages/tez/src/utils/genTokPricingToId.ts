import { GenTokPricing } from "@fxhash/shared"

export const mapGenTokPricingToId: Record<GenTokPricing, number> = {
  FIXED: 0,
  DUTCH_AUCTION: 1,
}

/**
 * Maps a Pricing enum to its corresponding ID
 */

export function genTokPricingToId(pricingEnum: GenTokPricing): number {
  return mapGenTokPricingToId[pricingEnum]
}
