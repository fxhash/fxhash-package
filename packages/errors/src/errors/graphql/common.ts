import { IRichErrorSerialized, RichError, UnexpectedRichError } from "../common"
import { NetworkRichError } from "../network"

/**
 * Format of the GraphQL error extensions returned by the GraphQL API.
 */
export interface IFxhashGraphQLErrorExtensions {
  version: "fxhash@0.1.0"
  richError: IRichErrorSerialized
}

export type WithGqlErrors<T extends RichError> =
  | T
  | NetworkRichError
  | UnexpectedRichError
