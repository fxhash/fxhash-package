import { BlockchainType, failure, success } from "@fxhash/shared"
import { IEvmWalletConnector } from "../_interfaces.js"
import { BlockchainNotSupported, EvmClientsNotAvailable } from "../errors.js"
import { chainDefinitions } from "../_index.js"
import {
  type Hex,
  createPublicClient,
  http,
  createWalletClient,
  PrivateKeyAccount,
} from "viem"
import { config } from "@fxhash/config"
import { privateKeyToAccount } from "viem/accounts"
import { sepolia } from "viem/chains"
import { IEvmAccountDetails } from "../events.js"

type AccountChangeHandler = (account: IEvmAccountDetails | null) => void

export type EvmPrivateKeyConnectorOptions = {
  privateKey?: Hex | null
}

export class EvmPrivateKeyConnector implements IEvmWalletConnector {
  private _pk: Hex | null = null
  private _account: PrivateKeyAccount | null = null
  private _onAccountChange?: AccountChangeHandler

  constructor(
    options: EvmPrivateKeyConnectorOptions,
    onAccountChange: AccountChangeHandler
  ) {
    this.updatePrivateKey(options.privateKey)
    // important set this value after calling updatePrivateKey, because we only
    // want to trigger the onChange event when init() is called, otherwise
    // event will be emitted at instanciation which we don't want
    this._onAccountChange = onAccountChange
  }

  public init() {
    this._onAccountChange?.(this._account)
  }

  public async getClients(blockchain: BlockchainType) {
    if (blockchain === BlockchainType.TEZOS) {
      return failure(new BlockchainNotSupported(blockchain))
    }
    if (!this._pk || !this._account) {
      return failure(new EvmClientsNotAvailable())
    }

    const chain = chainDefinitions[blockchain] as typeof sepolia
    const transport = http(config.eth.apis.rpcs[0])
    const publicClient = createPublicClient({
      chain,
      transport,
    })
    const walletClient = createWalletClient({
      account: this._account,
      chain,
      transport,
    })

    if (!walletClient || !publicClient) {
      throw new Error("TODO error handling — undefined wallet/public client")
    }

    return success({
      public: publicClient,
      wallet: walletClient,
    })
  }

  public getAccount() {
    return this._account
      ? {
          address: this._account.address,
        }
      : null
  }

  public updatePrivateKey(privateKey?: Hex | null) {
    const prev = this._pk
    if (privateKey) {
      this._pk = privateKey
      this._account = privateKeyToAccount(this._pk)
    } else {
      this._pk = null
      this._account = null
    }

    if (prev !== this._pk) {
      this._onAccountChange?.(this._account)
    }
  }

  public async disconnect() {
    this.updatePrivateKey(null)
  }
}
