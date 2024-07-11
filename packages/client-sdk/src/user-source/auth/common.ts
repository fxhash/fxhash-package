import { Storage } from "@/index.js"
import { config as fxConfig } from "@fxhash/config"
import { StoredAccount } from "./_interfaces.js"

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
