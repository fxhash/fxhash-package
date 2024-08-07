import type { IUserSource } from "../_interfaces.js"
import type { IGraphqlWrapper, IStorageDriver } from "@/index.js"
import type { ICredentialsDriver } from "./_index.js"

export interface IAccountSource extends IUserSource {
  authenticated: () => boolean
}

export interface IAuthAccountSource extends IAccountSource {}
export interface IWalletsAccountSource extends IAuthAccountSource {}
export interface IWeb3AuthAccountSource extends IAuthAccountSource {}

export type StoredAccount<
  Credentials extends Record<string, string> = Record<string, string>,
> = {
  id: string
  credentials: Credentials
}

export interface IAccountSourceCommonOptions {
  /**
   * An instance of the GraphQLWrapper used by the rest of the application. The
   * Authenticator may require some headers to be set so that all the gql
   * queries made by the application are authenticated, as such a single
   * instance should be used accross the app.
   */
  gqlWrapper: IGraphqlWrapper

  /**
   * A Storage implementation. Doesn't have to be the same used by the rest of
   * the app.
   */
  storage: IStorageDriver

  /**
   * An interface handling authentication credentials (JWT tokens)
   */
  credentialsDriver: ICredentialsDriver<any>

  /**
   * A namespace to scope the account storage between different account sources.
   */
  storageNamespace?: string
}
