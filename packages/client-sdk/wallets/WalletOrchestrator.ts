import {
  BlockchainEnv,
  BlockchainEnvs,
  BlockchainType,
  invariant,
} from "@fxhash/shared"
import { IWalletsConnector } from "./connectors/_interfaces.js"
import { EthereumWalletManager, clientToSigner } from "@fxhash/eth"
import { config } from "@fxhash/config"
import { TezosWalletManager } from "@fxhash/tez"
import {
  WConn_WalletChangedEvent,
  WalletsConnectorEventEmitter,
} from "./connectors/events.js"
import { WalletOrchestratorEventEmitter } from "./events.js"
import { intialization } from "@fxhash/utils"

/**
 * should:
 * - handle all provided connectors (store, initialize)
 * - expose high-level events to the user
 */

type BlockchainEnvToWalletManagerMap = {
  [Env in BlockchainEnv]: {
    [BlockchainEnv.EVM]: EthereumWalletManager
    [BlockchainEnv.TEZOS]: TezosWalletManager
  }[Env]
}

type TManagersMap = {
  [Env in BlockchainEnv]: BlockchainEnvToWalletManagerMap[Env] | null
}

type TWalletManagerWithConnector<Env extends BlockchainEnv = BlockchainEnv> = {
  env: Env
  connector: IWalletsConnector
  manager: BlockchainEnvToWalletManagerMap[Env] | null
  createdAt: number
}

export type TActiveManagersMap = {
  [Env in BlockchainEnv]: TWalletManagerWithConnector<Env> | null
}

/**
 * Because multiple connectors can expose a wallet ready for business, there
 * needs to be a strategy in-place for what happens when a wallet connector
 * exposes a new wallet but one is already exposed for the same Blockchain
 * Environment.
 */
export enum ConnectorSelectionStrategy {
  /**
   * @default
   * If a connector exposes an active wallet, then only the same connector can
   * provide a new wallet. If an active wallet has been exposed by a connector,
   * the only way for another connector to expose a wallet is for the first one
   * to release all its active wallets.
   * This is the only setting which prevents having multiple connectors exposing
   * wallets on different blockchain environments.
   */
  SINGLE_CONNECTOR_ALLOWED = "SINGLE_CONNECTOR_ALLOWED",

  /**
   * The order in which the connectors are passed in the constructor will be
   * used to define which connector prevails. For instance, if the following
   * connectors are passed: [Window, Custodial], if the Window Connector
   * exposes a wallet while one was exposed by the Custodial Connector, the
   * Window one will override the Custodial one.
   */
  ORDER_OF_CONNECTORS = "ORDER_OF_CONNECTORS",

  /**
   * The first wallet ready cannot be override.
   */
  FIRST_READY_PREVAILS = "FIRST_READY_PREVAILS",

  /**
   * The last wallet ready always overrides the previous one.
   */
  LAST_READY_PREVAILS = "LAST_READY_PREVAILS",

  /**
   * Application must provide a function which resolves which wallet will be
   * active when a new wallet becomes available, from any connector.
   * TODO: implement support for this
   */
  // CUSTOM_FUNCTION = "CUSTOM_FUNCTION",
}

/**
 * When a new wallet is made available by a connector, this function determines
 * whether such wallet should override the existing ones.
 *
 * @note An override function is only called when there is already any active
 * wallet manager.
 *
 * @returns The updated active managers. A change event will be emitted if any
 * WalletManager instance has changed in the active managers object.
 */
type WalletOverrideResolver = (options: {
  /**
   * The incoming manager, with its blockchain env & source connector.
   */
  incomingManager: TWalletManagerWithConnector
  /**
   * A map of the managers currently active.
   */
  activeManagers: Readonly<TActiveManagersMap>
  /**
   * The current managers map (one / connector). Note: Wallet Managers are
   * always instanciated and updated before this is called, so this will be
   * up-to-date.
   */
  managers: TManagersMap[]
  /**
   * The array of collectors, provided in the same order they were passed to the
   * orchestrator.
   */
  connectors: IWalletsConnector[]
}) => TActiveManagersMap

const walletOverrideMap: Record<
  ConnectorSelectionStrategy,
  WalletOverrideResolver
> = {
  [ConnectorSelectionStrategy.SINGLE_CONNECTOR_ALLOWED]: ({
    incomingManager,
    activeManagers,
  }) => {
    // get any of the active managers (since there's only going to be a single
    // type of connector allowed, we can grab any)
    const anyActive = activeManagers.EVM || activeManagers.TEZOS
    if (!anyActive || anyActive.connector === incomingManager.connector) {
      return {
        ...activeManagers,
        [incomingManager.env]: incomingManager,
      }
    }
    return activeManagers
  },

  [ConnectorSelectionStrategy.ORDER_OF_CONNECTORS]: ({
    connectors,
    managers,
  }) => {
    const newActive: TActiveManagersMap = {
      [BlockchainEnv.EVM]: null,
      [BlockchainEnv.TEZOS]: null,
    }
    // loop in order of the connectors & populate the active managers
    for (let i = 0; i < connectors.length; i++) {
      const manager = managers[i]
      for (const env of BlockchainEnvs) {
        if (newActive[env]) continue
        if (manager[env]) {
          // @ts-ignore
          newActive[env] = {
            env: env,
            connector: connectors[i],
            manager: manager[env]!,
          }
        }
      }
    }
    return newActive
  },

  [ConnectorSelectionStrategy.FIRST_READY_PREVAILS]: ({
    incomingManager,
    activeManagers,
  }) => {
    // todo: what if incomingManager is null
    const newActive = {
      ...activeManagers,
    }
    // update active manager only if there isn't one or if it cames from the
    // same connector
    const currentConnector = activeManagers[incomingManager.env]?.connector
    if (!currentConnector || currentConnector === incomingManager.connector) {
      // @ts-ignore
      newActive[incomingManager.env] = incomingManager
    }
    return newActive
  },

  [ConnectorSelectionStrategy.LAST_READY_PREVAILS]: ({
    incomingManager,
    activeManagers,
  }) => {
    // todo: what if incomingManager is null
    return {
      ...activeManagers,
      [incomingManager.env]: incomingManager,
    }
  },
}

export interface IWalletsOrchestratorParams {
  /**
   * An array of all the Wallet Connector instances which should be handlded by
   * the Orchestrator. The order in which they are provided only matters if
   * the wallet override strategy is
   * `ConnectorSelectionStrategy.ORDER_OF_CONNECTORS`
   */
  connectors: IWalletsConnector[]

  /**
   * Defines how the orchestrator should handle wallets coming from multiple
   * connectors at once.
   * @default ConnectorSelectionStrategy.SINGLE_CONNECTOR_ALLOWED
   */
  walletOverrideStrategy?: ConnectorSelectionStrategy
}

/**
 * Orchestrates wallet lifecycles and emits events when wallets changes state.
 * Handles exposing Wallet Managers instances using the underlying connectors
 * as a provider source for such wallets.
 *
 * The orchestrator accepts an array of Wallet Connectors, allowing for any kind
 * of wallet solution to be implemented.
 */
export class WalletsOrchestrator extends WalletOrchestratorEventEmitter {
  public connectors: IWalletsConnector[]

  /**
   * An array of Wallet Managers map; one for each connector available.
   */
  private _managersMap: TManagersMap[]
  private _activeManagers: TActiveManagersMap = {
    [BlockchainEnv.EVM]: null,
    [BlockchainEnv.TEZOS]: null,
  }
  private _cleanup: (() => void)[] = []
  private _walletOverrideStrategy: ConnectorSelectionStrategy
  private _init = intialization()

  constructor({
    connectors,
    walletOverrideStrategy = ConnectorSelectionStrategy.SINGLE_CONNECTOR_ALLOWED,
  }: IWalletsOrchestratorParams) {
    super()
    this.connectors = connectors
    // 1 manager map / connector
    this._managersMap = connectors.map(_ => ({
      [BlockchainEnv.EVM]: null,
      [BlockchainEnv.TEZOS]: null,
    }))
    this._walletOverrideStrategy = walletOverrideStrategy
  }

  get initialized() {
    return this._init.finished
  }

  /**
   * Proxy convenience for `getActiveManagers()`
   */
  get managers() {
    return this.getActiveManagers()
  }

  async init() {
    this._init.start()
    this._attachListeners()
    await Promise.all(this.connectors.map(connector => connector.init()))
    this._init.finish()
  }

  private _attachListeners() {
    // attach event listeners on all the connectors
    for (let i = 0; i < this.connectors.length; i++) {
      const connector = this.connectors[i]

      const onChanged = async (evt: WConn_WalletChangedEvent) => {
        let incomingManager: TWalletManagerWithConnector<BlockchainEnv> | null =
          null

        if (evt.env === BlockchainEnv.EVM) {
          incomingManager = {
            env: BlockchainEnv.EVM,
            connector: connector,
            manager: null,
            createdAt: performance.now(),
          } as TWalletManagerWithConnector<BlockchainEnv.EVM>

          if (evt.account?.address) {
            const evmConnector = connector.getWalletConnector(BlockchainEnv.EVM)
            invariant(evmConnector, "should not be null")
            const _clients = await evmConnector.getClients(
              BlockchainType.ETHEREUM
            )
            const account = evmConnector.getAccount()

            if (_clients.isSuccess() && account) {
              const clients = _clients.unwrap()
              const signer = clientToSigner(clients.wallet)
              const ewm = new EthereumWalletManager({
                walletClient: clients.wallet,
                publicClient: clients.public,
                rpcNodes: config.eth.apis.rpcs,
                address: account.address,
                signer,
              })
              incomingManager.manager = ewm
            }
          }

          this._managersMap[i][BlockchainEnv.EVM] =
            incomingManager.manager as EthereumWalletManager
        }

        if (evt.env === BlockchainEnv.TEZOS) {
          incomingManager = {
            env: BlockchainEnv.TEZOS,
            connector: connector,
            manager: null,
            createdAt: performance.now(),
          }

          if (evt.account) {
            const tezConnector = connector.getWalletConnector(
              BlockchainEnv.TEZOS
            )
            invariant(tezConnector, "should not be null")
            incomingManager.manager = new TezosWalletManager({
              wallet: tezConnector.getWallet(),
              address: evt.account!.address,
            })
          }

          // update connector active manager
          this._managersMap[i][BlockchainEnv.TEZOS] =
            incomingManager.manager as TezosWalletManager
        }

        // once incomingManager is created, update internal state
        // get the new active managers based on the strategy
        if (incomingManager) {
          const newActiveManagers = walletOverrideMap[
            this._walletOverrideStrategy
          ]({
            activeManagers: this._activeManagers,
            managers: this._managersMap,
            connectors: this.connectors,
            incomingManager,
          })

          // if manager has changed, broadcast the new manager
          if (
            this._activeManagers[evt.env]?.manager !==
            newActiveManagers[evt.env]?.manager
          ) {
            this._activeManagers = newActiveManagers
            // @ts-expect-error
            await this.emit("wallet-changed", {
              env: evt.env,
              manager: newActiveManagers[evt.env]?.manager || null,
            })
          } else {
            this._activeManagers = newActiveManagers
          }
        }
      }

      this._cleanup.push(connector.on("wallet-changed", onChanged))
    }
  }

  public getActiveManager<E extends BlockchainEnv>(
    env: E
  ): BlockchainEnvToWalletManagerMap[E] | null {
    return this._activeManagers[env]?.manager || null
  }

  public getActiveManagers() {
    return this._activeManagers
  }

  public async disonnectAll() {
    await Promise.all(
      this.connectors.map(connector => connector.disconnectAll())
    )
  }

  public release() {
    this._cleanup.forEach(fn => fn())
    this._cleanup = []
  }
}
