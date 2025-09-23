import { JwtAccessTokenPayload } from "@fxhash/shared"
import { failure, invariant, success } from "@fxhash/utils"
import { ICredentialsDriver, JWTCredentials } from "./_interfaces.js"
import { refreshAccessToken } from "../_index.js"
import { jwtDecode } from "jwt-decode"
import { CredentialsRefreshError, IGraphqlWrapper } from "@/index.js"

/**
 * JWT Authentication requires storing the refresh token in the storage, as well
 * as including a Bearer token on every request.
 *
 * @singleton Only the first IGraphQLWrapper will be injected, as other calls
 * to this function will return the result of the first call.
 */
export const jwtCredentials = (
  gql: IGraphqlWrapper
): ICredentialsDriver<JWTCredentials> => {
  /**
   * To apply the credentials, simply set the Bearer header on the gql wrapper.
   */
  const apply: ICredentialsDriver["apply"] = credentials => {
    gql.updateRequestHeaders({
      authorization: `Bearer ${credentials.accessToken}`,
    })
  }

  const getStoredAuthentication: ICredentialsDriver<JWTCredentials>["getStoredAuthentication"] =
    (accessToken, refreshToken) => ({
      accessToken,
      refreshToken,
    })

  return {
    name: "jwt",
    apply,
    getStoredAuthentication,

    validate: creds => !!(creds?.refreshToken && creds?.accessToken),

    async refresh(account) {
      try {
        invariant(account.credentials.refreshToken, "No refresh token")
        const { refreshToken } = account.credentials
        const credentials = await refreshAccessToken(
          { refreshToken },
          { gqlClient: gql.client() }
        )
        const { id } = jwtDecode<JwtAccessTokenPayload>(credentials.accessToken)
        return success({ id, credentials })
      } catch (err: any) {
        console.error("Refresh authentication failed")
        console.log(err)
        return failure(new CredentialsRefreshError())
      }
    },

    getLogoutPayload: data => ({
      refreshToken: data.refreshToken,
    }),

    clear: async () => {
      gql.removeRequestHeader("authorization")
    },
  }
}
