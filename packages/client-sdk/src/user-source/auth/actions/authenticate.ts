import {
  AuthenticationInput,
  AuthenticationWeb3AuthInput,
  AuthenticationResult,
  Mu_Authenticate,
  Mu_AuthenticateWeb3Auth,
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

/**
 * Send a query to authenticate a user using credentials they obtained using
 * Web3Auth.
 */
export async function authenticateWeb3Auth(
  input: AuthenticationWeb3AuthInput,
  options: GqlOptions = gqlDefaultOptions
) {
  const { gqlClient } = options
  const { data, error } = await gqlClient.mutation(Mu_AuthenticateWeb3Auth, {
    input,
  })
  if (error) {
    throw new GraphQLError(error.message)
  }
  if (!data || !data.authenticate_web3auth) {
    throw new UnexpectedError()
  }
  return data.authenticate_web3auth
}
