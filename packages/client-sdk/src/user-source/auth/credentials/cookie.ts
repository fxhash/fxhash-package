import { failure } from "@fxhash/shared"
import {
  CredentialsRefreshError,
  type ICredentialsDriver,
} from "./_interfaces.js"

/**
 * Cookie authentication doesn't really need any kind of processing as cookies
 * are automatically injected by browsers in the request, and are automatically
 * refreshed by the backend.
 */
export const CookieCredentialsStrategy: ICredentialsDriver<{}> = {
  apply: () => {},
  // by default, recovery is successful — only a request can tell if it worked
  validate: () => true,
  getStoredAuthentication: () => ({}),
  // by default a refresh fails — cookie should be automatically refreshed on
  // every request
  refresh: async () => failure(new CredentialsRefreshError()),
  // no way to refresh the cookie authentication, just return false (failure)
  getLogoutPayload: () => ({}),
  clear: async () => {},
}
