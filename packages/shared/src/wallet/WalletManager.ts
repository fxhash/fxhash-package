import { PromiseResult, success } from "../Result"
import { BlockchainType, TContractOperation } from "./ContractOperation"
import { WalletCache } from "./WalletCache"

export class PendingSigningRequestError extends Error {
  name = "PendingSigningRequestError" as const
  message = "There is already a pending signing request"
}

export enum WalletConnectionErrorReason {
  INCORRECT_CHAIN = "INCORRECT_CHAIN",
}

export class WalletConnectionError extends Error {
  name = "WalletConnectionError" as const

  constructor(readonly reason: WalletConnectionErrorReason) {
    super(`Wallet connection failed due to ${reason} error`)
  }
}

export class UserRejectedError extends Error {
  name = "UserRejectedError" as const
  message = "User rejected the request"
}

export class InsufficientFundsError extends Error {
  name = "InsufficientFundsError" as const
  message =
    "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
}

export class TransactionRevertedError extends Error {
  name = "TransactionRevertedError" as const
  errorName: string

  constructor(readonly paramErrorName: string) {
    super(`Transaction reverted with error: ${paramErrorName}`)
    this.errorName = paramErrorName
  }
}

export class TransactionReceiptError extends Error {
  name = "TransactionReceiptError" as const

  constructor() {
    super(
      `Failed to locate transaction - please check for pending transactions in your wallet before resubmitting.`
    )
  }
}

export class TransactionUnknownError extends Error {
  name = "TransactionUnknownError" as const
  errorName?: string

  constructor(readonly paramErrorName?: string) {
    super(
      paramErrorName ||
        `An unknown error occurred waiting for transaction - please check for pending transactions in your wallet before resubmitting.`
    )
    this.errorName = paramErrorName
  }
}

export class NetworkError extends Error {
  name = "NetworkError" as const
  message = "Network error"
}

export class BadRequestError extends Error {
  name = "BadRequestError" as const
  message = "Bad request"
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
  ): PromiseResult<
    string,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >

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
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
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
    operation: TContractOperation<this, TParams, any>,
    params: TParams,
    chain: BlockchainType
  ): PromiseResult<
    unknown,
    | WalletConnectionError
    | PendingSigningRequestError
    | UserRejectedError
    | InsufficientFundsError
    | TransactionRevertedError
    | TransactionUnknownError
  >

  abstract waitForTransaction(params: {
    hash: string
    // TODO proper error type
  }): PromiseResult<
    unknown,
    | UserRejectedError
    | TransactionRevertedError
    | TransactionReceiptError
    | TransactionUnknownError
  >
}

// a generic type for ContractOperation polymorphism
export type TWalletManager = new (address: string) => WalletManager
