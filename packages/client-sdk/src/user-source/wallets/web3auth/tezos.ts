import { type Signer } from "@taquito/taquito"
import { WalletEventEmitter } from "../_interfaces.js"
import { type Web3AuthFrameManager } from "./FrameManager.js"
import { type TezosWeb3AuthWallet } from "./_interfaces.js"
import { b58cencode, getPkhfromPk, prefix } from "@taquito/utils"
import { invariant } from "@fxhash/shared"

type Options = Web3AuthFrameManager

export function tezosWeb3AuthWallet(
  frameManager: Options
): TezosWeb3AuthWallet {
  const emitter = new WalletEventEmitter()
  let _address: string | null = null

  const _updateAddress = (address: string | null) => {
    if (address !== _address) {
      _address = address
      emitter.emit(
        "wallet-changed",
        address
          ? {
              address,
            }
          : null
      )
    }
  }

  return {
    emitter,

    getWallet: () => {
      invariant(_address, "no tezos wallet available")
      return frameManagerTezosSigner(frameManager)
    },

    updateSession: details => {
      _updateAddress(
        details
          ? getPkhfromPk(
              b58cencode(
                details.providerDetails.compressedPublicKey.replace("0x", ""),
                prefix.sppk
              )
            )
          : null
      )
    },

    getInfo: () =>
      _address
        ? {
            address: _address,
          }
        : null,

    disconnect: async () => {
      const res = await frameManager.logout()
      if (res.isFailure()) throw res.error
    },

    init: async () => {},
    release: () => {},

    requirements: () => ({
      userInput: true,
    }),
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
