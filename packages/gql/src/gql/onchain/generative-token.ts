import { graphql } from "@/generated"

/**
 * The Pricing details for a Generative Token
 */
export const Frag_GenerativeTokenPricing = graphql(`
  fragment GenerativeToken_Pricing on generative_token {
    pricing_fixeds {
      price
      opens_at
    }
    pricing_dutch_auctions {
      levels
      resting_price
      final_price
      decrement_duration
      opens_at
    }
  }
`)
