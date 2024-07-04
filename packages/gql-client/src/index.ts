import { config } from "@fxhash/config"
import { Client, ClientOptions, fetchExchange } from "@urql/core"
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

type CreateHasuraClientOptions = Optional<
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
export function createGqlClient(options: CreateHasuraClientOptions) {
  if (typeof options.fetchOptions === "function") {
    throw new Error(
      "The createHasuraClient options don't support a function for fetchOptions, as the module overrides the header field using the object notation."
    )
  }
  // merge the default options with the provided options, set headers if secret
  const _options = deepmerge(defaultClientOptions, options)
  if (options.hasuraAdminSecret) {
    ;(_options.fetchOptions as any).headers["x-hasura-admin-secret"] =
      options.hasuraAdminSecret
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
export const gqlClient = createGqlClient({
  hasuraAdminSecret: process.env.HASURA_ADMIN_SECRET,
})
export default gqlClient
