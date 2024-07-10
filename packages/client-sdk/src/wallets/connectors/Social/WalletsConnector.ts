/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import {
  BlockchainType,
  BlockchainEnv,
  PromiseResult,
  BlockchainEnvs,
} from "@fxhash/shared"
import {
  IBaseWalletConnector,
  IWalletsConnector,
  MapEnvToWalletConnector,
} from "../_interfaces.js"
import { WalletsConnectorEventEmitter } from "../events.js"
import { SocialWalletsFrameManager } from "./FrameManager.js"
import { intialization } from "@fxhash/utils"
import { SocialWalletsFrameInitializationError } from "./errors.js"
import { EvmSocialWalletConnector } from "./EVM.js"
import { TezosSocialWalletConnector } from "./Tezos.js"

/**
 * The Social Wallets Connector provides an interface to interface with fxhash
 * social wallets (wallets managed by traditionnal social network oauth
 * providers, as well as email).
 *
 * Todos:
 * - when/how to emit events ?
 * - login method
 */
export class SocialWalletsConnector
  extends WalletsConnectorEventEmitter
  implements IWalletsConnector
{
  private _init = intialization()
  private _frameManager: SocialWalletsFrameManager
  private _connectors: {
    [BlockchainEnv.EVM]: EvmSocialWalletConnector
    [BlockchainEnv.TEZOS]: TezosSocialWalletConnector
  }

  constructor() {
    super()
    this._frameManager = new SocialWalletsFrameManager({
      url: "http://localhost:3001",
    })
    this._connectors = {
      [BlockchainEnv.EVM]: new EvmSocialWalletConnector(this._frameManager),
      [BlockchainEnv.TEZOS]: new TezosSocialWalletConnector(this._frameManager),
    }
  }

  public async init() {
    this._init.start()
    const res = await this._frameManager.init()
    if (res.isFailure()) throw res.error
    this._init.finish()
  }

  public supportsChain(chain: BlockchainType) {
    return [
      BlockchainType.BASE,
      BlockchainType.ETHEREUM,
      BlockchainType.TEZOS,
    ].includes(chain)
  }

  public getWalletConnector<Env extends BlockchainEnv>(
    env: Env
  ): MapEnvToWalletConnector<Env> | null {
    return this._connectors[env] as any
  }

  public getActiveConnectors(): IBaseWalletConnector[] {
    return BlockchainEnvs.map(env => this._connectors[env])
  }

  /**
   * Can be called to disconnect the Social Wallets. Usually on Wallets
   * Connectors, each chain can be granularily disconnected but in the case of
   * Social Wallets, it can only be disconnected all at once.
   */
  public async disconnect() {
    const res = await this._frameManager.logout()
    if (res.isFailure()) throw res.error
  }

  /**
   * Disconnects all the Social Wallet Connectors.
   */
  public async disconnectAll() {
    return this.disconnect()
  }

  public async login(options: any) {
    const res = await this._frameManager.login(options)
    console.log({ res })
    if (res.isFailure()) throw res.error
  }
}
