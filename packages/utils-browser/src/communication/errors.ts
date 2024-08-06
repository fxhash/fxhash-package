export class IframeRequestTimeoutError extends Error {
  name = "IframeRequestTimeoutError" as const
}

export class IframeDisconnectedError extends Error {
  name = "IframeDisconnectedError" as const
}

export type IframeBDError = IframeRequestTimeoutError | IframeDisconnectedError
