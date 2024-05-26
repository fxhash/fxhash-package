import { gqlClient as defaultClient } from "@fxhash/gql-client"
import { config } from "@fxhash/config"
import { BlockchainType, JwtAccessTokenPayload } from "@fxhash/shared"
import { AuthenticationResult, ChallengeResult } from "@fxhash/gql"
import { jwtDecode } from "jwt-decode"
import { generateChallenge, authenticate } from "@/auth/index.js"
import { Storage } from "@/util/Storage/Storage.js"

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
    this.storage.setItem(this.accountKey, {
      id,
      refreshToken: res.refreshToken,
    })
    this.accessToken = res.accessToken
    return res
  }
}
