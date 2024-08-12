import {
  IFxhashErrorExtension,
  RichError,
  UnexpectedRichError,
} from "../common"
import { NetworkRichError } from "../network"

/**
 * Format of the GraphQL error extensions returned by the GraphQL API.
 */
export interface IFxhashGraphQLErrorExtensions extends IFxhashErrorExtension {
  version: "fxhash@0.1.0"
  code: string
  userMessage: string
}

export type WithGqlErrors<T extends RichError> =
  | T
  | NetworkRichError
  | UnexpectedRichError
