import { gqlClient as defaultClient } from "@fxhash/gql-client"
import { config } from "@fxhash/config"
import {
  BlockchainType,
  JwtAccessTokenPayload,
  invariant,
} from "@fxhash/shared"
import { AuthenticationResult, ChallengeResult } from "@fxhash/gql"
import { jwtDecode } from "jwt-decode"
import {
  generateChallenge,
  authenticate,
  refreshAccessToken,
  logout,
} from "@/auth/index.js"
import { Storage } from "@/util/Storage/Storage.js"
import { GetSingleUserProfileResult, getMyProfile } from "@/auth/profile.js"

type FxhashClientOptions = {
  gqlClient?: typeof defaultClient
  storage?: Storage
}

const defaultOptions: Required<
  Pick<FxhashClientOptions, "gqlClient" | "storage">
> = {
  gqlClient: defaultClient,
  storage: new Storage(),
}

export class FxhashClient {
  public gqlClient: typeof defaultClient
  public accountKey = `fxhash.${config.config.envName}.account`

  private storage: Storage
  public authenticated = false
  /**
   * @review
   * For seperation of concerns, the fxhash client shouldn't directly store
   * the access token, as it's depending on the configuration. The
   * authentication with cookie vs with jwt should be abstracted in isolation,
   * this class should be dumb in that regard.
   */
  public accessToken: string | null = null
  public profile: GetSingleUserProfileResult | null = null

  constructor(_options?: FxhashClientOptions) {
    const options = { ...defaultOptions, ..._options }
    this.gqlClient = options.gqlClient
    this.storage = options.storage
  }

  async generateChallenge(
    chain: BlockchainType,
    address: string
  ): Promise<ChallengeResult> {
    const res = await generateChallenge(
      { chain, address },
      { gqlClient: this.gqlClient }
    )
    return res
  }

  async authenticate(
    challengeId: string,
    signature: string,
    publicKey?: string
  ): Promise<AuthenticationResult> {
    const res = await authenticate(
      { id: challengeId, signature, publicKey },
      { gqlClient: this.gqlClient }
    )

    const { id } = jwtDecode<JwtAccessTokenPayload>(res.accessToken)
    // We store the account in the storage with a static key
    // This is used to retrieve the account in the future
    // For security reasons, we don't store the access token
    await this.storage.setItem(this.accountKey, {
      id,
      refreshToken: res.refreshToken,
    })
    this.accessToken = res.accessToken
    this.authenticated = true
    return res
  }

  async refreshAccessToken(): Promise<AuthenticationResult> {
    const account = await this.getAccountFromStorage()
    invariant(account, "No account authenticated")
    const res = await refreshAccessToken(
      { refreshToken: account.refreshToken },
      {
        gqlClient: this.gqlClient,
      }
    )
    const { id } = jwtDecode<JwtAccessTokenPayload>(res.accessToken)
    await this.storage.setItem(this.accountKey, {
      id,
      refreshToken: res.refreshToken,
    })
    this.accessToken = res.accessToken
    this.authenticated = true
    return res
  }

  async getAccountFromStorage(): Promise<
    { id: string; refreshToken: string } | undefined
  > {
    const account = (await this.storage.getItem(this.accountKey)) as any
    return account
  }

  async getProfile() {
    const account = await this.getAccountFromStorage()
    invariant(account, "No account authenticated")
    const res = await getMyProfile({ gqlClient: this.gqlClient })
    this.profile = res
    return res
  }

  async logout() {
    const account = await this.getAccountFromStorage()
    invariant(account, "No account authenticated")
    await logout(
      { refreshToken: account.refreshToken },
      { gqlClient: this.gqlClient }
    )
    await this.storage.removeItem(this.accountKey)
    this.authenticated = false
    this.accessToken = null
    this.profile = null
  }
}
