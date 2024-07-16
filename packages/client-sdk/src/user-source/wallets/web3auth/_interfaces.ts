import { Hex } from "viem"
import {
  ICommonWallet,
  IEvmWallet,
  ITezosWallet,
  IWalletsSource,
} from "../_interfaces.js"
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

/**
 * Some generic session details, currently only used for Web3Auth sessions.
 * This type should be extended with unions following the same structure.
 */
export type SessionDetails = {
  /**
   * The Auth Provider is a string identifying the authentication solution
   * which is used for managing the wallet.
   */
  provider: "web3auth"

  /**
   * Any extra info provided by the auth provided which may be used by
   * consumers if needed.
   */
  providerDetails: {
    compressedPublicKey: Hex
    idToken: string
  }
}

/**
 * Type of the messages (payload, response) between the main context and the
 * Web3Auth iframe.
 */
export type Web3AuthFrameMessageTypes = {
  "host->frame": {
    /**
     * Request to initialize the wallet. If already initialized, resolves
     * immediately.
     */
    init: {
      req: void
      res: void
    }

    /**
     * Request the current session details to the wallet frame.
     */
    getSessionDetails: {
      req: void
      res: SessionDetails | null
    }

    logout: {
      req: any
      res: any
    }

    login: {
      req: Web3AuthLoginPayload
      res: SessionDetails | null
    }

    tez_sign: {
      req: {
        op: string
        magicByte?: Uint8Array
      }
      res: {
        bytes: string
        sig: string
        prefixSig: string
        sbytes: string
      }
    }

    "tez__pub-key": {
      req: void
      res: string
    }

    tez__pkh: {
      req: void
      res: string
    }

    "evm__sign-message": {
      req: {
        chain: "ETHEREUM" | "BASE"
        message: string
      }
      res: string
    }

    "evm__sign-transaction": {
      req: any
      res: any
    }
  }

  "frame->host": {
    /**
     * The frame makes a request to the host to hide/show the iframe. The host
     * should oblige, as such a request is usually made because there's a need
     * for some user input or the need to display important information to
     * display to user.
     */
    showFrame: {
      /**
       * Whether the iframe should be displayed or not.
       */
      req: boolean
      res: void
    }
  }
}
