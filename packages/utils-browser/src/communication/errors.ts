import { IEquatableError } from "@fxhash/utils"

export class IframeRequestTimeoutError extends Error {
  name = "IframeRequestTimeoutError" as const
}

export class IframeDisconnectedError extends Error {
  name = "IframeDisconnectedError" as const
}

export class ConnectionAlreadyEstablishedError extends Error {
  name = "ConnectionAlreadyEstablishedError" as const
  constructor(origin: string) {
    super(
      `connection with host at ${origin} has already been established, but a new connection request was received. There must be only a single handshake at initialisation.`
    )
  }
}

export type SerializableResponseError = {
  name: string
  message?: string
}

interface IResponseEquatableError extends IEquatableError {
  message?: string
}

export class ResponseError<
  Cause extends IResponseEquatableError = IResponseEquatableError,
> extends Error {
  name = "ResponseError" as const
  cause: Cause

  constructor(cause: Cause) {
    super()
    this.cause = cause
  }

  toSeriazable(): SerializableResponseError {
    return {
      name: this.cause.name,
      message: this.cause.message,
    }
  }

  static Parse(error: SerializableResponseError): ResponseError {
    return new ResponseError(error)
  }

  static Unknown(cause: any) {
    return new ResponseError({
      name: "UnknownError",
      message: cause?.message,
    })
  }
}

export type IframeBDError =
  | IframeRequestTimeoutError
  | IframeDisconnectedError
  | ConnectionAlreadyEstablishedError
