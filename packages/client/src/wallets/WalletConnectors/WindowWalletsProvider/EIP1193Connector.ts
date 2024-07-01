import {
  Config,
  GetAccountReturnType,
  WatchAccountReturnType,
  createConfig,
  getAccount,
  http,
  watchAccount,
} from "@wagmi/core"
import { baseSepolia, sepolia } from "@wagmi/core/chains"
import { IEvmWalletConnector } from "../interfaces.js"
import { createPublicClient, createWalletClient } from "viem"
import { TypedEventTarget } from "@/util/TypedEventTarget.js"
import {
  WindowWalletChanged,
  WindowWalletConnected,
  WindowWalletDisconnected,
  WindowWalletEventsMap,
} from "./events.js"
import { invariant } from "@fxhash/shared"

/**
 * A default generic config for WAGMI. Consumers should pass their own config
 * when instanciating WindowWalletsConnector if they already use one throughout
 * their app.
 */
const defaultWagmiConfig = createConfig({
  chains: [sepolia, baseSepolia],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
})

/**
 * @author fxhash
 *
 * Implements wallet connection for EIP-1193 spec.
 * <https://eips.ethereum.org/EIPS/eip-1193>
 *
 * The EIP-1193 spec defines a common interface for browser wallets to expose
 * features to interact with the wallet in the page javascript window context.
 *
 * This WalletConnector is designed to:
 * - listen for events emitted by EIP-1193-compliant wallet Providers to
 *   synchronize its internal state, and emit some fxhash client compatible
 *   events based on changes in such a state
 *   <https://eips.ethereum.org/EIPS/eip-1193#events-1>
 * - emit EIP-1193-compliant actions for interacting with wallets synced in
 *   the internal state
 *   <https://eips.ethereum.org/EIPS/eip-1193#request>
 *
 * `@wagmi/core` is used for abstracting the EIP-1193 implementation.
 *
 * @dev The EIP1193 Events Listener should be initialized right when the
 * application starts so that it can listen to the first events emitted by
 * Connectors, and have its internal state in-sync.
 */
export class EIP1193Connector
  extends TypedEventTarget<WindowWalletEventsMap>
  implements IEvmWalletConnector
{
  private _unwatchAccount: WatchAccountReturnType | null = null
  private _wagmiConfig: Config
  private _initialized: boolean = false

  constructor(wagmiConfig?: Config) {
    super()
    this._wagmiConfig = wagmiConfig ?? defaultWagmiConfig
  }

  public async init(wagmiConfigOverride?: Config) {
    invariant(!this._initialized, "EIP1193Connector already initialized")

    if (wagmiConfigOverride) this._wagmiConfig = wagmiConfigOverride
    this._unwatchAccount = watchAccount(this._wagmiConfig, {
      onChange: this._handleAccountChange,
    })
    this._handleAccountChange(getAccount(this._wagmiConfig))
    this._initialized = true
  }

  public release() {
    this._unwatchAccount?.()
  }

  public async getViemClients() {
    // todo: properly create the viem clients
    return {
      public: createPublicClient("" as any),
      wallet: createWalletClient("" as any),
    }
  }

  private _handleAccountChange = async (
    account: GetAccountReturnType,
    prevAccount?: GetAccountReturnType
  ) => {
    if (!prevAccount) {
      // if no account, nothing to process
      if (!account.isConnected) return

      // there is an account, let's emit
      this.dispatchTypedEvent("connected", new WindowWalletConnected())
      this._accountChangedEvent(account)
      return
    }
    // if there was already an account
    else {
      // deconnection detected
      if (!account.isConnected) {
        this.dispatchTypedEvent("disconnected", new WindowWalletDisconnected())
        this._accountChangedEvent(account)
        return
      }

      // a change of account
      if (account.address !== prevAccount.address) {
        this._accountChangedEvent(account)
        return
      }
    }
  }

  private _accountChangedEvent = async (account: GetAccountReturnType) => {
    this.dispatchTypedEvent("changed", new WindowWalletChanged())
  }
}
