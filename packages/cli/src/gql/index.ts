import { devConfig } from "@fxhash/config"
import { createGqlClient } from "@fxhash/gql-client"

export const gqlClient = createGqlClient({
  url: devConfig.apis.hasuraGql,
})
