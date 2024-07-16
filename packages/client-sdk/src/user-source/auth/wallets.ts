import { IWalletsSource, anyActiveManager } from "../_index.js"
import {
  IAccountSourceCommonOptions,
  IWalletsAccountSource,
} from "./_interfaces.js"
import { BlockchainNetwork, networkToChain } from "@fxhash/shared"
import {
  JwtAccessTokenPayload,
  failure,
  invariant,
  success,
} from "@fxhash/shared"
import { type TezosWalletManager } from "@fxhash/tez"
import { jwtDecode } from "jwt-decode"
import { isEthereumWalletManager, isTezosWalletManager } from "@/util/types.js"
import {
  authenticate as authenticateWithChallenge,
  generateChallenge,
} from "./_index.js"
import { SignMessageError } from "@/util/Error.js"
import { authWithWallets } from "./common.js"

type Options = {
  wallets: IWalletsSource
} & IAccountSourceCommonOptions

const DEFAULT_STORAGE_NAMESPACE = "wallets"

/**
 * Provides account authentication using some wallets as a source. This module
 * will hook to `wallets-changed` events emitted by the wallets source to
 * trigger authentication flows, if needed.
 *
 * This module only emits `user-changed`/`error` events, and never propagates
 * `account-changed`/`wallets-changed` events as it checks if account & wallets
 * are in a coherent state before exposing those to the rest of the app.
 */
export function authWallets({
  wallets,
  gqlWrapper: gql,
  storage,
  credentialsDriver,
  storageNamespace,
}: Options): IWalletsAccountSource {
  return authWithWallets({
    wallets,
    gqlWrapper: gql,
    storage,
    credentialsDriver,
    storageNamespace: storageNamespace || DEFAULT_STORAGE_NAMESPACE,

    /**
     * Performs a full authentication flow using the provided WalletManager.
     * - generate a challenge for the blockchain of the wallet
     * - sign the challenge text message with WalletManager
     * - authenticate user against backend using challenge+signature
     * - forward credentials to CredentialsStrategy for them to be handled
     * - fetch account using authenticated query
     * - return account
     *
     * @returns Account on success, error on failure. (Note: the account is also
     * stored and managed internally, application don't have to rely on the value
     * returned by this function to manager the account state.)
     */
    authenticate: async () => {
      // get a wallet manager from the provided wallets
      const managers = wallets.getWalletManagers()
      const manager = anyActiveManager(managers)
      invariant(manager, "no wallet for authentication")

      // derive blockchain env from WalletManager instance
      let network: BlockchainNetwork | null = null
      if (isTezosWalletManager(manager)) network = BlockchainNetwork.TEZOS
      if (isEthereumWalletManager(manager)) network = BlockchainNetwork.ETHEREUM
      invariant(network !== null, "WalletManager is neither tezos/ethereum")

      /**
       * TODOs:
       * * check this flow
       * * should we fetch account here ? and do anything with it ?
       * * should implement mechanism to only have 1 authentication at once (and
       *   maybe a way to cancel current flow if any)
       * * improve error handling, right now we just throw if it fails
       */

      try {
        const challenge = await generateChallenge(
          {
            chain: networkToChain(network),
            address: manager.address,
          },
          {
            gqlClient: gql.client(),
          }
        )
        const signature = await manager.signMessage(challenge.text)

        if (signature.isFailure()) {
          return failure(new SignMessageError())
        }

        const credentials = await authenticateWithChallenge(
          {
            id: challenge.id,
            signature: signature.unwrap().signature,
            publicKey:
              network === BlockchainNetwork.TEZOS
                ? await (manager as TezosWalletManager).getPublicKey()
                : undefined,
          },
          { gqlClient: gql.client() }
        )
        return success(credentials)
      } catch (err) {
        console.log(err)
        // todo: better authentication error (clean plz baptiste)
        return failure(new Error("todo"))
      }
    },
  })
}
