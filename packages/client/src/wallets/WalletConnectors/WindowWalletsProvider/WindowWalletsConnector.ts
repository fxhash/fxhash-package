import { type DAppClientOptions } from "@airgap/beacon-sdk"
import { type Config } from "@wagmi/core"
import { BlockchainType, invariant } from "@fxhash/shared"
import { EIP1193Connector } from "./EIP1193Connector.js"
import { IWalletsConnector, MapChainToWalletConnector } from "../interfaces.js"
import { TZIP10Connector } from "./TZIP10Connector.js"
import { WalletConnectedEvent, WalletsConnectorEventTarget } from "../events.js"
import {
  WindowWalletChanged,
  WindowWalletConnected,
  WindowWalletDisconnected,
} from "./events.js"

/**
 * @author fxhash
 *
 * The WindowWalletsConnector implements support for connecting with wallets
 * using Javascript objects exposed in the main page by wallets. Using common
 * libraries, this modules listens to events emitted on the page to synchronoize
 * the internal state of wallets, so that they can be used by other fxhash
 * modules.
 *
 * This implementation ensures no library is enforced to API consumers, instead
 * it instanciates, synchronizes and exposes some clients which can be used by
 * a fxhash Wallet Manager instance (abstraction to run fxhash operations
 * easily).
 *
 * This implementation is unopiniated, any wallet library of choice can be used
 * by API consumers on the rest of the app, this module will naturally expose
 * the wallets being used by the app.
 */
export class WindowWalletsConnector
  extends WalletsConnectorEventTarget
  implements IWalletsConnector
{
  private _tez: TZIP10Connector
  private _evm: EIP1193Connector
  private _cleanup: (() => void)[] = []
  private _initialized: boolean = false

  constructor(config: IWindowWalletsConnectorConfig) {
    super()
    this._tez = new TZIP10Connector(config?.tezos?.beaconConfig)
    this._evm = new EIP1193Connector(config?.evm?.wagmiConfig)
  }

  public async init() {
    invariant(!this._initialized, "WindowWalletsConnector already initialized")

    // attach listeners, then init
    this._attachListeners()
    await Promise.all([this._tez, this._evm].map(connector => connector.init()))
    this._initialized = true
  }

  private _attachListeners() {
    invariant(!this._initialized, "WindowWalletsConnector already initialized")

    const onEvmChanged = (evt: WindowWalletChanged) => {
      console.log("window evm wallet changed")
      console.log({ evt })
      // todo:
      // - new wallet managers here / update existing ones ?
      // - emit wallet manager changed
    }

    const onTezChanged = (evt: WindowWalletChanged) => {
      console.log("window tez wallet changed")
      console.log({ evt })
      // todo:
      // - new wallet managers here / update existing ones ?
      // - emit wallet manager changed
    }

    this._evm.addEventListener("changed", onEvmChanged)
    this._tez.addEventListener("changed", onTezChanged)

    // will be cleaned upon release
    this._cleanup.push(() => {
      this._evm.removeEventListener("changed", onEvmChanged)
      this._tez.removeEventListener("changed", onTezChanged)
    })
  }

  public supportsChain(chain: BlockchainType) {
    switch (chain) {
      case BlockchainType.BASE:
      case BlockchainType.ETHEREUM:
      case BlockchainType.TEZOS:
        return true
    }
  }

  getWalletConnector<Chain extends BlockchainType>(
    chain: Chain
  ): MapChainToWalletConnector<Chain> {
    switch (chain) {
      case BlockchainType.BASE:
      case BlockchainType.ETHEREUM:
        return this._evm as any
      case BlockchainType.TEZOS:
        return this._tez as any
    }

    // for TS to oblige
    throw null
  }

  public release() {
    this._evm.release()
    this._cleanup.forEach(fn => fn())
  }
}

/**
 * Optional config object.
 */
export interface IWindowWalletsConnectorConfig {
  /**
   * Config for the EIP1193 Connector
   */
  evm?: {
    /**
     * Custom WAGMI Config. If no config is provided, a default one will be
     * used. If using WAGMI outside of fxhash packages, then a config MUST be
     * passed otherwise wallet events won't be reacheable.
     */
    wagmiConfig?: Config
  }

  /**
   * Config for TZIP10 Connector
   */
  tezos?: {
    /**
     * Custom Beacon Config. At initialization, beacon `getDAppClientInstance()`
     * will be called to either get the singleton instance already instanciated
     * or instanciate a new one using the provided config.
     */
    beaconConfig?: DAppClientOptions
  }
}
