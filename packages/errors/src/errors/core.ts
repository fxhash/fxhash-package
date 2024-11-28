import { isRichErrorMessages } from "../utils/rich-error.js"
import { IRichErrorMessages, RichError } from "./common.js"

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
