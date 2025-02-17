import { graphql } from "@/generated"

/**
 * Claim the Tez airdrop for the logged in user
 */
export const Mu_AirdropTezClaim = graphql(`
  mutation AirdropTezClaim {
    airdrop_tez_claim {
      signature
    }
  }
`)
