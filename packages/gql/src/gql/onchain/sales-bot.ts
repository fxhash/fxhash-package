import { graphql } from "@/generated"

/**
 * Query used by the sales bot
 */
export const Qu_GetActionSalesBot = graphql(`
  query GetActionSalesBot($id: uuid!) {
    onchain {
      action_by_pk(id: $id) {
        id
        type
        numeric_value
        created_at
        issuer_id
        issuer {
          wallet {
            account {
              username
            }
          }
        }
        target_id
        user {
          wallet {
            account {
              username
            }
          }
        }
        objkt {
          id
          name
          metadata
        }
        generative_token {
          id
          thumbnail_uri
          author_id
          author {
            wallet {
              account {
                username
              }
            }
          }
        }
      }
    }
  }
`)
