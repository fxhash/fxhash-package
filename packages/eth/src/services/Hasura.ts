import { ApolloClient, InMemoryCache } from "@apollo/client"
import { config } from "@fxhash/config"

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: config.apis.hasuraGql,
})
