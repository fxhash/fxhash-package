import {
  RefreshInput,
  Mu_RefreshToken,
  AuthenticationResult,
} from "@fxhash/gql"
import { GraphQLError, UnexpectedError } from "@/index.js"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"

/**
 * Calls the backend to request a refresh of the access token using the refresh
 * token. Will update the session with a new access token.
 */
export async function refreshAccessToken(
  input: RefreshInput,
  options: GqlOptions = gqlDefaultOptions
): Promise<AuthenticationResult> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.mutation(Mu_RefreshToken, {
    input,
  })
  if (error) {
    throw new GraphQLError(error.message)
  }
  if (!data || !data.refresh) {
    throw new UnexpectedError()
  }
  return data.refresh
}
