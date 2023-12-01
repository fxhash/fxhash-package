import { graphql } from "@/generated"

/**
 * Token pricings and reserves
 */
export const Qu_GetTokenPricingsAndReserves = graphql(`
  query GetTokenPricingsAndReserves($id: String!) {
    onchain {
      generative_token_by_pk(id: $id) {
        reserves {
          id
          method
          amount
          data
        }
        pricing_fixeds {
          id
          opens_at
          price
        }
        pricing_dutch_auctions {
          id
          opens_at
          levels
          decrement_duration
        }
      }
    }
  }
`)
