import { BlockchainEnv } from "@/wallets/connectors/events.js"
import { type EthereumWalletManager } from "@fxhash/eth"
import {
  BlockchainType,
  JwtAccessTokenPayload,
  PromiseResult,
  failure,
  invariant,
  success,
} from "@fxhash/shared"
import { type TezosWalletManager } from "@fxhash/tez"
import { AuthenticationResult } from "@fxhash/gql"
import { jwtDecode } from "jwt-decode"
import { Storage } from "@/util/Storage/Storage.js"
import { config } from "@fxhash/config"
import {
  CredentialsStrategy,
  ICredentialsStrategy,
  credentialsStratMap,
} from "./credentials/index.js"
import { IGraphqlWrapper } from "@/util/GraphqlWrapper.js"
import { AccountUpdatedEvent, AuthenticatorEventTarget } from "./events.js"
import { isEthereumWalletManager, isTezosWalletManager } from "@/util/types.js"
import {
  GetSingleUserAccountResult,
  authenticate,
  generateChallenge,
  getMyProfile,
  logout,
} from "./index.js"
import { SignMessageError } from "@/util/Error.js"

/**
 * TODOS
 * * all the smaller todos
 * * how is refreshing of credentials handled ? RN if token expires, queries
 *   just fails while it should be retried after a refresh of the creds ?
 */

/**
 * Options for instanciatinf the Authenticator
 */
export type AuthenticatorOptions = {
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
   * Which strategy should be used to handle the authentication. Right now
   * supports cookie or JWT.
   *
   * **Note:** the cookie option only works if the deployed application is under
   * a fxhash domain (`*.fxhash.xyz`), otherwise cookie will be rejected by the
   * browser.
   *
   * @default CredentialsStrategy.JWT
   */
  credentialsStrategy: CredentialsStrategy
}

type StoredAccount<
  Credentials extends Record<string, string> = Record<string, string>,
> = {
  id: string
  credentials: Credentials
}

/**
 * The Authenticator acts as a sort of Manager for anything authentication
 * related. It implemented full authentication flows on-demand, and emits some
 * events when underlying account data changes, allowing other application
 * components to react to such changes.
 *
 * The Authenticator works with a Credentials Strategy, which may implement some
 * particular way of handling credentials returned by the server. Not all
 * credential strategies are available on all applications/platforms (notably
 * Cookies, because of 3rd party cookies sunset on chrome).
 */
export class Authenticator extends AuthenticatorEventTarget {
  /**
   * The key which will be used to store the account data.
   */
  public static accountStorageKey = `fxhash.${config.config.envName}.account`

  private _account: GetSingleUserAccountResult | null = null
  private _gql: IGraphqlWrapper
  private _storage: Storage
  private _credStrat: ICredentialsStrategy
  private _initialized = false

  constructor({
    gqlWrapper,
    storage,
    credentialsStrategy = CredentialsStrategy.JWT,
  }: AuthenticatorOptions) {
    super()
    this._gql = gqlWrapper
    this._storage = storage
    this._credStrat = credentialsStratMap[credentialsStrategy]
  }

  /**
   * The GraphQLWrapper instance which was passed at instanciation.
   */
  get gql() {
    return this._gql
  }

  /**
   * The Storage instance which was passed at instanciation.
   */
  get storage() {
    return this._storage
  }

  /**
   * Get the account of the user currently authenticated.
   */
  get account() {
    return this._account
  }

  /**
   * Whether an account is currently authenticated or not. Is the same as
   * querying `!!authenticator.account`
   */
  get authenticated() {
    return !!this._account
  }

  /**
   * Updates the account property of this class in-memory and broadcast an
   * AccountUpdatedEvent. Also updated the authenticated boolean based on the
   * state of the account value.
   */
  private set account(account: GetSingleUserAccountResult | null) {
    const prev = this._account
    this._account = account

    // everytime the account is updated, emit event.
    if (prev !== account || prev?.id !== account?.id) {
      this.dispatchTypedEvent(
        "account-updated",
        new AccountUpdatedEvent({ account })
      )
    }
  }

  /**
   * Should be called when the application starts to retrieve credentials from
   * the storage, synchronize user state with the backend (eventually by
   * refreshing the credentials if needed), to get to a stable state with
   * regards to the authentication.
   */
  public async init() {
    invariant(!this._initialized, "Can only initialize once")
    this._initialized = true

    const account = await this.getAccountFromStorage()

    /**
     * TODO
     * Double check this flow
     */

    // if there's an account in the storage, then init authentication
    // recovery process, which depends on the authentication strategy
    if (account) {
      try {
        const recovered = await this._credStrat.recover(
          account.credentials,
          this
        )
        if (!recovered) {
          await this.cleanup()
          return
        }
        // If we can get the profile we are authenticated
        await this.syncAccount()
      } catch (e) {
        console.log("Error getting profile", e)
        // const refreshSuccess =
        await this._credStrat.refreshAuthentication(this)
        // if (refreshSuccess) return
      }
    }
  }

  private async _generateChallenge(chain: BlockchainType, address: string) {
    invariant(this._initialized, "Not initialized")
    return generateChallenge(
      { chain, address },
      { gqlClient: this.gql.client() }
    )
  }

  private async _authenticateWithChallenge(
    challengeId: string,
    signature: string,
    publicKey?: string
  ): Promise<AuthenticationResult> {
    invariant(this._initialized, "Not initialized")
    return authenticate(
      { id: challengeId, signature, publicKey },
      { gqlClient: this.gql.client() }
    )
  }

  /**
   * Performs a full authentication flow using the provided WalletManager.
   * - generate a challenge for the blockchain of the wallet
   * - sign the challenge text message with WalletManager
   * - authenticate user against backend using challenge+signature
   * - forward credentials to CredentialsStrategy for them to be handled
   * - fetch account using authenticated query
   * - return account
   *
   * @param manager A WalletManager ready to sign a message.
   *
   * @returns Account on success, error on failure. (Note: the account is also
   * stored and managed internally, application don't have to rely on the value
   * returned by this function to manager the account state.)
   */
  public async authenticate(
    manager: TezosWalletManager | EthereumWalletManager
  ): PromiseResult<GetSingleUserAccountResult, SignMessageError> {
    invariant(this._initialized, "Not initialized")

    // derive blockchain env from WalletManager instance
    let env: BlockchainEnv | null = null
    if (isTezosWalletManager(manager)) env = BlockchainEnv.TEZOS
    if (isEthereumWalletManager(manager)) env = BlockchainEnv.EVM
    invariant(env !== null, "WalletManager is neither tezos/ethereum")

    /**
     * TODOs:
     * * check this flow
     * * should we fetch account here ? and do anything with it ?
     * * should implement mechanism to only have 1 authentication at once (and
     *   maybe a way to cancel current flow if any)
     * * improve error handling, right now we just throw if it fails
     */

    const challenge = await this._generateChallenge(
      chainEnvToChainMap[env],
      manager.address
    )
    const signature = await manager.signMessage(challenge.text)

    if (signature.isFailure()) {
      return failure(new SignMessageError())
    }

    const credentials = await this._authenticateWithChallenge(
      challenge.id,
      signature.unwrap().signature,
      env === BlockchainEnv.TEZOS
        ? await (manager as TezosWalletManager).getPublicKey()
        : undefined
    )

    const { accessToken, refreshToken } = credentials
    const { id } = jwtDecode<JwtAccessTokenPayload>(accessToken)

    // store user ID in storage, as well as some additionnal data based on the
    // authentication payload we received.
    await this.storage.setItem(Authenticator.accountStorageKey, {
      id,
      authentication: this._credStrat.getStoredAuthentication(
        accessToken,
        refreshToken
      ),
    })

    // eventually apply effects of the authentication strategy
    this._credStrat.onSuccess(credentials, this.gql)

    // fetch user account, should be authenticated
    const account = await this.syncAccount()

    return success(account)
  }

  public async getAccountFromStorage(): Promise<StoredAccount | null> {
    invariant(this._initialized, "Not initialized")
    const account = await this.storage.getItem(Authenticator.accountStorageKey)
    if (!account) return null
    // return account if data is valid
    if (isStoredAccountValid(account)) {
      return account
    }
    // somehow the storage was compromised, as the value doesn't
    await this.storage.removeItem(Authenticator.accountStorageKey)
    return null
  }

  /**
   * Fetches account using authenticated request, also synchronizes the internal
   * state based on the query response.
   * @note If the account state has changed, a AccountChangedEvent will also be
   * emitted as result
   * @returns Authenticated account (or null if none)
   */
  public async syncAccount() {
    invariant(this._initialized, "Not initialized")
    const account = await this.getAccountFromStorage()
    invariant(account, "No account authenticated")
    const res = await getMyProfile({ gqlClient: this.gql.client() })
    this.account = res
    return res
  }

  /**
   * Cleanup of the storage & properties of the authentication state
   */
  private async cleanup() {
    await this.storage.removeItem(Authenticator.accountStorageKey)
    await this._credStrat.clear(this)
    this.account = null
  }

  /**
   * Makes a logout request to the backend, and eventually clears any local
   * state to forget authentication.
   */
  async logout() {
    invariant(this._initialized, "Not initialized")
    const account = await this.getAccountFromStorage()
    invariant(account, "No account authenticated")
    await logout(this._credStrat.getLogoutPayload(account.credentials), {
      gqlClient: this.gql.client(),
    })
    this.cleanup()
  }
}

function isStoredAccountValid(account: any): account is StoredAccount {
  return !!account && typeof account.id === "string"
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// TODO: move somewhere generic
////////////////////////////////////////////////////////////////////////////////
type ChainEnvToWalletManagerTypemap = {
  [E in BlockchainEnv]: {
    [BlockchainEnv.TEZOS]: TezosWalletManager
    [BlockchainEnv.EVM]: EthereumWalletManager
  }[E]
}

type ChainToChainEnvTypemap = {
  [T in BlockchainType]: {
    [BlockchainType.BASE]: BlockchainEnv.EVM
    [BlockchainType.ETHEREUM]: BlockchainEnv.EVM
    [BlockchainType.TEZOS]: BlockchainEnv.TEZOS
  }[T]
}

const chainToChainEnvMap: {
  [K in BlockchainType]: ChainToChainEnvTypemap[K]
} = {
  [BlockchainType.BASE]: BlockchainEnv.EVM,
  [BlockchainType.ETHEREUM]: BlockchainEnv.EVM,
  [BlockchainType.TEZOS]: BlockchainEnv.TEZOS,
}

type ChainEnvToChainTypemap = {
  [E in BlockchainEnv]: {
    [BlockchainEnv.EVM]: BlockchainType.ETHEREUM
    [BlockchainEnv.TEZOS]: BlockchainType.TEZOS
  }[E]
}

const chainEnvToChainMap: {
  [E in BlockchainEnv]: ChainEnvToChainTypemap[E]
} = {
  [BlockchainEnv.EVM]: BlockchainType.ETHEREUM,
  [BlockchainEnv.TEZOS]: BlockchainType.TEZOS,
}
