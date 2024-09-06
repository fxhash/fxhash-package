import { gqlClient as defaultClient } from "@fxhash/gql-client"

export type GqlOptions = {
  gqlClient: typeof defaultClient
}

export const gqlDefaultOptions: GqlOptions = {
  gqlClient: defaultClient,
}
