import {
  AccountAuthenticatedButNoWalletConnectedError,
  type GetSingleUserAccountResult,
  type ICredentialsDriver,
  type IGraphqlWrapper,
  type IWalletsSource,
  type JWTCredentials,
  SignMessageError,
  type Storage,
  UserSourceEventEmitter,
  WalletConnectedButNoAccountAuthenticatedError,
  getMyProfile,
  logout,
} from "@/index.js"
import { config as fxConfig } from "@fxhash/config"
import {
  type IAccountSourceCommonOptions,
  type IWalletsAccountSource,
  type StoredAccount,
} from "./_interfaces.js"
import {
  type JwtAccessTokenPayload,
  PromiseResult,
  invariant,
} from "@fxhash/shared"
import { Init, cleanup, intialization } from "@fxhash/utils"
import { isUserStateConsistent } from "../utils/user-consistency.js"
import { jwtDecode } from "jwt-decode"
import { anyActiveManager } from "../wallets/common/utils.js"

/**
 * The key which will be used to store the account data.
 */
export const ACCOUNT_STORAGE_KEY = `fxhash.${fxConfig.config.envName}.account`

function isStoredAccountValid(account: any): account is StoredAccount {
  return !!account && typeof account.id === "string"
}

export type AccountUtilsOptions = {
  storage: Storage
  gql: IGraphqlWrapper
  credentialsDriver: ICredentialsDriver<any>
  storageNamespace: string
}

export type AccountUtils = {
  // todo: only emits account-changed so type should reflect that
  emitter: UserSourceEventEmitter
  get: () => GetSingleUserAccountResult | null
  getAccountFromStorage: () => Promise<StoredAccount | null>
  authenticated: () => boolean
  update: (account: GetSingleUserAccountResult | null) => void
  sync: () => Promise<GetSingleUserAccountResult>
  cleanup: () => Promise<void>
  store: (account: StoredAccount) => Promise<void>
  reconnectFromStorage: () => Promise<void>
  logoutAccount: () => Promise<void>
}

/**
 * Abstracts some generic account-handling utilities.
 */
export function accountUtils({
  storage,
  gql,
  credentialsDriver,
  storageNamespace,
}: AccountUtilsOptions): AccountUtils {
  const emitter = new UserSourceEventEmitter()
  let _account: GetSingleUserAccountResult | null = null

  const _getStorageKey = () => `${ACCOUNT_STORAGE_KEY}:${storageNamespace}`

  /**
   * Read the Storage to retrieve an account potentially stored there, and return
   * it. This function ensures the returned payload is in the right format,
   * otherwise it resets the storage account key.
   * @returns Account stored in storage solution, or null if none
   */
  const getAccountFromStorage = async (): Promise<StoredAccount | null> => {
    const key = _getStorageKey()
    const account = await storage.getItem(key)
    if (!account) return null
    // return account if data is valid
    if (isStoredAccountValid(account)) {
      return account
    }
    // somehow the storage was compromised, as the value doesn't
    await storage.removeItem(key)
    return null
  }

  const update = (account: GetSingleUserAccountResult | null) => {
    const prev = _account
    _account = account

    // everytime the account is updated, emit event.
    if (prev !== account || prev?.id !== account?.id) {
      console.log("update account!")
      console.log({ account })
      emitter.emit("account-changed", { account })
    }
  }

  /**
   * Fetches account using authenticated request, also synchronizes the internal
   * state based on the query response.
   * @note If the account state has changed, a AccountChangedEvent will also be
   * emitted as result
   * @returns Authenticated account (or null if none)
   */
  const sync = async () => {
    const account = await getAccountFromStorage()
    invariant(account, "No account authenticated")
    const res = await getMyProfile({ gqlClient: gql.client() })
    update(res)
    return res
  }

  /**
   * Cleanup of the storage & properties of the authentication state
   */
  const cleanup = async () => {
    await storage.removeItem(_getStorageKey())
    await credentialsDriver.clear()
    update(null)
  }

  const store = (account: StoredAccount) =>
    storage.setItem(_getStorageKey(), account)

  const refreshCredentials = async () => {
    try {
      const accountFromStorage = await getAccountFromStorage()
      invariant(accountFromStorage, "no account to refresh")
      const res = await credentialsDriver.refresh(accountFromStorage)
      if (res.isFailure()) throw null
      const account = res.unwrap()
      await store(account)
      await sync()
      credentialsDriver.apply(account.credentials as any)
    } catch (_) {
      await cleanup()
    }
  }

  /**
   * Attempts to reconnect the account using the account details & credentials
   * stored in the storage.
   */
  const reconnectFromStorage = async () => {
    const account = await getAccountFromStorage()
    // if there's an account in the storage, then init authentication
    // recovery process, which depends on the authentication strategy
    if (account) {
      try {
        if (!credentialsDriver.validate(account.credentials)) {
          console.error("credentials recovered from storage are invalid")
          await cleanup()
          return
        }
        // If we can get the profile we are authenticated
        await sync()
      } catch (e) {
        // if a sync error occurs, we may want to try refreshing credentials
        console.log("Error getting profile", e)
        try {
          await refreshCredentials()
        } catch (_) {}
      }
    }
  }

  /**
   * Send a logout query, clear credentials, disconnect all the wallets.
   */
  const _logout = async () => {
    try {
      const account = await getAccountFromStorage()
      invariant(account, "no account authenticated")
      await logout(credentialsDriver.getLogoutPayload(account.credentials), {
        gqlClient: gql.client(),
      })
      await cleanup()
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  return {
    emitter,
    get: () => _account,
    getAccountFromStorage,
    authenticated: () => !!_account,
    update,
    sync,
    cleanup,
    store,
    reconnectFromStorage,
    logoutAccount: _logout,
  }
}

export type AuthWithWalletsParams = IAccountSourceCommonOptions & {
  wallets: IWalletsSource
  storageNamespace: string
  // todo: type Error union: need clear errors
  authenticate: () => PromiseResult<JWTCredentials, SignMessageError | Error>
}

/**
 * Some generic helper providing authentication flows and user coherency when
 * there is some authentication with wallets sources.
 * This will hook on events coming from the wallets source to trigger
 * authentication flows, where the `authenticate()` method is called when needed
 * in the flow.
 */
export function authWithWallets({
  wallets: walletsSource,
  gqlWrapper: gql,
  storage,
  credentialsDriver,
  storageNamespace,
  authenticate,
}: AuthWithWalletsParams): IWalletsAccountSource {
  const emitter = new UserSourceEventEmitter()
  const init = intialization()
  const clean = cleanup()
  const _account = accountUtils({
    storage,
    gql,
    credentialsDriver,
    storageNamespace,
  })

  const _authenticate = async () => {
    console.log("_authenticate!")
    const credentials = await authenticate()
    // todo: good way to handle errors ?
    if (credentials.isFailure()) {
      console.log(credentials.error)
      throw credentials.error
    }

    const { accessToken, refreshToken } = credentials.unwrap()
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
    credentialsDriver.apply(credentials.value)
    // fetch user account, should be authenticated
    await _account.sync()
  }

  /**
   * Compute the user reconciliation state (are wallets & account in a valid
   * state?) and depending on the outcome either attempts an automatic
   * reconciliation or emit a user error.
   *
   * **Note**: this may trigger events being emitted from account/wallets
   */
  const _reconciliate = async () => {
    const account = _account.get()
    const wallets = walletsSource.getWallets()
    console.log("_reconciliate")
    console.log({ account, wallets })
    const consistency = isUserStateConsistent(account, wallets)
    console.log({ consistency })
    if (consistency.isSuccess()) {
      emitter.emit("user-changed")
    } else {
      if (
        consistency.error instanceof
        AccountAuthenticatedButNoWalletConnectedError
      ) {
        _account.logoutAccount()
        return
      }

      if (
        consistency.error instanceof
        WalletConnectedButNoAccountAuthenticatedError
      ) {
        console.log("going here !!")
        // if we are during the initialization
        if (
          init.state === Init.STARTED &&
          !walletsSource.requirements().userInput
        ) {
          // here events not hooked, so no side-effects triggered
          try {
            console.log("calling authenticate here")
            await _authenticate()
            return
          } catch (err) {
            walletsSource.disconnectAllWallets()
            return
          }
        } else {
          walletsSource.disconnectAllWallets()
          return
        }
      }

      // some error not handlded at this level
      emitter.emit("error", consistency.error)
    }
  }

  const _hookEvents = () => {
    clean.add(
      walletsSource.emitter.on("wallets-changed", async () => {
        const anyManager = anyActiveManager(walletsSource.getWallets())

        // when wallet is connected, but no account is authenticated, we start
        // authentication process
        if (anyManager && !_account.get()) {
          try {
            console.log("trying to connect after login request")
            await _authenticate()
          } catch (err) {
            console.log(err)
            return
          }
        }

        // otherwise run the reconciliation
        _reconciliate()
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
    authenticated: () => !!_account.get(),
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
      await Promise.all([walletsSource.init(), _account.reconnectFromStorage()])

      // Note: here it's **very** important that the first reconciliation
      // happens before we hook events, as _reconciliate may trigger some
      // wallet/account event emissions which we don't want to propagate until
      // initialization is finished
      await _reconciliate()
      _hookEvents()

      init.finish()
    },

    release: () => {
      clean.clear()
      walletsSource.release?.()
    },

    getWallet: walletsSource.getWallet,
    getWallets: walletsSource.getWallets,
    disconnectWallet: walletsSource.disconnectWallet,
    disconnectAllWallets: walletsSource.disconnectAllWallets,
  }
}
