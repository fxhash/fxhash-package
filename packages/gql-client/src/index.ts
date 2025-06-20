import { config } from "@fxhash/config"
import { Client, type ClientOptions, fetchExchange } from "@urql/core"
import deepmerge from "deepmerge"

const defaultClientOptions: ClientOptions = {
  url: config.apis.hasuraGql,
  exchanges: [fetchExchange],
  fetchOptions: {
    headers: {},
    credentials: "include",
  },
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type CreateHasuraClientOptions = Optional<
  ClientOptions,
  "exchanges" | "url"
> & {
  hasuraAdminSecret?: string
}

/**
 * Instanciates a new graphql client (using `@urql/core`), configuring a http
 * header for authenticating the client against hasura if provided.
 * @param hasuraAdminSecret The admin secret for hasura
 * @returns @urql/core client
 */
export function createGqlClient(options: CreateHasuraClientOptions): Client {
  const addHasuraAdminSecretHeaders = (reqInit: RequestInit) => {
    if (options.hasuraAdminSecret) {
      if (!reqInit.headers) {
        reqInit.headers = {}
      }
      ;(reqInit as any).headers["x-hasura-admin-secret"] =
        options.hasuraAdminSecret
    }
    return reqInit
  }

  const _fetchOptions = options.fetchOptions
  delete options.fetchOptions
  const _options = deepmerge(defaultClientOptions, options)

  if (typeof _fetchOptions === "function") {
    _options.fetchOptions = () => {
      return addHasuraAdminSecretHeaders({
        ...defaultClientOptions.fetchOptions,
        ..._fetchOptions(),
      })
    }
  } else {
    _options.fetchOptions = addHasuraAdminSecretHeaders({
      ...defaultClientOptions.fetchOptions,
      ..._fetchOptions,
    })
  }

  return new Client(_options)
}

/**
 * Default hasura client instanciated with "best option" as a default. If
 * `process.env.HASURA_ADMIN_SECRET` is defined, a header will be added with
 * the hasura admin secret.
 *
 * @remark The function createHasuraClient() should be used if the default
 * client instanciated is not suited.
 */
export const gqlClient: Client = createGqlClient({
  hasuraAdminSecret: process.env.HASURA_ADMIN_SECRET,
})
export default gqlClient

/**
 * Export utility types from `@urql/core`
 */
export type { Client } from "@urql/core"
