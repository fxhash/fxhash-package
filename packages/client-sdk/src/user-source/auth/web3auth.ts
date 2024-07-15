import { JwtAccessTokenPayload, failure, success } from "@fxhash/shared"
import {
  IAccountSourceCommonOptions,
  IWeb3AuthAccountSource,
} from "./_interfaces.js"
import { UserSourceEventEmitter } from "../_interfaces.js"
import { cleanup, intialization } from "@fxhash/utils"
import { accountUtils, authWithWallets } from "./common.js"
import { authenticateWeb3Auth } from "./_index.js"
import { jwtDecode } from "jwt-decode"
import {
  AccountAuthenticatedButNoWalletConnectedError,
  IWeb3AuthWalletsSource,
} from "../_index.js"
import { isUserStateConsistent } from "../utils/user-consistency.js"

type Options = {
  wallets: IWeb3AuthWalletsSource
} & IAccountSourceCommonOptions

const DEFAULT_STORAGE_NAMESPACE = "web3auth"

/**
 * Module exposing account management as well as authentication
 */
export function authWeb3Auth({
  wallets,
  gqlWrapper: gql,
  storage,
  credentialsDriver,
  storageNamespace,
}: Options): IWeb3AuthAccountSource {
  return authWithWallets({
    wallets,
    gqlWrapper: gql,
    storage,
    credentialsDriver,
    storageNamespace: storageNamespace || DEFAULT_STORAGE_NAMESPACE,
    authenticate: async _account => {
      try {
        console.log("authenticate web3auth !")
        const sessionDetails = await wallets.getWeb3AuthSessionDetails()
        if (!sessionDetails) {
          return failure(new Error("no web3auth session details"))
        }
        if (sessionDetails.provider !== "web3auth") {
          return failure(new Error("invalid session provider"))
        }

        const { idToken: token, compressedPublicKey } =
          sessionDetails.providerDetails

        const credentials = await authenticateWeb3Auth(
          {
            token,
            compressedPublicKey,
          },
          {
            gqlClient: gql.client(),
          }
        )
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
    },
  })
}
