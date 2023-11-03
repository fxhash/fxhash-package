import { graphql } from "@/generated"

/**
 * The Pricing details for a Generative Token
 */
export const Frag_GenerativeTokenPricing = graphql(`
  fragment GenerativeToken_Pricing on GenerativeToken {
    pricingFixed {
      price
      opensAt
    }
    pricingDutchAuction {
      levels
      restingPrice
      finalPrice
      decrementDuration
      opensAt
    }
  }
`)
