import { IAuthenticationStrategy } from "./interfaces.js"

/**
 * Cookie authentication doesn't really need any kind of processing as cookies
 * are automatically injected by browsers in the request, and are automatically
 * refreshed by the backend.
 */
export const CookieAuthenticationStrategy: IAuthenticationStrategy<{}> = {
  // by default, recovery is successful — only a request can tell if it worked
  recover: async () => true,
  getStoredAuthentication: () => ({}),
  onSuccess: () => {},
  // no way to refresh the cookie authentication, just return false (failure)
  refreshAuthentication: async () => false,
  getLogoutPayload: () => ({}),
}
