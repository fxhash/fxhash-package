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

// errors related to the initialization of the frame
export type Web3AuthFrameInitializationError =
  | Web3AuthFrameNotLoading
  | Web3AuthFrameNotResponding

// all errors related to the <iframe>
export type Web3AuthFrameError = Web3AuthFrameInitializationError

// all the module errors
export type Web3AuthError = Web3AuthFrameError
