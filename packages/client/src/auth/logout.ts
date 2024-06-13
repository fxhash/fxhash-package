import { LogoutResult, LogoutInput, Mu_Logout } from "@fxhash/gql"
import { GraphQLError, UnexpectedError } from "@/util/Error.js"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"

export async function logout(
  input: LogoutInput,
  options: GqlOptions = gqlDefaultOptions
): Promise<LogoutResult | undefined | null> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.mutation(
    Mu_Logout,
    {
      input,
    },
    { fetchOptions: { credentials: "include" } }
  )
  if (error) {
    throw new GraphQLError(error.message)
  }
  if (!data) {
    throw new UnexpectedError()
  }
  return data.logout
}
