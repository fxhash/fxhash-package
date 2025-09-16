import { graphql } from "@/generated"

export const Mu_CreateWhitelist = graphql(`
  mutation CreateWhitelist($whitelist: jsonb!) {
    set_whitelist(whitelist: $whitelist) {
      merkleRoot
      message
      success
    }
  }
`)

export const Mu_GenerateChallenge = graphql(`
  mutation GenerateChallenge($input: ChallengeInput!) {
    generate_challenge(input: $input) {
      id
      text
    }
  }
`)
