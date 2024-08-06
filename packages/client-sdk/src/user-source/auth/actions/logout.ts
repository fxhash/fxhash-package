import { LogoutResult, LogoutInput, Mu_Logout } from "@fxhash/gql"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"
import { GraphQLError, UnexpectedError } from "@/index.js"

/**
 * Logout the account against the backend. Can eventually clear cookies if
 * credentials are handled by cookies.
 */
export async function logout(
  input: LogoutInput,
  options: GqlOptions = gqlDefaultOptions
): Promise<LogoutResult | undefined | null> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.mutation(Mu_Logout, {
    input,
  })
  if (error) {
    throw new GraphQLError(error.message)
  }
  if (!data) {
    throw new UnexpectedError()
  }
  return data.logout
}
