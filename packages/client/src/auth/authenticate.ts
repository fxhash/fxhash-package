import {
  AuthenticationInput,
  AuthenticationResult,
  Mu_Authenticate,
} from "@fxhash/gql"
import { GraphQLError, UnexpectedError } from "@/util/Error.js"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"

/**
 * Authenticate using the provided input
 * @param input {AuthenticationInput}
 * @param options {GqlOptions}
 * @returns {AuthenticationResult}
 * @throws If the authentication fails
 * @example
 * ```ts
 *  // This example will fail but you will see the signature-invalid error
 *  const result = await authenticate({
 *    id: "afe7a262-4bef-4a15-8557-79b74e0fa99c",
 *    signature: "test"
 *  })
 * ```
 */
export async function authenticate(
  input: AuthenticationInput,
  options: GqlOptions = gqlDefaultOptions
): Promise<AuthenticationResult> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.mutation(
    Mu_Authenticate,
    {
      input,
    },
    { fetchOptions: { credentials: "include" } }
  )
  if (error) {
    throw new GraphQLError(error.message)
  }
  if (!data || !data.authenticate) {
    throw new UnexpectedError()
  }
  return data.authenticate
}
