/**
 * @author fxhash <dev@fxhash.xyz>
 */

import { BlockchainEnv, BlockchainEnvs, BlockchainType } from "@fxhash/shared"
import {
  IBaseWalletConnector,
  IWalletsConnector,
  MapEnvToWalletConnector,
} from "../_interfaces.js"
import {
  EvmPrivateKeyConnector,
  EvmPrivateKeyConnectorOptions,
} from "./EvmPrivateKeyConnector.js"
import {
  TezosPrivateKeyConnector,
  TezosPrivateKeyConnectorOptions,
} from "./TezosPrivateKeyConnector.js"
import { WalletsConnectorEventEmitter } from "../events.js"

export type PrivateKeyWalletsConnectorOptions = {
  [E in BlockchainEnv]: {
    [BlockchainEnv.EVM]?: EvmPrivateKeyConnectorOptions
    [BlockchainEnv.TEZOS]?: TezosPrivateKeyConnectorOptions
  }[E]
}

/**
 * The PrivateKey Wallets Connector simply allows using private keys directly.
 *
 * **Warning**: This should only be used in development or on the backend. More
 * infos: <https://github.com/ecadlabs/taquito/issues/1764>
 */
export class PrivateKeyWalletsConnector
  extends WalletsConnectorEventEmitter
  implements IWalletsConnector
{
  private _connectors: {
    [BlockchainEnv.EVM]: EvmPrivateKeyConnector
    [BlockchainEnv.TEZOS]: TezosPrivateKeyConnector
  }

  constructor(options: PrivateKeyWalletsConnectorOptions) {
    super()
    this._connectors = {
      [BlockchainEnv.EVM]: new EvmPrivateKeyConnector(
        options.EVM || {},
        account => {
          this.emit("wallet-changed", {
            env: BlockchainEnv.EVM,
            account,
          })
        }
      ),
      [BlockchainEnv.TEZOS]: new TezosPrivateKeyConnector(
        options.TEZOS || {},
        account => {
          this.emit("wallet-changed", {
            env: BlockchainEnv.TEZOS,
            account,
          })
        }
      ),
    }
  }

  public async init() {
    BlockchainEnvs.map(env => this._connectors[env]).forEach(conn =>
      conn.init()
    )
    this.emit("ready")
  }

  public supportsChain(chain: BlockchainType) {
    if (chain === BlockchainType.ETHEREUM || chain === BlockchainType.BASE) {
      return true
    }
    if (chain === BlockchainType.TEZOS) {
      return true
    }
    throw new Error(
      `support for ${chain} is undefined by PrivateKeyWalletsConnector`
    )
  }

  public getWalletConnector<Env extends BlockchainEnv>(
    env: BlockchainEnv
  ): MapEnvToWalletConnector<Env> {
    return this._connectors[env] as any
  }

  public getActiveConnectors(): IBaseWalletConnector[] {
    return BlockchainEnvs.map(env => this._connectors[env])
  }

  /**
   * Update the private key of one of the connectors. Wrapper arround the
   * connectors `updatePrivateKey()` methods for better usage.
   *
   * **Note**: if updating the key results in a change compared to the previous
   * private key used, a `wallet-changed` event will be emitted.
   *
   * @param chainEnv Blockchain environment for which the private key should be
   * updated.
   * @param privateKey The private key as a string
   */
  public updatePrivateKey(chainEnv: BlockchainEnv, privateKey: string) {
    const connector = this._connectors[chainEnv]
    connector.updatePrivateKey(privateKey as any)
  }

  public async disconnectAll() {
    await Promise.all(this.getActiveConnectors().map(conn => conn.disconnect()))
  }
}
