import { Hex } from "viem"
import {
  GetWalletInfo,
  IWalletsSource,
  MapNetworkToWalletManager,
} from "../_interfaces.js"
import { EventEmitter } from "@fxhash/utils"
import { Web3AuthEmailRequestOtpOutput } from "@fxhash/gql"
import { BlockchainNetwork } from "@fxhash/shared"

export interface IWeb3AuthWalletUtil<Net extends BlockchainNetwork> {
  update: (detais: SessionDetails | null) => void
  getWalletManager: () => MapNetworkToWalletManager<Net> | null
  getInfo: GetWalletInfo<Net>
}

export interface IWeb3AuthWalletsSource extends IWalletsSource {
  /**
   * Login the Web3Auth wallet using the provided credentials.
   *
   * @param payload login payload
   */
  login: (payload: Web3AuthLoginPayload) => Promise<any>

  /**
   * Request a OTP for a given email. The OTP will be sent to the email and
   * will be valid for roughly 5 minutes. The OTP can then be used to login to
   * Web3Auth
   *
   * @param email Email to which the OTP should be sent
   */
  emailRequestOTP: (email: string) => Promise<Web3AuthEmailRequestOtpOutput>

  /**
   * @returns The current Web3Auth session details.
   */
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
        /**
         * Email to authenticate with.
         */
        email: string
        /**
         * OTP which was requested on fxhash backend for the provided email.
         */
        otp: string
      }
    }
  | {
      method: "oauth"
      options: {
        /**
         * String-id of the provider which was used to generate the oauth token
         */
        provider: "google" | "discord"
        /**
         * OAuth JWT token returned by the provider. This token will be checked
         * on fxhash backend to ensure it is safe.
         */
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
