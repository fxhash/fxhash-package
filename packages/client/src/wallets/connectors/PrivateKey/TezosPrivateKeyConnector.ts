import { ITezosWalletConnector } from "../_interfaces.js"
import { InMemorySigner } from "@taquito/signer"
import { ITezosAccountDetails } from "../events.js"

type AccountChangeHandler = (account: ITezosAccountDetails | null) => void

export type TezosPrivateKeyConnectorOptions = {
  privateKey?: string | null
}

export class TezosPrivateKeyConnector implements ITezosWalletConnector {
  private _privateKey: string | null = null
  private _signer: InMemorySigner | null = null
  private _onChange?: AccountChangeHandler

  constructor(
    options: TezosPrivateKeyConnectorOptions,
    onChange: AccountChangeHandler
  ) {
    this.updatePrivateKey(options.privateKey)
    // important set this value after calling updatePrivateKey, because we only
    // want to trigger the onChange event when init() is called, otherwise
    // event will be emitted at instanciation which we don't want
    this._onChange = onChange
  }

  init() {
    this._emitOnChange()
  }

  getWallet() {
    if (!this._signer) {
      throw new Error("todo better error handling !!!")
    }
    return this._signer
  }

  public updatePrivateKey(key?: string | null) {
    const prev = this._privateKey

    if (key) {
      this._privateKey = key
      this._signer = new InMemorySigner(key)
    } else {
      this._privateKey = null
      this._signer = null
    }

    if (prev !== this._privateKey) {
      this._emitOnChange()
    }
  }

  private _emitOnChange() {
    if (!this._onChange) return
    if (!this._signer) {
      this._onChange(null)
    } else {
      this._signer.publicKeyHash().then(pkh => {
        this._onChange?.({
          address: pkh,
        })
      })
    }
  }
}
