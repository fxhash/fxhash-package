import { NoWalletConnectedError, SignMessageError } from "./wallets-source.js"

export class CredentialsRefreshError extends Error {
  name = "CredentialsRefreshError" as const
}

export class Web3AuthNoSessionConnectedError extends Error {
  name = "Web3AuthNoSessionConnectedError" as const
}

export class Web3AuthInvalidProviderError extends Error {
  name = "Web3AuthInvalidProviderError" as const
}

export type Web3AuthAuthenticationError =
  | Web3AuthNoSessionConnectedError
  | Web3AuthInvalidProviderError

export type SigningAuthenticationError =
  | NoWalletConnectedError
  | SignMessageError

export type TAuthenticationError =
  | Web3AuthAuthenticationError
  | SigningAuthenticationError

export class AuthenticationError extends Error {
  name = "AuthenticationError" as const
  constructor(error: TAuthenticationError) {
    super(error.message)
    this.cause = error
  }
}
