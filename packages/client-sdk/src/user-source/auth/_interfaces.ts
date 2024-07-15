import { TezosWalletManager } from "@fxhash/tez"
import { IUserSource } from "../_interfaces.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { PromiseResult } from "@fxhash/shared"
import {
  IGraphqlWrapper,
  IWeb3AuthIdentity,
  SignMessageError,
  Storage,
} from "@/index.js"
import { GetSingleUserAccountResult, ICredentialsDriver } from "./_index.js"

export interface IAccountSource extends IUserSource {
  authenticated: () => boolean
}

export interface IAuthAccountSource<AuthFnSignature> extends IAccountSource {
  authenticate: AuthFnSignature
}

export interface IWalletsAccountSource
  extends IAuthAccountSource<
    (
      walletManager: TezosWalletManager | EthereumWalletManager
    ) => PromiseResult<GetSingleUserAccountResult, SignMessageError>
  > {}

/**
 * Authenticate the user in fxhash backend using Web3Auth credentials.
 * todo: type error
 */
export interface IWeb3AuthAccountSource
  extends IAuthAccountSource<
    (
      payload: IWeb3AuthIdentity
    ) => PromiseResult<GetSingleUserAccountResult, Error>
  > {}

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
  storage: Storage

  /**
   * An interface handling authentication credentials (JWT tokens)
   */
  credentialsDriver: ICredentialsDriver<any>

  /**
   * A namespace to scope the account storage between different account sources.
   */
  storageNamespace?: string
}
