import { graphql } from "@/generated"

export const Mu_PrepareRedemption = graphql(`
  mutation PrepareRedemption($input: PrepareRedemptionInput!) {
    prepare_redemption(input: $input) {
      payload {
        consumer
        token_id
        options
        salt
      }
      signature
    }
  }
`)
