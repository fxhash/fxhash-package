import { type IWalletsSource } from "../_index.js"
import {
  type IAccountSourceCommonOptions,
  type IWalletsAccountSource,
} from "./_interfaces.js"
import {
  BlockchainNetwork,
  PromiseResult,
  networkToChain,
} from "@fxhash/shared"
import { failure, invariant, success } from "@fxhash/shared"
import { type TezosWalletManager } from "@fxhash/tez"
import { isEthereumWalletManager, isTezosWalletManager } from "@/util/types.js"
import {
  JWTCredentials,
  authenticate as authenticateWithChallenge,
  generateChallenge,
} from "./_index.js"
import { authWithWallets } from "./common.js"
import { anyActiveManager } from "../wallets/common/utils.js"
import {
  NoWalletConnectedError,
  GraphQLError,
  UnexpectedError,
  SignMessageError,
  SigningAuthenticationError,
} from "@/index.js"

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
     * stored and managed internally, application don't have to rely on the
     * value returned by this function to manager the account state.)
     */
    authenticate: async (): PromiseResult<
      JWTCredentials,
      SigningAuthenticationError | GraphQLError | UnexpectedError
    > => {
      // get a wallet manager from the provided wallets
      const manager = anyActiveManager(wallets.getWallets())
      if (!manager) return failure(new NoWalletConnectedError())

      // derive blockchain env from WalletManager instance
      let network: BlockchainNetwork | null = null
      if (isTezosWalletManager(manager)) network = BlockchainNetwork.TEZOS
      if (isEthereumWalletManager(manager)) network = BlockchainNetwork.ETHEREUM
      invariant(network !== null, "WalletManager is neither tezos/ethereum")

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
      } catch (err: any) {
        if (err instanceof GraphQLError || err instanceof UnexpectedError)
          return failure(err)
        return failure(new UnexpectedError())
      }
    },
  })
}
