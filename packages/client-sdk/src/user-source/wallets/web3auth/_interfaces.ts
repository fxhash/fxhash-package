import { Hex } from "viem"
import {
  ICommonWallet,
  IEvmWallet,
  ITezosWallet,
  IWalletsSource,
} from "../_interfaces.js"
import { SessionDetails } from "./FrameManager.js"
import { EventEmitter } from "@fxhash/utils"

export interface ICommonWeb3AuthWallet {
  updateSession: (detais: SessionDetails | null) => void
}

export type CommonWeb3AuthWallet = ICommonWallet & ICommonWeb3AuthWallet
export type EvmWeb3AuthWallet = IEvmWallet & ICommonWeb3AuthWallet
export type TezosWeb3AuthWallet = ITezosWallet & ICommonWeb3AuthWallet

export interface IWeb3AuthWalletsSource extends IWalletsSource {
  login: (payload: Web3AuthLoginPayload) => Promise<any>
  getWeb3AuthSessionDetails: () => Promise<SessionDetails | null>
}

export interface IWeb3AuthIdentity {
  /**
   * A Web3Auth authentication token obtained after authenticating with Web3Auth
   * Such token will be used to securely validate wallet details using Web3Auth
   * JWKS and validate the public key.
   */
  token: string

  /**
   * A public key in the format EVM compressed public key, which is returned
   * by Web3Auth when going through their authentication flow.
   */
  compressedPublicKey: Hex
}

export type Web3AuthLoginPayload =
  | {
      method: "email"
      options: {
        email: string
      }
    }
  | {
      method: "oauth"
      options: {
        provider: "google" | "apple"
        token: string
      }
    }

export type FrameManagerEventsTypemap = {
  "session-changed": SessionDetails | null
}

export class FrameManagerEventEmitter extends EventEmitter<FrameManagerEventsTypemap> {}
