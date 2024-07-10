export class SocialWalletsFrameNotLoading extends Error {
  name = "SocialWalletsFrameNotLoading"
  constructor(url: string, error: string | Event) {
    const _error = typeof error === "string" ? error : error.type
    super(
      `The Social Wallets iframe (at "${url}") could not be loaded. The following error was retured: ${_error}`
    )
  }
}

export class SocialWalletsFrameNotResponding extends Error {
  name = "SocialWalletsFrameNotResponding"
  constructor(url: string) {
    super(
      `The Social Wallets iframe (at "${url}") is not responding to requests`
    )
  }
}

// errors related to the initialization of the frame
export type SocialWalletsFrameInitializationError =
  | SocialWalletsFrameNotLoading
  | SocialWalletsFrameNotResponding

// all errors related to the <iframe>
export type SocialWalletsFrameError = SocialWalletsFrameInitializationError

// all the module errors
export type SocialWalletsError = SocialWalletsFrameError
