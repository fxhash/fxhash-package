import { gqlClient as defaultClient } from "@fxhash/gql-client"
import { BlockchainType, invariant as _invariant } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { generateChallenge, authenticate } from "@/auth/index.js"
import { EventEmitter, EventHandler } from "@/util/EventEmitter.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { AuthenticationResult, ChallengeResult } from "@fxhash/gql"

function invariant(condition: unknown, message: string): asserts condition {
  _invariant(condition, `FxhashClient: ${message}`)
}

type FxhashClientOptions = {
  gqlClient?: typeof defaultClient
}

const defaultOptions: Partial<FxhashClientOptions> = {
  gqlClient: defaultClient,
}

interface FxhashClientEvents {
  connectWallet: (
    chain: BlockchainType,
    manager: TezosWalletManager | EthereumWalletManager | undefined
  ) => void
  // index signature
  [key: string]: EventHandler<any>
}

type PendingChallenge = {
  chain: BlockchainType
  address: string
  challengeId: string
}

type ValidAuthentication = {
  chain: BlockchainType
  address: string
  accessToken: string
  refreshToken: string
}

export class FxhashClient extends EventEmitter<FxhashClientEvents> {
  public gqlClient?: typeof defaultClient

  private _pendingChallenges: PendingChallenge[] = []
  private _authentications: ValidAuthentication[] = []

  constructor(_options?: FxhashClientOptions) {
    super()
    const options = { ...defaultOptions, ..._options }
    this.gqlClient = options.gqlClient
  }

  async generateChallenge(
    chain: BlockchainType,
    address: string
  ): Promise<ChallengeResult> {
    const res = await generateChallenge({ chain, address })
    this._pendingChallenges.push({ chain, address, challengeId: res.id })
    return res
  }

  async authenticate(
    challengeId: string,
    signature: string,
    publicKey?: string
  ): Promise<AuthenticationResult> {
    const pendingChallenge = this._pendingChallenges.find(
      c => c.challengeId === challengeId
    )
    invariant(pendingChallenge, "Challenge not found")
    const res = await authenticate({ id: challengeId, signature, publicKey })
    this._pendingChallenges = this._pendingChallenges.filter(
      c => c.challengeId !== challengeId
    )
    this._authentications.push({
      chain: pendingChallenge.chain,
      address: pendingChallenge.address,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    })
    return res
  }

  get pendingChallenges(): ReadonlyArray<PendingChallenge> {
    return this._pendingChallenges
  }

  get authentications(): ReadonlyArray<ValidAuthentication> {
    return this._authentications
  }
}
