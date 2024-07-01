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

export const Mu_Authenticate = graphql(`
  mutation Authenticate($input: AuthenticationInput!) {
    authenticate(input: $input) {
      accessToken
      refreshToken
    }
  }
`)

export const Mu_RefreshToken = graphql(`
  mutation Refresh($input: RefreshInput!) {
    refresh(input: $input) {
      accessToken
      refreshToken
    }
  }
`)

export const Mu_Logout = graphql(`
  mutation Logout($input: LogoutInput!) {
    logout(input: $input) {
      success
    }
  }
`)
