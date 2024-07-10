import { IWalletInfo, WalletEventEmitter } from "../_interfaces.js"
import { InMemorySigner } from "@taquito/signer"
import { TezosPrivateKeyWallet } from "./_interfaces.js"

type Options = {
  privateKey?: string
}
export function tezosPrivateKeyWallet({
  privateKey,
}: Options): TezosPrivateKeyWallet {
  const emitter = new WalletEventEmitter()
  let _pk: string | null = null
  let _signer: InMemorySigner | null = null
  let _info: IWalletInfo<string> | null = null

  const updatePrivateKey = async (pk: string | null) => {
    const prev = _pk
    if (pk) {
      _pk = pk
      _signer = new InMemorySigner(_pk)
      _info = {
        address: await _signer.publicKeyHash(),
      }
    } else {
      _pk = null
      _signer = null
      _info = null
    }
    if (prev !== _pk) {
      emitter.emit("wallet-changed", _info)
    }
  }

  return {
    emitter,

    init: async () => {
      if (privateKey) await updatePrivateKey(privateKey)
    },

    getWallet: () => {
      if (!_signer) {
        throw new Error("todo better error handling !!!")
      }
      return _signer
    },

    getInfo: () => _info,

    disconnect: async () => {
      updatePrivateKey(null)
    },

    updatePrivateKey,
  }
}

export type TezosPrivateKeyWalletOptions = Options
