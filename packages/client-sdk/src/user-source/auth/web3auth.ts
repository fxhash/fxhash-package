import { JwtAccessTokenPayload, failure, success } from "@fxhash/shared"
import {
  IAccountSourceCommonOptions,
  IWeb3AuthAccountSource,
} from "./_interfaces.js"
import { UserSourceEventEmitter } from "../_interfaces.js"
import { intialization } from "@fxhash/utils"
import { accountUtils } from "./common.js"
import { authenticateWeb3Auth } from "./_index.js"
import { jwtDecode } from "jwt-decode"

type Options = IAccountSourceCommonOptions

/**
 * Module exposing account management as well as authentication
 */
export function authWeb3Auth({
  gqlWrapper: gql,
  storage,
  credentialsDriver,
}: Options): IWeb3AuthAccountSource {
  const emitter = new UserSourceEventEmitter()
  const init = intialization()
  const _account = accountUtils({
    emitter,
    storage,
    gql,
    credentialsDriver,
  })

  const authenticate: IWeb3AuthAccountSource["authenticate"] =
    async payload => {
      init.assertFinished()

      try {
        const credentials = await authenticateWeb3Auth(payload, {
          gqlClient: gql.client(),
        })
        const { accessToken, refreshToken } = credentials
        const { id } = jwtDecode<JwtAccessTokenPayload>(accessToken)

        // store user ID in storage, and some additionnal data based on the
        // authentication payload received.
        await _account.store({
          id,
          credentials: credentialsDriver.getStoredAuthentication(
            accessToken,
            refreshToken
          ),
        })

        // eventually apply effects of the authentication strategy
        credentialsDriver.apply(credentials)
        // fetch user account, should be authenticated
        const account = await _account.sync()
        return success(account)
      } catch (err) {
        // todo: better authentication error (clean plz baptiste)
        return failure(new Error("todo"))
      }
    }

  return {
    emitter,
    getAccount: _account.get,
    authenticated: _account.authenticated,
    authenticate,
    logoutAccount: _account.logoutAccount,
    initialized: () => init.finished,

    init: async () => {
      init.start()
      await _account.reconnectFromStorage()
      init.finish()
    },

    getWalletManagers: () => null,
    disconnectWallet: async () => {},
    disconnectAllWallets: async () => {},
  }
}
