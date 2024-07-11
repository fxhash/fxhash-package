import { type Signer } from "@taquito/taquito"
import { ITezosWalletConnector } from "../_interfaces.js"
import { SocialWalletsFrameManager } from "./FrameManager.js"

export class TezosSocialWalletConnector implements ITezosWalletConnector {
  private _frameManager: SocialWalletsFrameManager

  constructor(frameManager: SocialWalletsFrameManager) {
    this._frameManager = frameManager
  }

  public getWallet() {
    return frameManagerTezosSigner(this._frameManager)
  }

  public async disconnect() {
    const res = await this._frameManager.logout()
    if (res.isFailure()) throw res.error
  }

  async init() {}
  public release() {}
}

/**
 * Given an active Frame Manager instance, returns a Signer object which can be
 * used by `@taquito` to sign operations.
 * @param frameManager Active Frame Manager to send request to
 * @returns A `@taquito` signer
 */
function frameManagerTezosSigner(
  frameManager: SocialWalletsFrameManager
): Signer {
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
