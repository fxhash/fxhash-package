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

export const Qu_GetObjectsOfTokenAndWallets = graphql(`
  query Qu_GetObjectsOfTokenAndWallets(
    $_eq: String = ""
    $_iregex: String = ""
  ) {
    onchain {
      objkt(
        where: {
          generative_token: { id: { _eq: $_eq } }
          minter_id: { _iregex: $_iregex }
        }
        order_by: { created_at: desc }
      ) {
        id
        minter_id
        slug
        capture_media_id
      }
    }
  }
`)
