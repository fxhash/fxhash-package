import { failure, success } from "@fxhash/shared"
import {
  type IAccountSourceCommonOptions,
  type IWeb3AuthAccountSource,
} from "./_interfaces.js"
import { authWithWallets } from "./common.js"
import { authenticateWeb3Auth } from "./_index.js"
import { type IWeb3AuthWalletsSource } from "../_index.js"

type Options = {
  wallets: IWeb3AuthWalletsSource
} & IAccountSourceCommonOptions

const DEFAULT_STORAGE_NAMESPACE = "web3auth"

const instances: Record<string, boolean> = {}

/**
 * Can be wrapped around `IWeb3AuthWalletsSource` to provide fxhash backend
 * authentication using the web3auth wallet source. This module will ensure
 * consistency between the wallets & the account, eventually exposing user
 * errors when resolution may require user input.
 */
export function authWeb3Auth({
  wallets,
  gqlWrapper: gql,
  storage,
  credentialsDriver,
  storageNamespace,
}: Options): IWeb3AuthAccountSource {
  const _storageNamespace = storageNamespace || DEFAULT_STORAGE_NAMESPACE

  // utility warning to catch bad implementations in dev
  if (instances[_storageNamespace]) {
    console.warn(
      "At least 2 instances of authWeb3Auth() have been called with the same storage namespace. This may result in inconsistent behaviours due to storage overrides. This issue should be fixed before releasing to prod."
    )
  }
  instances[_storageNamespace] = true

  return authWithWallets({
    wallets,
    gqlWrapper: gql,
    storage,
    credentialsDriver,
    storageNamespace: _storageNamespace,
    authenticate: async () => {
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
        return success(credentials)
      } catch (err) {
        // todo: better authentication error (clean plz baptiste)
        return failure(new Error("todo"))
      }
    },
  })
}
