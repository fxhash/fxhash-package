export class Web3AuthFrameNotLoading extends Error {
  name = "Web3AuthFrameNotLoading" as const
  constructor(url: string, error: string | Event) {
    const _error = typeof error === "string" ? error : error.type
    super(
      `The Social Wallets iframe (at "${url}") could not be loaded. The following error was retured: ${_error}`
    )
  }
}

export class Web3AuthFrameNotResponding extends Error {
  name = "Web3AuthFrameNotResponding" as const
  constructor(url: string) {
    super(
      `The Social Wallets iframe (at "${url}") is not responding to requests`
    )
  }
}

export class Web3AuthFrameNotInitialized extends Error {
  name = "Web3AuthFrameNotInitialized" as const
  constructor() {
    super(`The web3auth <iframe> hasn't been initialized while it should have`)
  }
}

// errors related to the initialization of the frame
export type Web3AuthFrameInitializationError =
  | Web3AuthFrameNotInitialized
  | Web3AuthFrameNotLoading
  | Web3AuthFrameNotResponding

// all errors related to the <iframe>
export type Web3AuthFrameError = Web3AuthFrameInitializationError

// all the module errors
export type Web3AuthError = Web3AuthFrameError

export class Web3AuthFrameAuthenticationError extends Error {
  name = "Web3AuthFrameAuthenticationError" as const
  message = "An error occurred when attempting to authenticate on Web3Auth"
}

export class Web3AuthFrameFxhashAuthenticationError extends Error {
  name = "Web3AuthFrameFxhashAuthenticationError" as const
  message = "an error occurre when attempting to authenticate on fxhash"
}

export class Web3AuthFrameUnsupportedError extends Error {
  name = "Web3AuthFrameUnsupportedError" as const
}

export class Web3AuthFrameLogoutFailedError extends Error {
  name = "Web3AuthFrameLogoutFailedError" as const
}

export class Web3AuthInitializationFailedError extends Error {
  name = "Web3AuthInitializationFailedError" as const
}

export class Web3AuthFrameUnknownError extends Error {
  name = "Web3AuthFrameUnknownError" as const
}

export type Web3AuthFrameResponseErrors = {
  init: Web3AuthInitializationFailedError
  getSessionDetails: Web3AuthFrameAuthenticationError
  login:
    | Web3AuthFrameAuthenticationError
    | Web3AuthFrameFxhashAuthenticationError
    | Web3AuthFrameUnsupportedError
    | Web3AuthFrameUnknownError
  logout: Web3AuthFrameLogoutFailedError
}
