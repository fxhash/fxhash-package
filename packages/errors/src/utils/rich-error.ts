import type { CombinedError, OperationResult } from "@urql/core"
import {
  IFxhashGraphQLErrorExtensions,
  NetworkRichError,
  RichError,
  UnexpectedRichError,
  WithGqlErrors,
} from ".."
import { Result, failure, success } from "@fxhash/utils"

/**
 * Instanciate a new {@link RichError} using a declarative object. This is
 * useful when Rich Error are instanciated programmatically when type is
 * unknown.
 */
export function richError(params: {
  name: string
  messages: {
    dev: string
    user: string
  }
}) {
  return Object.assign(new RichError(), params) as RichError
}

function isFxhashErrorExtensions(
  ext: Record<string, any>
): ext is IFxhashGraphQLErrorExtensions {
  return ext.version === "fxhash@0.1.0"
}

/**
 * Parses the GraphQL error object into a RichError. This function detects
 * fxhash error extensions for outputting user error messages returned by
 * the backend.
 *
 * @param error A GraphQL error response
 *
 * @returns A rich error constructed by parsing the GraphQL error
 */
export function richErrorFromGraphQLError(
  error: CombinedError
): RichError | UnexpectedRichError | NetworkRichError {
  if (error.graphQLErrors.length > 0) {
    const gqlError = error.graphQLErrors[0]
    if (isFxhashErrorExtensions(gqlError.extensions)) {
      return richError({
        name: gqlError.extensions.code,
        messages: {
          dev: error.message,
          user: gqlError.extensions.userMessage,
        },
      })
    }
    return new UnexpectedRichError()
  }
  if (error.networkError) {
    return new NetworkRichError()
  }
  return new UnexpectedRichError()
}

/**
 * Parses the GraphQL error response to find the fxhash GraphQL error extension,
 * which is used to instanciate a Rich Error from a list of provided RichErrors.
 * The `name` constant property of such classes will be compared to the `code`
 * property of the fxhash error extension to find a match.
 *
 * @param graphQLError GraphQL error response
 * @param potentialErrors An array of RichError classes which will be parsed to
 * find matches between the RichError `name` constant and the `code` returned
 * by the GraphQL fxhash error extension.
 *
 * @returns A RichError instance matchin the error code, or
 * {@link NetworkRichError} if a network error occured, else
 * {@link UnexpectedRichError}
 */
export function typedRichErrorFromGraphQLError<T extends (typeof RichError)[]>(
  graphQLError: CombinedError,
  potentialErrors: T
): WithGqlErrors<InstanceType<T[number]>> {
  if (graphQLError.graphQLErrors.length > 0) {
    const gqlError = graphQLError.graphQLErrors[0]
    if (isFxhashErrorExtensions(gqlError.extensions)) {
      for (const RichErrorClass of potentialErrors) {
        if (RichErrorClass.name === gqlError.extensions.code) {
          return new RichErrorClass() as InstanceType<T[number]>
        }
      }
    }
    return new UnexpectedRichError()
  }
  if (graphQLError.networkError) {
    return new NetworkRichError()
  }
  return new UnexpectedRichError()
}

/**
 * Returns a `Result<Data, TypedRichError>` by parsing a GraphQL response. If
 * the response has an error, {@link typedRichErrorFromGraphQLError} will be
 * called with such error to return a proper error instance based on the error
 * code in the fxhash graphql error extension (or a a generic error if none).
 *
 * @param operationResult A GraphQL response from fxhash hasura endpoint
 * @param getData A function which takes the response and returns the data (if
 * no data is found it should return `null` | `undefined`, in which case it will
 * fail with UnexpectedError)
 * @param potentialErrors An array of Rich Error classes which could be found in
 * the error response.
 *
 * @example
 *
 * ```ts
 * const emailRequestOTP = async (email) => {
 *   return richResultFromGraphQLResponse(
 *     await gqlWrapper.client().mutation(Mu_Web3AuthEmailRequestOTP, {
 *       email,
 *     }),
 *     res => res.data?.web3auth_email_request_otp,
 *     EmailOTPRequestErrors
 *   )
 * },
 * ```
 */
export function richResultFromGraphQLResponse<
  T extends (typeof RichError)[],
  Data = any,
  ExtractedData = any,
>(
  operationResult: OperationResult<Data>,
  getData: (result: OperationResult<Data>) => ExtractedData | undefined | null,
  potentialErrors: T
): Result<ExtractedData, WithGqlErrors<InstanceType<T[number]>>> {
  const res = operationResult
  if (res.error) {
    return failure(typedRichErrorFromGraphQLError(res.error, potentialErrors))
  }
  const data = getData(res)
  return data ? success(data) : failure(new UnexpectedRichError("missing data"))
}
