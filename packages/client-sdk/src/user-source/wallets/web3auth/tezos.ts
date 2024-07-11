import { type Signer } from "@taquito/taquito"
import { WalletEventEmitter } from "../_interfaces.js"
import { type Web3AuthFrameManager } from "./FrameManager.js"
import { type TezosWeb3AuthWallet } from "./_interfaces.js"

type Options = Web3AuthFrameManager

export function tezosWeb3AuthWallet(
  frameManager: Options
): TezosWeb3AuthWallet {
  return {
    // todo: instanciate signer when available, and get pkh from it
    // then just get it from there
    getWallet: () => frameManagerTezosSigner(frameManager),

    // todo: need a way to know when a wallet is available from iframe ?
    // hook to some Frame Events ?
    // function exposed for the parent to manually call ?
    getInfo: () => ({
      address: "",
    }),

    disconnect: async () => {
      const res = await frameManager.logout()
      if (res.isFailure()) throw res.error
    },

    // to comply to the interface, but it can never emit
    emitter: new WalletEventEmitter().mute(),
    init: async () => {},
    release: () => {},
  }
}

/**
 * Given an active Frame Manager instance, returns a Signer object which can be
 * used by `@taquito` to sign operations.
 * @param frameManager Active Frame Manager to send request to
 * @returns A `@taquito` signer
 */
function frameManagerTezosSigner(frameManager: Web3AuthFrameManager): Signer {
  return {
    sign: async (op: string, magicByte?: Uint8Array) => {
      const res = await frameManager.sendRequest({
        type: "tez_sign",
        body: { op, magicByte },
      })
      if (res.isSuccess()) return res.unwrap()
      throw res.error
    },

    publicKey: async (): Promise<string> => {
      const res = await frameManager.sendRequest({ type: "tez__pub-key" })
      if (res.isSuccess()) return res.unwrap()
      throw res.error
    },

    publicKeyHash: async (): Promise<string> => {
      const res = await frameManager.sendRequest({ type: "tez__pkh" })
      if (res.isSuccess()) return res.unwrap()
      throw res.error
    },

    secretKey: (): Promise<string | undefined> => {
      throw Error(`secret key is not exposed`)
    },
  }
}
