import {
  GetSingleUserProfileResult,
  SignMessageError,
  authenticate,
  generateChallenge,
  getMyProfile,
  logout,
  refreshAccessToken,
} from "@/index.js"
import { BlockchainEnv } from "@/wallets/WalletConnectors/events.js"
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
import { AuthenticationResult, LogoutInput } from "@fxhash/gql"
import { jwtDecode } from "jwt-decode"
import { Storage } from "@/util/Storage/Storage.js"
import { config } from "@fxhash/config"
import {
  AuthenticationStrategy,
  IAuthenticationStrategy,
} from "./strategies/interfaces.js"
import { IGraphqlWrapper } from "@/client/GraphqlWrapper.js"
import { authStrategiesMap } from "./strategies/collection.js"
import { AuthenticatorEventTarget } from "./events.js"

export type AuthenticatorOptions = {
  gqlWrapper: IGraphqlWrapper
  storage: Storage
  authStrategy: AuthenticationStrategy
}

export class Authenticator extends AuthenticatorEventTarget {
  public static accountKey = `fxhash.${config.config.envName}.account`
  public gql: IGraphqlWrapper
  public storage: Storage
  public authStrategy: IAuthenticationStrategy
  public authenticated = false
  public profile: GetSingleUserProfileResult | null = null
  private _initialized = false

  constructor({
    gqlWrapper,
    storage,
    authStrategy = AuthenticationStrategy.JWT,
  }: AuthenticatorOptions) {
    super()
    this.gql = gqlWrapper
    this.storage = storage
    this.authStrategy = authStrategiesMap[authStrategy]
  }

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
        const recovered = await this.authStrategy.recover(
          account.authentication,
          this
        )
        if (!recovered) {
          await this.cleanup()
          return
        }
        // If we can get the profile we are authenticated
        await this.getProfile()
      } catch (e) {
        console.log("Error getting profile", e)
        // const refreshSuccess =
        await this.authStrategy.refreshAuthentication(this)
        // if (refreshSuccess) return
      }
    }
  }

  private async generateChallenge(chain: BlockchainType, address: string) {
    invariant(this._initialized, "Not initialized")
    return generateChallenge(
      { chain, address },
      { gqlClient: this.gql.client() }
    )
  }

  private async authenticateWithChallenge(
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

  public async authenticate<Env extends BlockchainEnv>(
    env: Env,
    manager: ChainEnvToWalletManagerTypemap[Env]
  ): PromiseResult<{ id: string }, SignMessageError> {
    invariant(this._initialized, "Not initialized")

    // TODO
    // supposed to check if already account here ?

    const challenge = await this.generateChallenge(
      chainEnvToChainMap[env],
      manager.address
    )
    const signature = await manager.signMessage(challenge.text)

    if (signature.isFailure()) {
      return failure(new SignMessageError())
    }

    const credentials = await this.authenticateWithChallenge(
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
    await this.storage.setItem(Authenticator.accountKey, {
      id,
      authentication: this.authStrategy.getStoredAuthentication(
        accessToken,
        refreshToken
      ),
    })

    // eventually apply effects of the authentication strategy
    this.authStrategy.onSuccess(credentials, this.gql)

    return success({ id })
  }

  public async getAccountFromStorage(): Promise<
    { id: string; authentication: any } | undefined
  > {
    invariant(this._initialized, "Not initialized")
    const account = (await this.storage.getItem(
      Authenticator.accountKey
    )) as any
    return account
  }

  async getProfile() {
    invariant(this._initialized, "Not initialized")
    const account = await this.getAccountFromStorage()
    invariant(account, "No account authenticated")
    const res = await getMyProfile({ gqlClient: this.gql.client() })
    this.profile = res
    return res
  }

  /**
   * Cleanup of the storage & properties of the authentication state
   */
  private async cleanup() {
    await this.storage.removeItem(Authenticator.accountKey)
    this.authenticated = false
    this.profile = null
  }

  async logout() {
    invariant(this._initialized, "Not initialized")
    const account = await this.getAccountFromStorage()
    invariant(account, "No account authenticated")
    await logout(this.authStrategy.getLogoutPayload(account.authentication), {
      gqlClient: this.gql.client(),
    })
    this.cleanup()
  }
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
