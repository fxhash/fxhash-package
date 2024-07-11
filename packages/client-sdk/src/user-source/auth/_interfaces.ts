import { TezosWalletManager } from "@fxhash/tez"
import { IUserSource } from "../_interfaces.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { PromiseResult } from "@fxhash/shared"
import { IGraphqlWrapper, SignMessageError, Storage } from "@/index.js"
import { GetSingleUserAccountResult, ICredentialsDriver } from "./_index.js"
import { Hex } from "viem"

export interface IAccountSource extends IUserSource {
  authenticated: () => boolean
  logout: () => Promise<any>
  getWalletManagers: () => null
}

export interface IWalletsAccountSource extends IAccountSource {
  authenticate: (
    walletManager: TezosWalletManager | EthereumWalletManager
  ) => PromiseResult<GetSingleUserAccountResult, SignMessageError>
}

export interface IWeb3AuthAuthPayload {
  /**
   * A Web3Auth authentication token obtained after authenticating with Web3Auth
   * Such token will be used to securely validate wallet details using Web3Auth
   * JWKS and validate the public key.
   */
  token: string

  /**
   * A public key in the format EVM compressed public key, which is returned
   * by Web3Auth when going through their authentication flow.
   */
  compressedPublicKey: Hex
}

export interface IWeb3AuthAccountSource extends IAccountSource {
  /**
   * Authenticate the user in fxhash backend using Web3Auth credentials.
   */
  authenticate: (
    payload: IWeb3AuthAuthPayload
  ) => PromiseResult<GetSingleUserAccountResult, Error> // todo: type error
}

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
  credentialsDriver: ICredentialsDriver
}
