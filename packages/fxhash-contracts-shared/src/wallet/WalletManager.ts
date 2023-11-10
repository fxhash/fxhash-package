import { PromiseResult, success } from "../Result"
import { TContractOperation } from "./ContractOperation"
import { WalletCache } from "./WalletCache"

export class PendingSigningRequestError extends Error {
  name = "PendingSigningRequestError" as const
  message = "There is already a pending signing request"
}

export class UserRejectedError extends Error {
  name = "UserRejectedError" as const
  message = "User rejected the request"
}

export type SignMessageOptions = {
  /**
   * An string-identifier to define the type of the operation. It is used to
   * classify signatures in the cache.
   */
  type: string

  /**
   * - wallet-only: the cache is bypassed and signature must come from wallet
   * - cache-first: the cache is checked first, and if a valid signature is
   *   found it's returned, otherwise the wallet is
   */
  policy: "wallet-only" | "cache-first"
}

export type MessageSigned = {
  signedAt: Date
  message: string
  signature: string
}

export abstract class WalletManager {
  public address: string
  private cache = WalletCache

  constructor(address: string) {
    this.address = address
  }

  /**
   * Must be implemented by wallets for custom signing of messages.
   * @param message The message to sign.
   * @returns The signature of the message.
   */
  abstract signMessageWithWallet(
    message: string
  ): PromiseResult<string, PendingSigningRequestError | UserRejectedError>

  /**
   * Sign a message using the wallet associated with the manager. Some sign
   * options can be provided, mainly for implementing cache-fetching for
   * avoiding redundant signatures from the wallet.
   *
   * Signatures are stored in cache so that users don't have to repeatedly
   * sign messages for similar operations, as long as messages are considered to
   * be valid for their usage. This function returns a message signed of a
   * given type if it's still valid in cache. A signature is considered valid
   * if it was made less than 4 minutes ago.
   *
   * @remark For now, the cache policy enforces a 5 min cache time for the
   * signatures, after which they are considered invalid. There isn't any way to
   * change this with the current implementation, although it could be added.
   *
   * @param options Sign options, which can be used to determine whether the
   * signature should be fetched from cache or not.
   */
  public signMessage(
    message: string,
    options?: SignMessageOptions
  ): PromiseResult<
    MessageSigned,
    PendingSigningRequestError | UserRejectedError
  > {
    return new Promise(async resolve => {
      // if options allow, get valid signature from the cache
      if (options) {
        const fromCache = this.cache.signedMessageFromCache(
          this.address,
          options
        )
        if (fromCache) return resolve(success(fromCache))
      }
      // sign message with wallet, cache the message and return it
      const res = await this.signMessageWithWallet(message)
      if (res.isFailure()) return resolve(res)
      const messageSigned: MessageSigned = {
        message,
        signature: res.value,
        signedAt: new Date(),
      }
      if (options)
        this.cache.cacheMessageSigned(this.address, messageSigned, options)
      return resolve(success(messageSigned))
    })
  }

  abstract sendTransaction<TParams>(
    operation: TContractOperation<TParams>,
    params: TParams
  ): PromiseResult<unknown, PendingSigningRequestError | UserRejectedError>

  // todo: add waitForTransaction abstract method
}
