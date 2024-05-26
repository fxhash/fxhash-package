import { gqlClient as defaultClient } from "@fxhash/gql-client"
import { BlockchainType, JwtAccessTokenPayload } from "@fxhash/shared"
import { AuthenticationResult, ChallengeResult } from "@fxhash/gql"
import { getBlockchainFromAddress } from "@fxhash/utils"
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

  private storage: Storage

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

    const { address, id } = jwtDecode<JwtAccessTokenPayload>(res.accessToken)
    const chain = getBlockchainFromAddress(address)
    this.storage.setItem(`account:${id}`, {
      chain,
      address,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    })
    return res
  }
}
