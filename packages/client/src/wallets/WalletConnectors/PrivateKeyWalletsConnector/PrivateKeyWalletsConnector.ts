import { BlockchainType } from "@fxhash/shared"
import { IWalletsConnector, MapChainToWalletConnector } from "../_interfaces.js"
import {
  BlockchainEnv,
  WConn_WalletChangedEvent,
  WConn_WalletsConnectorReady,
  WalletsConnectorEventTarget,
} from "../events.js"
import {
  EvmPrivateKeyConnector,
  EvmPrivateKeyConnectorOptions,
} from "./EVMPrivateKeyConnector.js"
import {
  TezosPrivateKeyConnector,
  TezosPrivateKeyConnectorOptions,
} from "./TezosPrivateKeyConnector.js"

export type PrivateKeyWalletsConnectorOptions = {
  [E in BlockchainEnv]: {
    [BlockchainEnv.EVM]: EvmPrivateKeyConnectorOptions
    [BlockchainEnv.TEZOS]: TezosPrivateKeyConnectorOptions
  }[E]
}

export class PrivateKeyWalletsConnector
  extends WalletsConnectorEventTarget
  implements IWalletsConnector
{
  private _tez: TezosPrivateKeyConnector
  private _evm: EvmPrivateKeyConnector

  constructor(options: PrivateKeyWalletsConnectorOptions) {
    super()
    this._tez = new TezosPrivateKeyConnector(options.TEZOS, account => {
      this.dispatchTypedEvent(
        "wallet-changed",
        new WConn_WalletChangedEvent(BlockchainEnv.TEZOS, { account })
      )
    })
    this._evm = new EvmPrivateKeyConnector(options.EVM, account => {
      this.dispatchTypedEvent(
        "wallet-changed",
        new WConn_WalletChangedEvent(BlockchainEnv.EVM, { account })
      )
    })
  }

  public async init() {
    this._tez.init()
    this._evm.init()
    this.dispatchTypedEvent("ready", new WConn_WalletsConnectorReady())
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

  public updatePrivateKey<E extends BlockchainEnv>(
    chainEnv: BlockchainEnv,
    privateKey: PrivateKeyWalletsConnectorOptions[E]["privateKey"]
  ) {
    const connector = chainEnv === BlockchainEnv.EVM ? this._evm : this._tez
    connector.updatePrivateKey(privateKey as any)
  }
}
