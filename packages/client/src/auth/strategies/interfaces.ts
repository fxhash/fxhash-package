import { AuthenticationResult, LogoutInput } from "@fxhash/gql"
import { Authenticator } from "../Authenticator.js"
import { IGraphqlWrapper } from "@/client/GraphqlWrapper.js"

export enum AuthenticationStrategy {
  JWT = "JWT",
  COOKIE = "COOKIE",
}

/**
 * An AuthenticationStrategy implements a set of utilities/hooks for tuning up
 * the authentication flow of the Authenticator based on various requirements.
 */
export interface IAuthenticationStrategy<
  AuthData extends Record<string, {}> = Record<string, {}>,
> {
  /**
   * Perform any
   */
  recover: (
    authData: AuthData,
    authenticator: Authenticator
  ) => Promise<boolean>

  /**
   * Returns a seriazable object which should be stored for further retrieval
   * as required to reconstruct the authentication state of the user without
   * having to go through the whole authentication process again.
   */
  getStoredAuthentication: (
    accessToken: string,
    refreshToken: string
  ) => AuthData

  /**
   * Will be called upon logout request to craft the payload which will be sent
   * to the backend. Based on the Authentication Strategy we may want to
   * provide different inputs to the backend.
   */
  getLogoutPayload: (data: AuthData) => LogoutInput

  /**
   * This function will be called once when authentication fails although it
   * shouldn't, as maybe some credentials need some refreshing.
   * @returns TRUE if refresh is a success, FALSE otherwise
   */
  refreshAuthentication: (authenticator: Authenticator) => Promise<boolean>

  /**
   * This hook will be called after the authentication has succeeded and can
   * perform various operations required for the authentication strategy to
   * work properly.
   */
  onSuccess: (credentials: AuthenticationResult, gql: IGraphqlWrapper) => void
}
