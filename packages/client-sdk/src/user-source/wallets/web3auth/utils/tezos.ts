import {
  WalletProvider,
  type Signer,
  WalletTransferParams,
} from "@taquito/taquito"
import { type Web3AuthFrameManager } from "../FrameManager.js"
import {
  TezosWalletRpcEndpoint,
  type IWeb3AuthWalletUtil,
} from "../_interfaces.js"
import { b58cencode, getPkhfromPk, prefix } from "@taquito/utils"
import { BlockchainNetwork, Result } from "@fxhash/shared"
import { type IWalletConnected, type IWalletInfo } from "@/index.js"
import { createTezosWalletManager } from "../../common/_private.js"
import { bytesToHex } from "viem"
import {
  BeaconError,
  BeaconErrorType,
  BeaconMessageType,
} from "@airgap/beacon-sdk"

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
          // todo: type WalletProvider properly
          wallet: frameManagerTezosWalletProvider(frameManager) as any,
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

function frameManagerTezosWalletProvider(
  frameManager: Web3AuthFrameManager
): WalletProvider {
  const notSupported = async () => {
    throw Error("NOT_SUPPORTED")
  }

  const getAccount = async () => {
    const res = await frameManager.sendRequest({
      type: "tez__rpc",
      body: {
        method: "tez_getAccount",
      },
    })
    if (res.isFailure()) throw res.error
    return res.unwrap() as TezosWalletRpcEndpoint<"tez_getAccount">["res"]
  }

  return {
    getPKH: async () => (await getAccount()).publicKeyHash,

    getPK: async () => (await getAccount()).publicKey,

    sendOperations: async params => {
      const res = await frameManager.sendRequest({
        type: "tez__rpc",
        body: {
          method: "tez_sendOperations",
          params,
        },
      })
      if (res.isSuccess()) {
        const response =
          res.value as TezosWalletRpcEndpoint<"tez_sendOperations">["res"]
        if (response.type === BeaconMessageType.OperationResponse) {
          return response.transactionHash
        }
        throw BeaconError.getError(response.errorType, null)
      }
      throw res.error
    },

    sign: async (bytes, watermark) => {
      const res = await frameManager.sendRequest({
        type: "tez__rpc",
        body: {
          method: "tez_sign",
          params: {
            bytes,
            watermark: watermark ? bytesToHex(watermark) : undefined,
          },
        },
      })
      console.log(res)
      if (res.isSuccess()) {
        const response = res.value as TezosWalletRpcEndpoint<"tez_sign">["res"]
        if (response.type === BeaconMessageType.SignPayloadResponse) {
          return response.signature
        }
        throw BeaconError.getError(response.errorType, null)
      }
      throw res.error
    },

    mapTransferParamsToWalletParams: async params => params(),
    mapOriginateParamsToWalletParams: async params => params,
    mapDelegateParamsToWalletParams: async params => params,
    mapIncreasePaidStorageWalletParams: async params => params,

    // note: comment this out to support new taquito version
    // mapTransferTicketParamsToWalletParams: notSupported,
    // mapStakeParamsToWalletParams: notSupported,
    // mapUnstakeParamsToWalletParams: notSupported,
    // mapFinalizeUnstakeParamsToWalletParams: notSupported,
  }
}

/**
 * Given an active Frame Manager instance, returns a Signer object which can be
 * used by `@taquito` to sign operations.
 * @param frameManager Active Frame Manager to send request to
 * @returns A `@taquito` signer
 */
// function frameManagerTezosSigner(frameManager: Web3AuthFrameManager): Signer {
//   return {
//     sign: async (op: string, magicByte?: Uint8Array) => {
//       const res = await frameManager.sendRequest({
//         type: "tez_sign",
//         body: { op, magicByte },
//       })
//       if (res.isSuccess()) return res.unwrap()
//       throw res.error
//     },

//     publicKey: async (): Promise<string> => {
//       const res = await frameManager.sendRequest({ type: "tez__pub-key" })
//       if (res.isSuccess()) return res.unwrap()
//       throw res.error
//     },

//     publicKeyHash: async (): Promise<string> => {
//       const res = await frameManager.sendRequest({ type: "tez__pkh" })
//       if (res.isSuccess()) return res.unwrap()
//       throw res.error
//     },

//     secretKey: (): Promise<string | undefined> => {
//       throw Error(`secret key is not exposed`)
//     },
//   }
// }
