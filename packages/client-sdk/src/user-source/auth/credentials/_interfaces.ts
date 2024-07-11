import { AuthenticationResult, LogoutInput } from "@fxhash/gql"
import { Storage } from "@/index.js"
import { PromiseResult } from "@fxhash/shared"
import { StoredAccount } from "../_interfaces.js"

export class CredentialsRefreshError extends Error {
  name = "CredentialsRefreshError"
}

/**
 * A CredentialsDriver implements a set of utilities/hooks for tuning up the
 * authentication flow based on various requirements.
 */
export interface ICredentialsDriver<
  Credentials extends Record<string, string> = Record<string, string>,
> {
  /**
   * Some credentials have been successfully generated (or receovered), need to
   * apply those on the modules which need credentials applied (ex http fetcher)
   */
  apply: (credentials: AuthenticationResult) => void

  /**
   * Are the credentials (which have been recovered at a different stage of
   * the (re)connection flow) of a valid structure ?
   */
  validate: (authData: Credentials) => boolean

  /**
   * Returns a seriazable object which should be stored for further retrieval
   * as required to reconstruct the authentication state of the user without
   * having to go through the whole authentication process again.
   */
  getStoredAuthentication: (
    accessToken: string,
    refreshToken: string
  ) => Credentials

  /**
   * This function will be called once when authentication fails although it
   * shouldn't, as maybe some credentials need some refreshing.
   * @returns Newly generated credentials (or null in case of failure)
   */
  refresh: (
    storage: Storage
  ) => PromiseResult<StoredAccount<Credentials>, CredentialsRefreshError>

  /**
   * Will be called upon logout request to craft the payload which will be sent
   * to the backend. Based on the Authentication Strategy we may want to
   * provide different inputs to the backend.
   */
  getLogoutPayload: (data: Credentials) => LogoutInput

  /**
   * Will be called when all the credentials should be cleared.
   */
  clear: () => Promise<void>
}
