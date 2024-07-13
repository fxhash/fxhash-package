import {
  GetSingleUserAccountResult,
  ICredentialsDriver,
  IGraphqlWrapper,
  Storage,
  UserSourceEventEmitter,
  getMyProfile,
  logout,
} from "@/index.js"
import { config as fxConfig } from "@fxhash/config"
import { StoredAccount } from "./_interfaces.js"
import { invariant } from "@fxhash/shared"

/**
 * The key which will be used to store the account data.
 */
export const ACCOUNT_STORAGE_KEY = `fxhash.${fxConfig.config.envName}.account`

/**
 * Read the Storage to retrieve an account potentially stored there, and return
 * it. This function ensures the returned payload is in the right format,
 * otherwise it resets the storage account key.
 * @returns Account stored in storage solution, or null if none
 */
export async function getAccountFromStorage(
  storage: Storage
): Promise<StoredAccount | null> {
  const account = await storage.getItem(ACCOUNT_STORAGE_KEY)
  if (!account) return null
  // return account if data is valid
  if (isStoredAccountValid(account)) {
    return account
  }
  // somehow the storage was compromised, as the value doesn't
  await storage.removeItem(ACCOUNT_STORAGE_KEY)
  return null
}

function isStoredAccountValid(account: any): account is StoredAccount {
  return !!account && typeof account.id === "string"
}

type AccountUtilsOptions = {
  emitter: UserSourceEventEmitter
  storage: Storage
  gql: IGraphqlWrapper
  credentialsDriver: ICredentialsDriver<any>
}

/**
 * Abstracts some generic account-handling utilities.
 */
export function accountUtils({
  emitter,
  storage,
  gql,
  credentialsDriver,
}: AccountUtilsOptions) {
  let _account: GetSingleUserAccountResult | null = null

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
    const account = await getAccountFromStorage(storage)
    invariant(account, "No account authenticated")
    const res = await getMyProfile({ gqlClient: gql.client() })
    update(res)
    return res
  }

  /**
   * Cleanup of the storage & properties of the authentication state
   */
  const cleanup = async () => {
    await storage.removeItem(ACCOUNT_STORAGE_KEY)
    await credentialsDriver.clear()
    update(null)
  }

  const store = async (account: StoredAccount) =>
    storage.setItem(ACCOUNT_STORAGE_KEY, account)

  const refreshCredentials = async () => {
    try {
      const res = await credentialsDriver.refresh(storage)
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
    const account = await getAccountFromStorage(storage)
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
    const account = await getAccountFromStorage(storage)
    invariant(account, "no account authenticated")
    await logout(credentialsDriver.getLogoutPayload(account.credentials), {
      gqlClient: gql.client(),
    })
    cleanup()
  }

  return {
    get: () => _account,
    authenticated: () => !!_account,
    update,
    sync,
    cleanup,
    store,
    reconnectFromStorage,
    logoutAccount: _logout,
  }
}
