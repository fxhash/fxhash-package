import { JwtAccessTokenPayload, invariant } from "@fxhash/shared"
import { IAuthenticationStrategy } from "./interfaces.js"
import { refreshAccessToken } from "../index.js"
import { jwtDecode } from "jwt-decode"
import { Authenticator } from "../Authenticator.js"

/**
 * JWT Authentication requires storing the refresh token in the storage, as well
 * as including a Bearer token on every request.
 */
export const JWTAuthenticationStrategy: IAuthenticationStrategy<{
  accessToken: string
  refreshToken: string
}> = {
  async recover(data, authenticator) {
    if (!data?.refreshToken || !data?.accessToken) return false
    this.onSuccess(data, authenticator.gql)
    return true
  },

  getStoredAuthentication: (accessToken, refreshToken) => {
    // both tokens need to be stored
    return {
      accessToken,
      refreshToken,
    }
  },

  onSuccess: (credentials, gql) => {
    gql.updateRequestHeaders({
      authorization: `Bearer: ${credentials.accessToken}`,
    })
  },

  async refreshAuthentication(authenticator) {
    try {
      const account = await authenticator.getAccountFromStorage()
      invariant(account, "No account authenticated")
      invariant(account.authentication.refreshToken, "No refresh token")
      const { refreshToken } = account.authentication

      const credentials = await refreshAccessToken(
        { refreshToken },
        { gqlClient: authenticator.gql.client() }
      )

      const { id } = jwtDecode<JwtAccessTokenPayload>(credentials.accessToken)

      await authenticator.storage.setItem(Authenticator.accountKey, {
        id,
        authentication: this.getStoredAuthentication(
          credentials.accessToken,
          credentials.refreshToken
        ),
      })
      authenticator.authenticated = true

      this.onSuccess(credentials, authenticator.gql)
      await authenticator.getProfile()

      return true
    } catch (err: any) {
      console.error("Refresh authentication failed")
      console.log(err)
      return false
    }
  },

  getLogoutPayload: data => ({
    refreshToken: data.refreshToken,
  }),
}
