import { isRichErrorMessages } from "../utils/rich-error.js"
import { RichError, RichErrorUnion, IRichErrorMessages } from "./common.js"

export class WalletAPIRpcUnknownNetworkError extends RichError {
  name = "WalletApiRpcHealthError" as const

  constructor(messages: IRichErrorMessages)
  constructor(network: string)
  constructor(par: IRichErrorMessages | string) {
    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `Could not check rpc health for network: ${par}`,
            user: "Rpc health check failed",
          }
    )
  }
}

export class WalletAPIInvalidRequestError extends RichError {
  name = "WalletAPIInvalidRequestError" as const

  constructor(messages: IRichErrorMessages)
  constructor(
    validationErrors?: Array<{ path: (string | number)[]; message: string }>
  )
  constructor(
    par?:
      | IRichErrorMessages
      | Array<{ path: (string | number)[]; message: string }>
  ) {
    const details = Array.isArray(par)
      ? `\nValidation errors:\n${par
          .map(err => `  - ${err.path.join(".")}: ${err.message}`)
          .join("\n")}`
      : ""

    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `Invalid operation request payload.${details}`,
            user: "Invalid request. Please check your input and try again.",
          }
    )
  }
}

export class WalletAPIFetchError extends RichError {
  name = "WalletAPIFetchError" as const

  constructor(messages: IRichErrorMessages)
  constructor(
    url: string,
    statusCode: number,
    attempt: number,
    maxRetries: number
  )
  constructor(
    par: IRichErrorMessages | string,
    statusCode?: number,
    attempt?: number,
    maxRetries?: number
  ) {
    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `Request to ${par} failed (status: ${statusCode}) on attempt ${attempt}/${maxRetries}`,
            user: "Failed to fetch required data. Please try again later.",
          }
    )
  }
}

export class WalletAPIFetchTimeoutError extends RichError {
  name = "WalletAPIFetchTimeoutError" as const

  constructor(messages: IRichErrorMessages)
  constructor(url: string, maxRetries: number, finalError: unknown)
  constructor(
    par: IRichErrorMessages | string,
    maxRetries?: number,
    finalError?: unknown
  ) {
    const errorMessage =
      finalError instanceof Error ? finalError.message : String(finalError)

    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `Request to ${par} failed after ${maxRetries} retries. Final error: ${errorMessage}`,
            user: "Service temporarily unavailable. Please try again later.",
          }
    )
  }
}

export class WalletAPIInvalidURLError extends RichError {
  name = "WalletAPIInvalidURLError" as const

  constructor(messages: IRichErrorMessages)
  constructor(url: string)
  constructor(par: IRichErrorMessages | string) {
    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `Invalid URL provided: ${par}`,
            user: "Invalid request URL configuration.",
          }
    )
  }
}

export const WalletAPIErrors: (
  | typeof WalletAPIRpcUnknownNetworkError
  | typeof WalletAPIInvalidRequestError
  | typeof WalletAPIFetchError
  | typeof WalletAPIFetchTimeoutError
  | typeof WalletAPIInvalidURLError
)[] = [
  WalletAPIRpcUnknownNetworkError,
  WalletAPIInvalidRequestError,
  WalletAPIFetchError,
  WalletAPIFetchTimeoutError,
  WalletAPIInvalidURLError,
]
export type WalletAPIError = RichErrorUnion<typeof WalletAPIErrors>
