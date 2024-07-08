import { type DAppClientOptions } from "@airgap/beacon-sdk"
import { type Config } from "@wagmi/core"
import {
  BlockchainEnv,
  BlockchainEnvs,
  BlockchainType,
  invariant,
} from "@fxhash/shared"
import { EIP1193Connector } from "./EIP1193Connector.js"
import {
  IBaseWalletConnector,
  IWalletsConnector,
  MapEnvToWalletConnector,
} from "../_interfaces.js"
import { TZIP10Connector } from "./TZIP10Connector.js"
import { WalletsConnectorEventEmitter } from "../events.js"
import { AtLeastOne } from "@fxhash/utils"

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
 * the wallets being used by the app as they plug to blockchain-respective
 * window wallet specification.
 */
export class WindowWalletsConnector
  extends WalletsConnectorEventEmitter
  implements IWalletsConnector
{
  private _connectors: {
    [BlockchainEnv.EVM]: EIP1193Connector | null
    [BlockchainEnv.TEZOS]: TZIP10Connector | null
  } = {
    [BlockchainEnv.EVM]: null,
    [BlockchainEnv.TEZOS]: null,
  }
  private _cleanup: (() => void)[] = []
  private _initialized: boolean = false

  constructor(config: IWindowWalletsConnectorConfig) {
    super()
    if (config.tezos) {
      this._connectors[BlockchainEnv.TEZOS] = new TZIP10Connector({
        beaconConfig:
          config.tezos !== true ? config.tezos.beaconConfig : undefined,
        onAccountChange: account =>
          this.emit("wallet-changed", {
            env: BlockchainEnv.TEZOS,
            account: account || null,
          }),
      })
    }
    if (config.evm) {
      this._connectors[BlockchainEnv.EVM] = new EIP1193Connector({
        wagmiConfig: config.evm !== true ? config.evm.wagmiConfig : undefined,
        onAccountChange: account =>
          this.emit("wallet-changed", {
            env: BlockchainEnv.EVM,
            account: account?.address ? (account as any) : null,
          }),
      })
    }
  }

  public async init() {
    invariant(!this._initialized, "WindowWalletsConnector already initialized")

    // attach listeners, then init
    await Promise.all(
      this.getActiveConnectors().map(connector => connector.init())
    )
    this.emit("ready")
    this._initialized = true
  }

  public supportsChain(chain: BlockchainType) {
    switch (chain) {
      case BlockchainType.BASE:
      case BlockchainType.ETHEREUM:
      case BlockchainType.TEZOS:
        return true
    }
  }

  public getActiveConnectors(): IBaseWalletConnector[] {
    return BlockchainEnvs.map(env => this._connectors[env]).filter(
      connector => !!connector
    ) as IBaseWalletConnector[]
  }

  public getWalletConnector<Env extends BlockchainEnv>(
    env: Env
  ): MapEnvToWalletConnector<Env> | null {
    return this._connectors[env] as MapEnvToWalletConnector<Env>
  }

  public requestConnection(env: BlockchainEnv) {
    this._connectors[env]?.requestConnection()
  }

  public async disconnectAll() {
    await Promise.all(this.getActiveConnectors().map(conn => conn.disconnect()))
  }

  public release() {
    this.getActiveConnectors().forEach(conn => conn.release())
    this._cleanup.forEach(fn => fn())
    this._cleanup = []
  }
}

/**
 * Optional config object.
 */
export type IWindowWalletsConnectorConfig = AtLeastOne<{
  /**
   * Config for the EIP1193 Connector. If set to false, the EVM connector will
   * not be instanciated.
   */
  evm?:
    | {
        /**
         * Custom WAGMI Config. If no config is provided, a default one will be
         * used. If using WAGMI outside of fxhash packages, then a config MUST be
         * passed otherwise wallet events won't be reacheable.
         */
        wagmiConfig?: Config
      }
    | boolean

  /**
   * Config for TZIP10 Connector. If set to false, the TEZOS connector will not
   * be instanciated.
   */
  tezos?:
    | {
        /**
         * Custom Beacon Config. At initialization, beacon `getDAppClientInstance()`
         * will be called to either get the singleton instance already instanciated
         * or instanciate a new one using the provided config.
         */
        beaconConfig?: DAppClientOptions
      }
    | boolean
}>
