import { gqlClient as defaultClient } from "@fxhash/gql-client"
import {
  AuthenticationInput,
  AuthenticationResult,
  Mu_Authenticate,
} from "@fxhash/gql"
import { GraphQLError, UnexpectedError } from "@/util/Error.js"

type AuthenticateOptions = {
  gqlClient: typeof defaultClient
}

const defaultOptions: AuthenticateOptions = {
  gqlClient: defaultClient,
}

/**
 * Authenticate using the provided input
 * @param input {AuthenticationInput}
 * @param options {AuthenticateOptions}
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
  options: AuthenticateOptions = defaultOptions
): Promise<AuthenticationResult> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.mutation(Mu_Authenticate, {
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
