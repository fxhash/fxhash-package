import { graphql } from "@/generated"

/**
 * Generate a new authentication challenge
 */
export const Mu_AuthGenerateChallenge = graphql(`
  mutation GenerateChallenge($input: ChallengeInput!) {
    generate_challenge(input: $input) {
      id
      text
    }
  }
`)
