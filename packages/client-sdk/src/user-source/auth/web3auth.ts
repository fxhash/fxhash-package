import { JwtAccessTokenPayload, failure, success } from "@fxhash/shared"
import {
  IAccountSourceCommonOptions,
  IWeb3AuthAccountSource,
} from "./_interfaces.js"
import { UserSourceEventEmitter } from "../_interfaces.js"
import { cleanup, intialization } from "@fxhash/utils"
import { accountUtils } from "./common.js"
import { authenticateWeb3Auth } from "./_index.js"
import { jwtDecode } from "jwt-decode"
import {
  AccountAuthenticatedButNoWalletConnectedError,
  IWeb3AuthWalletsSource,
} from "../_index.js"
import { reconciliationState } from "../utils/user-reconciliation.js"

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
  const emitter = new UserSourceEventEmitter()
  const init = intialization()
  const clean = cleanup()
  const _account = accountUtils({
    storage,
    gql,
    credentialsDriver,
    storageNamespace: storageNamespace || DEFAULT_STORAGE_NAMESPACE,
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

  const _reconciliate = () => {
    const account = _account.get()
    const managers = wallets.getWalletManagers()
    console.log("_reconciliate")
    console.log({ account, managers })
    const res = reconciliationState(account, managers)
    console.log({ _reconciliate: res })
    if (res.isSuccess()) {
      emitter.emit("user-changed")
    } else {
      if (res.error instanceof AccountAuthenticatedButNoWalletConnectedError) {
        _account.logoutAccount()
        return
      }

      // some error not handlded at this level
      emitter.emit("error", res.error)
    }
  }

  const _hookEvents = () => {
    clean.add(
      wallets.emitter.on("wallets-changed", async () => {
        // here get payload for authenticating
        console.log("todo: get payload, authenticate with payload")

        // // when wallet is connected, but no account is authenticated, we start
        // // authentication process
        // if (anyManager && !_account.get()) {
        //   const result = await authenticate()
        //   if (result.isFailure()) {
        //     console.log(result.error)
        //     wallets.disconnectAllWallets()
        //     return
        //   }
        // }

        // // otherwise run the reconciliation
        // _reconciliate()
      }),

      // when account changes, run state reconciliation
      _account.emitter.on("account-changed", () => {
        _reconciliate()
      })
    )
  }

  return {
    emitter,
    getAccount: _account.get,
    authenticate,
    authenticated: () => !!_account.get,
    initialized: () => init.finished,
    logoutAccount: _account.logoutAccount,

    /**
     * Should be called when the application starts to retrieve credentials from
     * the storage, synchronize user state with the backend (eventually by
     * refreshing the credentials if needed), to get to a stable state with
     * regards to the authentication.
     */
    init: async () => {
      init.start()
      await Promise.all([wallets.init(), _account.reconnectFromStorage()])
      _reconciliate()
      _hookEvents()
      init.finish()
    },

    release: () => {
      clean.clear()
      wallets.release?.()
    },

    getWalletManagers: wallets.getWalletManagers,
    disconnectWallet: wallets.disconnectWallet,
    disconnectAllWallets: wallets.disconnectAllWallets,
  }
}
