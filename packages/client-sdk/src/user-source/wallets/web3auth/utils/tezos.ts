import { type Signer } from "@taquito/taquito"
import { type Web3AuthFrameManager } from "../FrameManager.js"
import { type IWeb3AuthWalletUtil } from "../_interfaces.js"
import { b58cencode, getPkhfromPk, prefix } from "@taquito/utils"
import { BlockchainNetwork } from "@fxhash/shared"
import { type IWalletConnected, type IWalletInfo } from "@/index.js"
import { createTezosWalletManager } from "../../common/_private.js"

type Options = Web3AuthFrameManager

export function tezosWeb3AuthWallet(
  frameManager: Options
): IWeb3AuthWalletUtil<BlockchainNetwork.TEZOS> {
  let _connected: IWalletConnected<BlockchainNetwork.TEZOS> | null = null

  const _updateAddress = (address: string | null) => {
    if (!address) {
      _connected = null
      return
    }

    const info: IWalletInfo<BlockchainNetwork.TEZOS> = {
      address,
    }

    _connected = {
      info,
      manager: createTezosWalletManager({
        info,
        source: {
          signer: frameManagerTezosSigner(frameManager),
        },
      }),
    }
  }

  return {
    getWalletConnected: () => _connected,
    update: details => {
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
