/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import {
  Authenticator,
  CredentialsStrategy,
  GraphqlWrapper,
  IGraphqlWrapper,
  IWalletsOrchestratorParams,
  Storage,
  UserReconciliation,
  WalletsOrchestrator,
} from "@fxhash/client-sdk"
import { invariant } from "@fxhash/shared"
import { ClientBasicEventTarget } from "./events.js"

export type FxhashClientBasicOptions = {
  /**
   * The Storage interface for storing user data on the client-side. Storage
   * will be used by modules such as the account module for storing account
   * details between sessions.
   */
  storage?: Storage

  /**
   * Which strategy should be used for handling authentication credentials.
   * **Warning:** JWT is recommended for 3rd parties because 3rd party cookies
   * are being sunset on chrome, and won't be a sensible choice in the future.
   *
   * @default CredentialsStrategy.JWT
   */
  credentialsStrategy?: CredentialsStrategy

  /**
   * Wallet settings for the Wallet Orchestrator module.
   */
  wallets?: IWalletsOrchestratorParams
}

const defaultOptions: Required<Omit<FxhashClientBasicOptions, never>> = {
  storage: new Storage(),
  credentialsStrategy: CredentialsStrategy.COOKIE,
  wallets: {
    connectors: [],
  },
}

/**
 * The Fxhash Client Basic provides an abstraction over the different modules
 * of the `@fxhash/client-sdk` package, by exposing simple options & interfaces
 * to applications.
 *
 * This client uses the Observer pattern (implemented with EventTarget) for
 * forwardding events emitted by the different modules during their different
 * lifecycles. Consumers of this API should listen to these events for handling
 * side-effects.
 */
export class FxhashClientBasic extends ClientBasicEventTarget {
  private _initialized = false
  private _gql: IGraphqlWrapper
  private _storage: Storage
  private _auth: Authenticator
  private _wallets: WalletsOrchestrator
  private _reconciliation: UserReconciliation
  private _toClean: (() => void)[] = []

  constructor(_options?: FxhashClientBasicOptions) {
    super()
    const options = { ...defaultOptions, ..._options }
    this._gql = new GraphqlWrapper()
    this._storage = options.storage

    this._auth = new Authenticator({
      gqlWrapper: this._gql,
      storage: this._storage,
      credentialsStrategy: options.credentialsStrategy,
    })

    this._wallets = new WalletsOrchestrator(options.wallets)

    this._reconciliation = new UserReconciliation({
      authenticator: this._auth,
      wallets: this._wallets,
    })
  }

  /**
   * The GraphQL wrapper instance, which can be used to run authenticated
   * GraphQL queries (once user is authenticated of course).
   */
  get gql() {
    return this._gql
  }

  get auth() {
    return this._auth
  }

  get wallets() {
    return this._wallets
  }

  async init() {
    invariant(!this._initialized, "Can only initialize once")
    this._initialized = true

    await Promise.all([
      this._auth.init(),
      this._wallets.init(),
      this._reconciliation.init(),
    ])

    // if there is a discrepancy in the initial state, reset everything
    const reconciliation = this._reconciliation.reconciliationState()
    console.log("initial reconciliation")
    console.log({ reconciliation })

    console.log({
      account: this._auth.account,
      activeManagers: this._wallets.getActiveManagers(),
    })

    // note: important to attach listeners before initializing, otherwise some
    // events may be lost as the init() may emit events
    this._attachListeners()
  }

  /**
   * Forward events from the different components so that they are emitted
   * directly by this instance.
   */
  private _attachListeners() {
    this._toClean.push(
      ...[
        this._reconciliation.pipe("user-reconciliation-error", this),
        this._reconciliation.pipe("valid-user-changed", this),
        this._wallets.pipe("wallet-changed", this),
        this._auth.pipe("account-updated", this),
      ]
    )
  }

  public release() {
    this._toClean.forEach(f => f())
    this._toClean.length = 0
  }
}

/**
 * Current problems:
 * - how to perform a full authentication flow ?
 *   right now when a wallet is connected, a Reconciliation error is emitted
 *   but that's it
 * - there are 2 slightly different wallet changed events:
 *   - the user connects/changes manually the wallet
 *   - wallet is detected at startup
 *   Can we detect these 2 cases using what's already there ? If not, what
 *   should be changed (minimally) for it to be possible ?
 *
 * Solution ?
 * - initialize all the modules
 * - run the reconciliation module
 *   -> here we get the initial state
 * - attach the event forwardding
 *
 * - on wallet changed
 *   - reconciliation will run automatically
 * - in listeners previously set up, hook on User Reconciliation error
 *   WalletConnectedButNoAccountAuthenticatedError, if such error is thrown
 *   it means a user tries to authenticate ? so we run the rest of the
 *   authentication flow ?
 */
