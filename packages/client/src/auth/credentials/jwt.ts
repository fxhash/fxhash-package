import { JwtAccessTokenPayload, invariant } from "@fxhash/shared"
import { ICredentialsStrategy } from "./_interfaces.js"
import { refreshAccessToken } from "../index.js"
import { jwtDecode } from "jwt-decode"
import { Authenticator } from "../Authenticator.js"

export type JWTCredentials = {
  accessToken: string
  refreshToken: string
}

/**
 * JWT Authentication requires storing the refresh token in the storage, as well
 * as including a Bearer token on every request.
 */
export const JWTCredentialsStrategy: ICredentialsStrategy<JWTCredentials> = {
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
      invariant(account.credentials.refreshToken, "No refresh token")
      const { refreshToken } = account.credentials

      const credentials = await refreshAccessToken(
        { refreshToken },
        { gqlClient: authenticator.gql.client() }
      )

      const { id } = jwtDecode<JwtAccessTokenPayload>(credentials.accessToken)

      await authenticator.storage.setItem(Authenticator.accountStorageKey, {
        id,
        authentication: this.getStoredAuthentication(
          credentials.accessToken,
          credentials.refreshToken
        ),
      })
      await authenticator.syncAccount()
      this.onSuccess(credentials, authenticator.gql)

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

  clear: async authenticator => {
    authenticator.gql.removeRequestHeader("authorization")
  },
}
