import { createGqlClient, Client } from "@fxhash/gql-client"

/**
 * An interface for a GraphQL Client Wrapper which provides some high-level
 * utilities.
 *
 * @note In the future, it would be nice to proxy all the query/mutation
 * functions so that the underlying client implementation isn't directly
 * exposed. Not super urgent atm.
 */
export interface IGraphqlWrapper {
  /**
   * A GraphQL client which can be used to run queries.
   */
  client(): Client

  /**
   * Updates the HTTP headers which then must be injected on every request.
   * @param headers New headers which must be injected in all requests
   */
  setRequestHeaders: (headers: Record<string, string>) => void

  /**
   * Add/Override some request headers (without unsetting those already set).
   * @param headers Headers to set/replace
   */
  updateRequestHeaders: (headers: Record<string, string>) => void
}

/**
 * A simple wrapper over the graphql client. It's designed on handle setting
 * headers on requests in a more future-proof way.
 */
export class GraphqlWrapper implements IGraphqlWrapper {
  private _client: Client
  private _headers: Record<string, string> = {}

  constructor() {
    this._client = createGqlClient({
      /**
       * This function will be called on each request, which is how dynamic
       * headers are implemented in the `@urlq/core` Client.
       *
       * @note The other option is to instanciate a GraphQL client on each
       * request.
       */
      fetchOptions: this.getFetchOptions,
    })
  }

  private getFetchOptions = (): RequestInit => ({
    headers: this.headers,
  })

  public get headers() {
    return this._headers
  }

  public client() {
    return this._client
  }

  public setRequestHeaders(headers: Record<string, string>) {
    this._headers = headers
  }

  public updateRequestHeaders(headers: Record<string, string>) {
    this._headers = {
      ...this._headers,
      ...headers,
    }
  }
}
