import { config } from "@fxhash/config"
import { createClient } from "@fxhash/hasura"

export const hasuraClient = createClient({
  url: config.apis.hasuraGql,
})
