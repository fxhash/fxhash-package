import { prdConfig } from "@fxhash/config"
import { createGqlClient } from "@fxhash/gql-client"

export const gqlClient = createGqlClient({
  url: prdConfig.apis.hasuraGql,
})
