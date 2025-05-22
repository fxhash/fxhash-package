import {
  type GetSingleUserAccountResult,
  type ICredentialsDriver,
  type IGraphqlWrapper,
  type IWalletsSource,
  type JWTCredentials,
  type TAuthenticationError,
  AccountAuthenticatedButNoWalletConnectedError,
  UserSourceEventEmitter,
  WalletConnectedButNoAccountAuthenticatedError,
  getMyProfile,
  logout,
  CredentialsRefreshError,
  AuthenticationError,
  type IStorageDriver,
  generateChallenge,
  WalletDoesntBelongAccountError,
} from "@/index.js"
import { config as fxConfig } from "@fxhash/config"
import type {
  IAccountSource,
  IAccountSourceCommonOptions,
  StoredAccount,
} from "./_interfaces.js"
import {
  BlockchainNetwork,
  networkToChain,
  type JwtAccessTokenPayload,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  BlockchainNetworks,
} from "@fxhash/shared"
import {
  type PromiseResult,
  type IEquatableError,
  invariant,
  success,
} from "@fxhash/utils"
import { Init, cleanup, intialization } from "@fxhash/utils"
import { isUserStateConsistent } from "../utils/user-consistency.js"
import { jwtDecode } from "jwt-decode"
import { anyActiveManager } from "../wallets/common/utils.js"
import {
  linkWalletToAccount,
  unlinkWalletFromAccount,
} from "./actions/linking.js"
import type { TezosWalletManager } from "@fxhash/tez"
import { GraphQLErrors, LinkWalletErrors, isErrorOfKind } from "@fxhash/errors"

/**
 * The key which will be used to store the account data.
 */
export const ACCOUNT_STORAGE_KEY = `fxhash.${fxConfig.config.envName}.account`

/**
 * @internal
 * Checkes whether the account fetched from the storage is valid. This ensures
 * the application doesn't work with an invalid value which may have been
 * altered one way or the other since the storage might be shared with other
 * modules.
 */
export function isStoredAccountValid(account: any): account is StoredAccount {
  return (
    !!account &&
    typeof account.id === "string" &&
    typeof account.credentials === "object"
  )
}

export type AccountUtilsOptions = {
  storage: IStorageDriver
  gql: IGraphqlWrapper
  credentialsDriver: ICredentialsDriver<any>
  storageNamespace: string
}

export type AccountUtils = {
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
    if (isStoredAccountValid(account)) return account
    // somehow the storage was compromised, as the value doesn't
    await storage.removeItem(key)
    return null
  }

  const update = (account: GetSingleUserAccountResult | null) => {
    const prev = _account
    _account = account

    // everytime the account is updated, emit event.
    if (prev !== account || prev?.id !== account?.id) {
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
    // @ts-expect-error
    credentialsDriver.apply(account.credentials)
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
      if (res.isFailure()) throw new CredentialsRefreshError()
      const account = res.unwrap()
      await store(account)
      await sync()
    } catch (_) {
      await cleanup()
    }
  }

  /**
   * Attempts to reconnect the account using the account details & credentials
   * stored in the storage.
   */
  const reconnectFromStorage = async () => {
    try {
      const account = await getAccountFromStorage()
      // if there's an account in the storage, then init authentication
      // recovery process, which depends on the authentication strategy
      if (account) {
        try {
          if (!credentialsDriver.validate(account.credentials)) {
            console.error("credentials recovered from storage are invalid")
            throw "invalid credentials in storage"
          }
          // If we can get the profile we are authenticated
          await sync()
        } catch (e) {
          // if a sync error occurs, we may want to try refreshing credentials
          console.log("Error getting profile", e)
          try {
            await refreshCredentials()
          } catch (_) {
            throw "refresh crendentials failed" // triggers cleanup
          }
        }
      } else {
        throw "no account" // triggers cleanup
      }
    } catch (err) {
      await cleanup()
    }
  }

  /**
   * Send a logout query, clear credentials, disconnect all the wallets.
   */
  const _logout = async () => {
    try {
      console.log("logout")
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

export type AuthWithWalletsParams<AuthError extends IEquatableError> =
  IAccountSourceCommonOptions & {
    wallets: IWalletsSource
    storageNamespace: string
    authenticate: () => PromiseResult<JWTCredentials, AuthError>
    supports: {
      // whether wallets should be linked in case they don't belong to account
      linking: boolean
    }
  }

/**
 * Some generic helper providing authentication flows and user coherency when
 * there is some authentication with wallets sources.
 * This will hook on events coming from the wallets source to trigger
 * authentication flows, where the `authenticate()` method is called when needed
 * in the flow.
 */
export function authWithWallets<AuthError extends IEquatableError>({
  wallets: walletsSource,
  gqlWrapper: gql,
  storage,
  credentialsDriver,
  storageNamespace,
  authenticate,
  supports,
}: AuthWithWalletsParams<AuthError>): IAccountSource {
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
    try {
      const credentials = await authenticate()
      if (credentials.isFailure()) throw credentials.error

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

      // fetch user account, should be authenticated
      await _account.sync()
    } catch (err: any) {
      walletsSource.disconnectAllWallets()
      emitter.emit("error", {
        error: new AuthenticationError(err as TAuthenticationError),
      })
    }
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
    const consistency = isUserStateConsistent(account, wallets)
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
        // if we are during the initialization, and wallet doesn't require
        // user input, attempt to automatically connect with the wallet
        if (
          init.state === Init.STARTED &&
          !walletsSource.requirements().userInput
        ) {
          // here events not hooked, so no side-effects triggered
          await _authenticate()
        } else {
          walletsSource.disconnectAllWallets()
        }
        return
      }

      // if we are during the initialization, and wallet doesn't belong to
      // the account, disconnect the wallet and propagate the state
      if (consistency.error instanceof WalletDoesntBelongAccountError) {
        if (init.state === Init.STARTED) {
          const network = consistency.error.network
          const wallet = walletsSource.getWallet(network)
          if (wallet) {
            await walletsSource.disconnectWallet(network)
          }
          emitter.emit("user-changed")
          return
        }
      }

      // some error not handlded at this level
      emitter.emit("error", { error: consistency.error })
    }
  }

  const _hookEvents = () => {
    clean.add(
      walletsSource.emitter.on("wallets-changed", async payload => {
        console.log("wallets have changed !")
        const anyManager = anyActiveManager(walletsSource.getWallets())
        const account = _account.get()

        // when wallet is connected, but no account is authenticated, we start
        // authentication process
        if (anyManager && !account) {
          await _authenticate()
          return
        }

        // if a connected wallet isn't linked to the account, and such account
        // doesn't have a wallet on the given network, link the wallet
        const walletChanged = payload[0]
        if (
          supports.linking &&
          walletChanged &&
          walletChanged.wallet.connected &&
          account &&
          !account.wallets.find(w => w.network === walletChanged.network)
        ) {
          const manager = walletChanged.wallet.connected.manager

          try {
            // todo: handle error (should be RichError at the API level)
            const challenge = await generateChallenge(
              {
                chain: networkToChain(walletChanged.network),
                address: manager.address,
              },
              {
                gqlClient: gql.client(),
              }
            )

            const signature = await manager.signMessage(challenge.text)
            if (signature.isFailure()) {
              throw signature.error
            }

            const linkResult = await linkWalletToAccount({
              id: challenge.id,
              signature: signature.value.signature,
              publicKey:
                walletChanged.network === BlockchainNetwork.TEZOS
                  ? await (manager as TezosWalletManager).getPublicKey()
                  : undefined,
            })
            if (linkResult.isFailure()) {
              throw linkResult.error
            }
          } catch (error: any) {
            console.log("checking whether")
            console.log(error)
            console.log("is in:")
            console.log([
              [
                PendingSigningRequestError,
                UserRejectedError,
                WalletConnectionError,
              ],
              LinkWalletErrors,
              GraphQLErrors,
            ])
            if (
              isErrorOfKind(
                error,
                [
                  PendingSigningRequestError,
                  UserRejectedError,
                  WalletConnectionError,
                ],
                LinkWalletErrors,
                GraphQLErrors
              )
            ) {
              console.log("emitting error")
              emitter.emit("error", { error })
            }
            await walletsSource.disconnectWallet(walletChanged.network)
            return
          } finally {
            console.log("syncing account")
            // this will emit "account-changed"
            await _account.sync()
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
    refetchAccount: _account.sync,
    authenticated: () => !!_account.get(),
    initialized: () => init.finished,
    logoutAccount: _account.logoutAccount,

    unlinkWallet: async address => {
      invariant(
        supports.linking,
        "the wallets of this account source cannot be unlinked from the account"
      )

      const res = await unlinkWalletFromAccount({
        address,
      })
      if (res.isFailure()) return res

      const wallets = walletsSource.getWallets()
      const network = BlockchainNetworks.find(
        net => wallets?.[net]?.connected?.manager.address === address
      )
      if (network) {
        await walletsSource.disconnectWallet(network)
      }

      await _account.sync()
      return success(true)
    },

    /**
     * Should be called when the application starts to retrieve credentials from
     * the storage, synchronize user state with the backend (eventually by
     * refreshing the credentials if needed), to get to a stable state with
     * regards to the authentication.
     */
    init: async () => {
      try {
        init.start()
        await Promise.all([
          walletsSource.init(),
          _account.reconnectFromStorage(),
        ])

        // Note: here it's **very** important that the first reconciliation
        // happens before we hook events, as _reconciliate may trigger some
        // wallet/account event emissions which we don't want to propagate until
        // initialization is finished
        await _reconciliate()
        _hookEvents()

        init.finish()
      } catch (err) {
        throw init.fail(err)
      }
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
