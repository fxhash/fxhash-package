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
} from "@/auth/index.js"
import { Storage } from "@/util/Storage/Storage.js"
import { GetSingleUserProfileResult, getUserProfile } from "@/auth/profile.js"

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
    return res
  }

  async getAccountFromStorage(): Promise<{ id: string; refreshToken: string }> {
    const account = (await this.storage.getItem(this.accountKey)) as any
    return account
  }

  async getProfile() {
    const account = await this.getAccountFromStorage()
    invariant(account, "No account authenticated")
    const res = await getUserProfile(
      { id: { _eq: account.id } },
      { gqlClient: this.gqlClient }
    )
    this.profile = res
    return res
  }
}
