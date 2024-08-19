import { TypeOfRichError, isRichErrorMessages } from ".."
import {
  IRichErrorMessages,
  RichError,
  RichErrorUnion,
  UnexpectedRichErrorMessages,
} from "./common"

export class Web3AuthFrameNotLoading extends RichError {
  name = "Web3AuthFrameNotLoading" as const

  constructor(url: string, error: string | Event)
  constructor(messages: IRichErrorMessages)
  constructor(par1: string | IRichErrorMessages, error?: string | Event) {
    const _error = error
      ? typeof error === "string"
        ? error
        : error.type
      : "/"
    super(
      isRichErrorMessages(par1)
        ? par1
        : {
            dev: `Fxhash embedded wallet iframe (at "${par1}") could not be loaded. The following error was retured: ${_error}`,
            user: "Fxhash embedded wallet has not loaded",
          }
    )
  }
}

export class Web3AuthFrameNotResponding extends RichError {
  name = "Web3AuthFrameNotResponding" as const

  constructor(url: string) {
    super({
      dev: `Fxhash embedded wallet iframe (at "${url}") is not responding to requests`,
      user: "Fxhash embedded wallet is not responding",
    })
  }
}

export class Web3AuthFrameNotInitialized extends RichError {
  name = "Web3AuthFrameNotInitialized" as const
  messages = {
    dev: "Fxhash embedded wallet <iframe> hasn't been initialized while it should have",
    user: "Fxhash embedded wallet wasn't initialized",
  }
}

// errors related to the initialization of the frame
export type Web3AuthFrameInitializationError =
  | Web3AuthFrameNotInitialized
  | Web3AuthFrameNotLoading
  | Web3AuthFrameNotResponding

export class Web3AuthFrameAuthenticationError extends RichError {
  name = "Web3AuthFrameAuthenticationError" as const
  messages = {
    dev: "An error occurred when attempting to authenticate on Web3Auth",
    user: "Authentication error",
  }
}

export class Web3AuthFrameFxhashAuthenticationError extends RichError {
  name = "Web3AuthFrameFxhashAuthenticationError" as const
  messages = {
    dev: "An error occurred when attempting to authenticate on fxhash",
    user: "Authentication error",
  }
}

export class Web3AuthFrameLogoutFailedError extends RichError {
  name = "Web3AuthFrameLogoutFailedError" as const
  messages = {
    dev: "Logout failed. This is likely an issue on fxhash end.",
    user: "Could not logout your account. Please try again.",
  }
}

export class Web3AuthInitializationFailedError extends RichError {
  name = "Web3AuthInitializationFailedError" as const
  messages = {
    dev: "Web3Auth initialization failed, as such the embedded wallet cannot be constructed and used. If this issue persists, please raise it on Github.",
    user: "Could not initialize embedded wallet.",
  }
}

export class Web3AuthFrameUnknownError extends RichError {
  name = "Web3AuthFrameUnknownError" as const
  messages = {
    dev: "An unexpected error was raised using Web3Auth",
    user: UnexpectedRichErrorMessages.user,
  }
}

export const Web3AuthFrameErrors = {
  init: [Web3AuthInitializationFailedError],
  getSessionDetails: [Web3AuthFrameAuthenticationError],
  login: [
    Web3AuthFrameAuthenticationError,
    Web3AuthFrameFxhashAuthenticationError,
    Web3AuthFrameUnknownError,
  ],
  logout: [Web3AuthFrameLogoutFailedError],
}

export type Web3AuthFrameError = {
  [K in keyof typeof Web3AuthFrameErrors]: RichErrorUnion<
    (typeof Web3AuthFrameErrors)[K]
  >
}

export type AllWeb3AuthFrameError = TypeOfRichError<
  Web3AuthFrameError[keyof Web3AuthFrameError]
>
export const AllWeb3AuthFrameErrors =
  Array<AllWeb3AuthFrameError>().concat.apply(
    [],
    Object.values(Web3AuthFrameErrors) as any
  )
