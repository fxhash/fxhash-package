import { failure } from "@fxhash/utils"
import { type ICredentialsDriver } from "./_interfaces.js"
import { CredentialsRefreshError } from "@/index.js"
import { config } from "@fxhash/config"

function getHost(url: string) {
  return new URL(url).host.split(".").slice(-2).join(".")
}

const envApiHost = getHost(config.apis.hasura)

/**
 * Cookie authentication doesn't really need any kind of processing as cookies
 * are automatically injected by browsers in the request, and are automatically
 * refreshed by the backend.
 */
export const cookieCredentials = (): ICredentialsDriver<{}> => {
  if (typeof window === "undefined" || typeof window.location === "undefined") {
    console.warn("Cookie credentials should only be used in a browser context.")
  } else {
    if (envApiHost !== getHost(location.href)) {
      console.warn(
        `Cookies can only be used on ${envApiHost} domains. JWT credentials should be used instead.`
      )
    }
  }

  return {
    name: "cookie",
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
}
