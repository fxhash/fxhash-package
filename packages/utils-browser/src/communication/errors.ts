import {
  IRichErrorMessages,
  RichError,
  RichErrorUnion,
  UnexpectedRichError,
  UnexpectedRichErrorMessages,
  isRichErrorMessages,
} from "@fxhash/errors"

export class IframeRequestTimeoutError extends RichError {
  name = "IframeRequestTimeoutError" as const
  messages = {
    dev: "Request to the <iframe> has timed out.",
    user: "Unexpected error",
  }
}

export class IframeDisconnectedError extends RichError {
  name = "IframeDisconnectedError" as const
  messages = {
    dev: "Connection between main context and <iframe> has been lost.",
    user: "Unexpected error",
  }
}

export class ConnectionAlreadyEstablishedError extends RichError {
  name = "ConnectionAlreadyEstablishedError" as const
  messages = {
    dev: "Connection with <iframe> has already been established, but a new connection request was received. There must be only a single handshake at initialisation.",
    user: "Unexpected error",
  }
}

export class IframeUnsupportedRequestError extends RichError {
  name = "IframeUnsupportedRequestError" as const

  constructor(requested: string)
  constructor(messages: IRichErrorMessages)
  constructor(par1: string | IRichErrorMessages) {
    super(
      isRichErrorMessages(par1)
        ? par1
        : {
            dev: `The request "${par1}" is not supported by the embedded Iframe.`,
            user: UnexpectedRichErrorMessages.user,
          }
    )
  }
}

export const IframeBDErrors: (
  | typeof IframeRequestTimeoutError
  | typeof IframeDisconnectedError
  | typeof ConnectionAlreadyEstablishedError
  | typeof IframeUnsupportedRequestError
  | typeof UnexpectedRichError
)[] = [
  IframeRequestTimeoutError,
  IframeDisconnectedError,
  ConnectionAlreadyEstablishedError,
  IframeUnsupportedRequestError,
  UnexpectedRichError,
]

export type IframeBDError = RichErrorUnion<typeof IframeBDErrors>

export type WithIframeErrors<T> =
  | (T extends RichError ? T : never)
  | IframeBDError
