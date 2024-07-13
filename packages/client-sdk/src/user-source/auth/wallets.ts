import { UserSourceEventEmitter } from "../_index.js"
import {
  IAccountSourceCommonOptions,
  IWalletsAccountSource,
} from "./_interfaces.js"
import { BlockchainNetwork, networkToChain } from "@fxhash/shared"
import { type EthereumWalletManager } from "@fxhash/eth"
import {
  BlockchainType,
  JwtAccessTokenPayload,
  PromiseResult,
  failure,
  invariant,
  success,
} from "@fxhash/shared"
import { type TezosWalletManager } from "@fxhash/tez"
import { AuthenticationResult } from "@fxhash/gql"
import { jwtDecode } from "jwt-decode"
import { isEthereumWalletManager, isTezosWalletManager } from "@/util/types.js"
import {
  GetSingleUserAccountResult,
  authenticate as authenticateWithChallenge,
  generateChallenge,
} from "./_index.js"
import { SignMessageError } from "@/util/Error.js"
import { intialization } from "@fxhash/utils"
import { accountUtils } from "./common.js"

type Options = IAccountSourceCommonOptions

/**
 * Provides some authentication utilities for WalletManager interfaces.
 */
export function authWallets({
  gqlWrapper: gql,
  storage,
  credentialsDriver,
}: Options): IWalletsAccountSource {
  const emitter = new UserSourceEventEmitter()
  const init = intialization()
  const _account = accountUtils({
    emitter,
    storage,
    gql,
    credentialsDriver,
  })

  /**
   * Performs a full authentication flow using the provided WalletManager.
   * - generate a challenge for the blockchain of the wallet
   * - sign the challenge text message with WalletManager
   * - authenticate user against backend using challenge+signature
   * - forward credentials to CredentialsStrategy for them to be handled
   * - fetch account using authenticated query
   * - return account
   *
   * @param manager A WalletManager ready to sign a message.
   *
   * @returns Account on success, error on failure. (Note: the account is also
   * stored and managed internally, application don't have to rely on the value
   * returned by this function to manager the account state.)
   */
  const authenticate = async (
    manager: TezosWalletManager | EthereumWalletManager
  ): PromiseResult<GetSingleUserAccountResult, SignMessageError> => {
    init.assertFinished()

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

      const { accessToken, refreshToken } = credentials
      const { id } = jwtDecode<JwtAccessTokenPayload>(accessToken)

      // store user ID in storage, as well as some additionnal data based on the
      // authentication payload we received.
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
      console.log(err)
      // todo: better authentication error (clean plz baptiste)
      return failure(new Error("todo"))
    }
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
      await _account.reconnectFromStorage()
      init.finish()
    },

    getWalletManagers: () => null,
    disconnectWallet: async () => {},
    disconnectAllWallets: async () => {},
  }
}
