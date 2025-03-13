import { graphql } from "@/generated"

/**
 * Claim the Tez airdrop for the logged in user
 */
export const Mu_AirdropTezClaim = graphql(`
  mutation AirdropTezClaim($input: AirdropTezClaimInput!) {
    airdrop_tez_claim(input: $input) {
      signature
    }
  }
`)
