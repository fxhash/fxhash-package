import { gqlClient as defaultClient } from "@fxhash/gql-client"
import { BlockchainType, invariant as _invariant } from "@fxhash/shared"
import { DefaultBeaconWalletConfig, TezosWalletManager } from "@fxhash/tez"
import { generateChallenge, authenticate } from "../auth/index.js"
import { AuthenticationResult } from "@fxhash/gql"
import { TezosToolkit } from "@taquito/taquito"
import { config } from "@fxhash/config"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { AccountInfo, BeaconEvent } from "@airgap/beacon-sdk"
import { EventEmitter, EventHandler } from "@/util/EventEmitter.js"
import { EthereumWalletManager } from "@fxhash/eth"

function invariant(condition: unknown, message: string): asserts condition {
  _invariant(condition, `FxhashClient: ${message}`)
}

type FxhashClientOptions = {
  gqlClient?: typeof defaultClient
  tezosToolkit?: TezosToolkit
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

export class FxhashClient extends EventEmitter<FxhashClientEvents> {
  public gqlClient?: typeof defaultClient
  public tezosToolkit?: TezosToolkit
  public beaconWallet?: BeaconWallet
  private authenticationResult?: AuthenticationResult
  private tezosWalletManager?: TezosWalletManager
  private isConnecting = false

  constructor(_options?: FxhashClientOptions) {
    super()
    const options = { ...defaultOptions, ..._options }
    this.gqlClient = options.gqlClient
    this.tezosToolkit = options.tezosToolkit

    if (this.tezosToolkit) {
      this.beaconWallet = new BeaconWallet(DefaultBeaconWalletConfig)
      this.beaconWallet.client.subscribeToEvent(
        BeaconEvent.ACTIVE_ACCOUNT_SET,
        async (account?: AccountInfo) => {
          if (this.isConnecting) return
          if (
            this.tezosWalletManager &&
            this.tezosWalletManager?.address !== account?.address
          ) {
            await this.beaconWallet?.client.clearActiveAccount()
            await this.beaconWallet?.client.disconnect()
            return
          }
          if (account) {
            invariant(this.beaconWallet, "beaconWallet is not set")
            invariant(this.tezosToolkit, "tezosToolkit is not set")
            this.tezosToolkit.setWalletProvider(this.beaconWallet)
            this.tezosWalletManager = new TezosWalletManager({
              wallet: this.beaconWallet,
              tezosToolkit: this.tezosToolkit,
              address: account.address,
            })
            this.emit(
              "connectWallet",
              BlockchainType.TEZOS,
              this.tezosWalletManager
            )
          }
        }
      )
    }
  }

  /**
   * Create a new FxhashClient instance. Specifically
   * @returns A promise that resolves with the new FxhashClient instance.
   */
  static async client(): Promise<FxhashClient> {
    return new FxhashClient({
      tezosToolkit: new TezosToolkit(config.tez.apis.rpcs[0]),
    })
  }

  /**
   * Connect to a Tezos wallet.
   * @param privateKey The private key of the wallet to connect to.
   * If not provided, the user will be prompted to connect to a wallet.
   * @returns A promise that resolves when the wallet is connected.
   */

  async connectTezosWallet(privateKey?: string): Promise<void> {
    try {
      this.isConnecting = true
      if (!privateKey) {
        this.tezosWalletManager = await TezosWalletManager.fromBeaconWallet({
          tezosToolkit: this.tezosToolkit,
          wallet: this.beaconWallet,
        })
      } else {
        this.tezosWalletManager = await TezosWalletManager.fromPrivateKey(
          privateKey,
          { tezosToolkit: this.tezosToolkit }
        )
      }
    } finally {
      this.isConnecting = false
      this.emit("connectWallet", BlockchainType.TEZOS, this.tezosWalletManager)
    }
  }

  private get walletManagersByChain() {
    return {
      [BlockchainType.TEZOS]: this.tezosWalletManager,
      [BlockchainType.ETHEREUM]: undefined,
      [BlockchainType.BASE]: undefined,
    }
  }

  /**
   * Authenticate with the server.
   * @param chain The blockchain of the wallet to authenticate with.
   * @returns A promise that resolves with the authentication result.
   */

  async authenticate(chain: BlockchainType): Promise<AuthenticationResult> {
    const walletManager = this.walletManagersByChain[chain]
    invariant(walletManager, `No wallet for chain ${chain} connected.`)
    const address = walletManager.address
    const challenge = await generateChallenge({
      chain,
      address,
    })
    const sig = await walletManager.signMessage(challenge.text)
    invariant(sig.isSuccess(), "Failed to sign challenge.")
    this.authenticationResult = await authenticate({
      id: challenge.id,
      signature: sig.value.signature,
    })
    return this.authenticationResult
  }
}
