import {
  AccountAuthenticatedButNoWalletConnectedError,
  IWalletsSource,
  UserSourceEventEmitter,
  anyActiveManager,
} from "../_index.js"
import {
  IAccountSourceCommonOptions,
  IWalletsAccountSource,
} from "./_interfaces.js"
import { BlockchainNetwork, networkToChain } from "@fxhash/shared"
import {
  JwtAccessTokenPayload,
  PromiseResult,
  failure,
  invariant,
  success,
} from "@fxhash/shared"
import { type TezosWalletManager } from "@fxhash/tez"
import { jwtDecode } from "jwt-decode"
import { isEthereumWalletManager, isTezosWalletManager } from "@/util/types.js"
import {
  GetSingleUserAccountResult,
  authenticate as authenticateWithChallenge,
  generateChallenge,
} from "./_index.js"
import { SignMessageError } from "@/util/Error.js"
import { cleanup, intialization } from "@fxhash/utils"
import { accountUtils } from "./common.js"
import { reconciliationState } from "../utils/user-reconciliation.js"

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
  const emitter = new UserSourceEventEmitter()
  const init = intialization()
  const clean = cleanup()
  const _account = accountUtils({
    storage,
    gql,
    credentialsDriver,
    storageNamespace: storageNamespace || DEFAULT_STORAGE_NAMESPACE,
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
   * @returns Account on success, error on failure. (Note: the account is also
   * stored and managed internally, application don't have to rely on the value
   * returned by this function to manager the account state.)
   */
  const authenticate = async (): PromiseResult<
    GetSingleUserAccountResult,
    SignMessageError
  > => {
    init.check()

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
        const anyManager = anyActiveManager(wallets.getWalletManagers())

        // when wallet is connected, but no account is authenticated, we start
        // authentication process
        if (anyManager && !_account.get()) {
          const result = await authenticate()
          if (result.isFailure()) {
            console.log(result.error)
            wallets.disconnectAllWallets()
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
