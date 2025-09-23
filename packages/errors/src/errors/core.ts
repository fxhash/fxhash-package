import { isRichErrorMessages } from "../utils/rich-error.js"
import { IRichErrorMessages, RichError, RichErrorUnion } from "./common.js"

export class WalletSourceRequestConnectionRejectedError extends RichError {
  name = "WalletSourceRequestConnectionRejectedError" as const
  messages = {
    dev: "The connection request was rejected by the user",
    user: "It looks like you've rejected the connection request - if you didn't mean to, please try again",
  }
}

export class WalletSourceRequestConnectionUnknownError extends RichError {
  name = "WalletSourceRequestConnectionUnknownError" as const

  constructor(messages: IRichErrorMessages)
  constructor(network: string)
  constructor(par: IRichErrorMessages | string) {
    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `An unknown error occurred while requesting a connection: ${par}`,
            user: "An unknown error occurred while trying to connect to your wallet - please try again",
          }
    )
  }
}

export class WalletSourceRequestConnectionWalletNotAvailableError extends RichError {
  name = "WalletSourceRequestConnectionWalletNotAvailableError" as const

  constructor(messages: IRichErrorMessages)
  constructor(network: string)
  constructor(par: IRichErrorMessages | string) {
    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `The wallet source for ${par} is not available`,
            user: "An unknown error occurred while trying to connect to your wallet - please try again",
          }
    )
  }
}

export const WalletSourceRequestConnectionErrors: (
  | typeof WalletSourceRequestConnectionRejectedError
  | typeof WalletSourceRequestConnectionUnknownError
  | typeof WalletSourceRequestConnectionWalletNotAvailableError
)[] = [
  WalletSourceRequestConnectionRejectedError,
  WalletSourceRequestConnectionUnknownError,
  WalletSourceRequestConnectionWalletNotAvailableError,
]
export type WalletSourceRequestConnectionError = RichErrorUnion<
  typeof WalletSourceRequestConnectionErrors
>

export class NoWalletConnectedForNetworkError extends RichError {
  name = "NoWalletConnectedForNetworkError" as const

  constructor(messages: IRichErrorMessages)
  constructor(network: string)
  constructor(par: IRichErrorMessages | string) {
    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `${par} - No wallet is connected to the client`,
            user: "A wallet needs to be connected before performing this action",
          }
    )
  }
}
