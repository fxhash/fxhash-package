import { UserSourceEventEmitter } from "../_index.js"
import { IAccountSource, StoredAccount } from "./_interfaces.js"
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
import { Storage } from "@/util/Storage/Storage.js"
import { ICredentialsDriver } from "./credentials/_index.js"
import { IGraphqlWrapper } from "@/util/GraphqlWrapper.js"
import { isEthereumWalletManager, isTezosWalletManager } from "@/util/types.js"
import {
  GetSingleUserAccountResult,
  authenticate,
  generateChallenge,
  getMyProfile,
  logout,
} from "./_index.js"
import { SignMessageError } from "@/util/Error.js"
import { intialization } from "@fxhash/utils"
import { ACCOUNT_STORAGE_KEY, getAccountFromStorage } from "./common.js"

/**
 * TODOS
 * * event handling
 *  * this should listen to events on wallet changes to auto trigger auth flows
 *  * new `user-changed` event: clean user changed (wallets & account)
 *  * emit events at the right timing
 * * how is refreshing of credentials handled ? RN if token expires, queries
 *   just fails while it should be retried after a refresh of the creds ?
 */

type Options = {
  /**
   * An instance of the GraphQLWrapper used by the rest of the application. The
   * Authenticator may require some headers to be set so that all the gql
   * queries made by the application are authenticated, as such a single
   * instance should be used accross the app.
   */
  gqlWrapper: IGraphqlWrapper

  /**
   * A Storage implementation. Doesn't have to be the same used by the rest of
   * the app.
   */
  storage: Storage

  /**
   * An interface handling authentication credentials (JWT tokens)
   */
  credentialsDriver: ICredentialsDriver
}

export function walletsAuthentication({
  gqlWrapper: gql,
  storage,
  credentialsDriver,
}: Options): IAccountSource {
  const emitter = new UserSourceEventEmitter()
  const init = intialization()
  let _account: GetSingleUserAccountResult | null = null

  const _updateAccount = (account: GetSingleUserAccountResult | null) => {
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
  const _syncAccount = async () => {
    const account = await getAccountFromStorage(storage)
    invariant(account, "No account authenticated")
    const res = await getMyProfile({ gqlClient: gql.client() })
    _updateAccount(res)
    return res
  }

  /**
   * Cleanup of the storage & properties of the authentication state
   */
  const _cleanup = async () => {
    await storage.removeItem(ACCOUNT_STORAGE_KEY)
    await credentialsDriver.clear()
    _updateAccount(null)
  }

  const _storeAccount = async (account: StoredAccount) =>
    storage.setItem(ACCOUNT_STORAGE_KEY, account)

  const _refreshCredentials = async () => {
    try {
      const res = await credentialsDriver.refresh(storage)
      if (res.isFailure()) throw null
      const account = res.unwrap()
      await _storeAccount(account)
      await _syncAccount()
      credentialsDriver.apply(account.credentials as any)
    } catch (_) {
      await _cleanup()
    }
  }

  const _generateChallenge = (chain: BlockchainType, address: string) => {
    init.assertFinished()
    return generateChallenge({ chain, address }, { gqlClient: gql.client() })
  }

  const _authenticateWithChallenge = (
    challengeId: string,
    signature: string,
    publicKey?: string
  ): Promise<AuthenticationResult> => {
    init.assertFinished()
    return authenticate(
      { id: challengeId, signature, publicKey },
      { gqlClient: gql.client() }
    )
  }

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
  const _authenticate = async (
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

    const challenge = await _generateChallenge(
      networkToChain(network),
      manager.address
    )
    const signature = await manager.signMessage(challenge.text)

    if (signature.isFailure()) {
      return failure(new SignMessageError())
    }

    const credentials = await _authenticateWithChallenge(
      challenge.id,
      signature.unwrap().signature,
      network === BlockchainNetwork.TEZOS
        ? await (manager as TezosWalletManager).getPublicKey()
        : undefined
    )

    const { accessToken, refreshToken } = credentials
    const { id } = jwtDecode<JwtAccessTokenPayload>(accessToken)

    // store user ID in storage, as well as some additionnal data based on the
    // authentication payload we received.
    await _storeAccount({
      id,
      credentials: credentialsDriver.getStoredAuthentication(
        accessToken,
        refreshToken
      ),
    })

    // eventually apply effects of the authentication strategy
    credentialsDriver.apply(credentials)
    // fetch user account, should be authenticated
    const account = await _syncAccount()
    return success(account)
  }

  /**
   * Send a logout query, clear credentials, disconnect all the wallets.
   */
  const _logout = async () => {
    init.assertFinished()
    const account = await getAccountFromStorage(storage)
    invariant(account, "no account authenticated")
    await logout(credentialsDriver.getLogoutPayload(account.credentials), {
      gqlClient: gql.client(),
    })
    _cleanup()
  }

  return {
    emitter,

    /**
     * Should be called when the application starts to retrieve credentials from
     * the storage, synchronize user state with the backend (eventually by
     * refreshing the credentials if needed), to get to a stable state with
     * regards to the authentication.
     */
    init: async () => {
      init.start()

      const account = await getAccountFromStorage(storage)

      // if there's an account in the storage, then init authentication
      // recovery process, which depends on the authentication strategy
      if (account) {
        try {
          if (!credentialsDriver.validate(account.credentials)) {
            console.error("credentials recovered from storage are invalid")
            await _cleanup()
            init.finish()
            return
          }
          // If we can get the profile we are authenticated
          await _syncAccount()
        } catch (e) {
          // if a sync error occurs, we may want to try refreshing credentials
          console.log("Error getting profile", e)
          try {
            await _refreshCredentials()
          } catch (_) {}
        }
      }

      // todo
      // - sync wallet
      // - reconciliate state

      init.finish()
    },

    get initialized() {
      return init.finished
    },

    getAccount: () => _account,

    authenticated: () => !!_account,

    getWalletManagers: () => null,

    logout: _logout,
  }
}
