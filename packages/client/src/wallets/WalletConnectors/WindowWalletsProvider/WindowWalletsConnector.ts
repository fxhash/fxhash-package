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

import { EIP1193Connector } from "./EIP1193Connector.js"
import { IWalletsConnector, MapChainToWalletConnector } from "../interfaces.js"
import { TZIP10Connector } from "./TZIP10Connector.js"
import { BlockchainType } from "@fxhash/shared"

export class WindowWalletsConnector implements IWalletsConnector {
  private tezos: TZIP10Connector
  private evm: EIP1193Connector

  constructor() {
    this.tezos = new TZIP10Connector()
    this.evm = new EIP1193Connector()
  }

  async init() {}

  supportsChain(chain: BlockchainType) {
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
        return this.evm
      case BlockchainType.TEZOS:
        return this.tezos as any
    }

    // for TS to oblige
    throw null
  }
}
