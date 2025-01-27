import {
  IRichErrorSerialized,
  RichError,
  RichErrorUnion,
  UnexpectedRichError,
} from "../common.js"
import { NetworkRichError } from "../network.js"

/**
 * Format of the GraphQL error extensions returned by the GraphQL API.
 */
export interface IFxhashGraphQLErrorExtensions {
  version: "fxhash@0.1.0"
  richError: IRichErrorSerialized
}

export const GraphQLErrors: (
  | typeof UnexpectedRichError
  | typeof NetworkRichError
)[] = [NetworkRichError, UnexpectedRichError]

export type WithGqlErrors<T extends RichError> =
  | T
  | RichErrorUnion<typeof GraphQLErrors>
