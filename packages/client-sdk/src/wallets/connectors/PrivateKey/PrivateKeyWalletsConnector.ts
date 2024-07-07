/**
 * @author fxhash <dev@fxhash.xyz>
 */

import { BlockchainEnv, BlockchainType } from "@fxhash/shared"
import { IWalletsConnector, MapChainToWalletConnector } from "../_interfaces.js"
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
    [BlockchainEnv.EVM]: EvmPrivateKeyConnectorOptions
    [BlockchainEnv.TEZOS]: TezosPrivateKeyConnectorOptions
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
  private _tez: TezosPrivateKeyConnector
  private _evm: EvmPrivateKeyConnector

  constructor(options: PrivateKeyWalletsConnectorOptions) {
    super()
    this._tez = new TezosPrivateKeyConnector(options.TEZOS, account => {
      this.emit("wallet-changed", {
        env: BlockchainEnv.TEZOS,
        account,
      })
    })
    this._evm = new EvmPrivateKeyConnector(options.EVM, account => {
      this.emit("wallet-changed", {
        env: BlockchainEnv.EVM,
        account,
      })
    })
  }

  public async init() {
    this._tez.init()
    this._evm.init()
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

  public getWalletConnector<Chain extends BlockchainType>(
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
  public updatePrivateKey<E extends BlockchainEnv>(
    chainEnv: BlockchainEnv,
    privateKey: PrivateKeyWalletsConnectorOptions[E]["privateKey"]
  ) {
    const connector = chainEnv === BlockchainEnv.EVM ? this._evm : this._tez
    connector.updatePrivateKey(privateKey as any)
  }
}
