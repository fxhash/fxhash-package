import {
  RefreshInput,
  Mu_RefreshToken,
  AuthenticationResult,
} from "@fxhash/gql"
import { GraphQLError, UnexpectedError } from "@/util/Error.js"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"

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
  if (!data || !data.authenticate) {
    throw new UnexpectedError()
  }
  return data.authenticate
}
