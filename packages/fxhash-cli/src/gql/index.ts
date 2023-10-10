import { ApolloClient, InMemoryCache, QueryOptions } from "@apollo/client"
/**
 * For server side rendering we need to instanciate a new client on every
 * request, otherwise we will run into stale cache issues (some requests will
 * just hit the cache and won't refresh properly).
 */

export const apolloFxHashClient = new ApolloClient({
  uri: `https://live-minting.fxhash-dev.xyz/graphql/graphql`,
  cache: new InMemoryCache(),
})

export const queryOptionsAuthenticated = (
  options: QueryOptions
): QueryOptions => {
  const headers = options.context?.headers ? { ...options.context.headers } : {}
  headers["x-api-key"] = process.env.BACK_API_KEY
  const context = options.context
    ? {
        ...options.context,
        headers,
      }
    : {
        headers,
      }
  return {
    ...options,
    context,
  }
}
