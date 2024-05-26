import { gqlClient as defaultClient } from "@fxhash/gql-client"
import {
  BlockchainType,
  invariant as _invariant,
  JwtAuthPayload,
} from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { generateChallenge, authenticate } from "@/auth/index.js"
import { EventEmitter, EventHandler } from "@/util/EventEmitter.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { AuthenticationResult, ChallengeResult } from "@fxhash/gql"
import { createStorage, Storage } from "unstorage"
import { getBlockchainFromAddress } from "@fxhash/utils"
import { jwtDecode } from "jwt-decode"

type FxhashClientOptions = {
  gqlClient?: typeof defaultClient
  storage?: Storage
}

const defaultOptions: Required<
  Pick<FxhashClientOptions, "gqlClient" | "storage">
> = {
  gqlClient: defaultClient,
  storage: createStorage(),
}

interface FxhashClientEvents {
  connectWallet: (
    chain: BlockchainType,
    manager: TezosWalletManager | EthereumWalletManager | undefined
  ) => void
  // index signature
  [key: string]: EventHandler<any>
}

export class FxhashClient extends EventEmitter<FxhashClientEvents> {
  public gqlClient: typeof defaultClient

  private storage: Storage

  constructor(_options?: FxhashClientOptions) {
    super()
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
    await this.storage.setItem(`account:${id}`, {
      chain,
      address,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    })
    return res
  }
}
