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

export const Qu_GenerativeTokenById = graphql(`
  query Qu_GenerativeTokenById($id: String!) {
    onchain {
      generative_token_by_pk(id: $id) {
        id
        actions {
          id
          chain
          generative_token {
            id
          }
          objkt {
            id
          }
          created_at
          issuer {
            id
            wallet {
              account {
                id
                profile {
                  picture
                }
                username
              }
            }
          }
          target {
            id
            wallet {
              account {
                id
                profile {
                  picture
                }
                username
              }
            }
          }
          metadata
          numeric_value
          op_hash
          type
        }
      }
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
