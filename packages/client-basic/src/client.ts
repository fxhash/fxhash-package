/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import {
  Authenticator,
  CredentialsDriver,
  CredentialsStrategy,
  GraphqlWrapper,
  ICredentialsDriver,
  IGraphqlWrapper,
  IUserSource,
  IWalletsOrchestratorParams,
  Storage,
  UserReconciliation,
  WalletConnectedButNoAccountAuthenticatedError,
  WalletsOrchestrator,
  getAnyActiveManager,
  jwtCredentials,
} from "@fxhash/client-sdk"
import { ClientBasicEventTarget } from "./events.js"
import { cleanup, intialization } from "@fxhash/utils"

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
   * @default jwtCredentials
   */
  credentials?: ICredentialsDriver<any>

  /**
   * Wallet settings for the Wallet Orchestrator module.
   */
  userSource: IUserSource
}

const defaultOptions = (
  gql: IGraphqlWrapper
): Required<Omit<FxhashClientBasicOptions, "userSource">> => ({
  storage: new Storage(),
  credentials: jwtCredentials(gql),
})

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
  private _init = intialization()
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
    this._init.start()

    /**
     * @dev The order in which the modules are initialized is very important
     * here. A few considerations:
     * - Authenticator & WalletsOrchestrator may take a while to initialize, so
     *   it's best to init them in parallel
     * - UserReconciliation only emits events when reconciliating the state
     * - This client is plugged to the UserReconciliation module to execute
     *   its flow
     * - When initializing UserReconciliation, it only sets up event listeners,
     *   but doesn't do any state reconciliation. Clients are expected to
     *   implement that.
     */

    await Promise.all([this._auth.init(), this._wallets.init()])
    await this._reconciliation.init()

    // during initialisation we want a custom behaviour to reconciliate the
    // state, as if there are any discrepancy we want to reset all the states
    const reconciliation = this._reconciliation.reconciliationState()

    if (reconciliation.isFailure()) {
      // todo ? remove logs here ?
      console.log(
        `The wallets/account are in an incoherent state, the following error was emitted after initialization:`
      )
      console.log(reconciliation.error)
      console.log(
        `Wallets/Account will be cleared as a coherent cannot be recovered at this stage.`
      )

      await Promise.allSettled([
        this.auth.logout(),
        this.wallets.disonnectAll(),
      ])
    }

    // broadcast — it's always a valid user change here, either no user or
    // a user ready to do stuff
    this.emit("valid-user-changed")

    // now attach listeners for automatically plug into the flows
    this._attachListeners()
  }

  /**
   * Forward events from the different components so that they are emitted
   * directly by this instance.
   */
  private _attachListeners() {
    this._toClean.push(
      /**
       * Hook on user reconciliation error, with 2 cases:
       * - if error is WalletConnectedButNoAccountAuthenticatedError: a user
       *   just connected their wallet, we trigger an authentication flow
       *   (signing an operation, etc...)
       * - if other error, forward the error so that it can be treated by
       *   applications
       */
      this._reconciliation.on("user-reconciliation-error", async err => {
        // if a wallet was connected, but there is no account we can attempt a
        // signing process with said wallet
        if (err instanceof WalletConnectedButNoAccountAuthenticatedError) {
          console.log("attemp sign in with wallet")
          const managers = this.wallets.managers
          const anyManager = getAnyActiveManager(managers)
          if (!anyManager) {
            throw Error(
              `something weird with the implementation, shouldn't reach this`
            )
          }
          const result = await this.auth.authenticate(anyManager)

          // in case of failure, we reset the
          if (result.isFailure()) {
            // todo: should we provide a way to get feedback here ?
            await this.reset()
          }
          // otherwise events will be automatically broadcasted
          return
        }

        // otherwise forward the error to be handlded by applications
        // todo ? should we enforce some reconciliation here ??
        this.emit("user-reconciliation-error", err)
      }),
      this._reconciliation.pipe("valid-user-changed", this),
      this._wallets.pipe("wallet-changed", this),
      this._auth.pipe("account-updated", this)
    )
  }

  /**
   * Resets modules to a blank state.
   * - auth: Authentication is cleared, logout (if any account) is performed
   * - wallets: all wallets are disconnected
   * An object can be passed to define which modules should be reset
   */
  public async reset(
    {
      auth = true,
      wallets = true,
    }: {
      auth: boolean
      wallets: boolean
    } = {
      auth: true,
      wallets: true,
    }
  ) {
    const promises: Promise<void>[] = []
    if (auth) promises.push(this.auth.logout())
    if (wallets) promises.push(this.wallets.disonnectAll())
    await Promise.all(promises)
  }

  public release() {
    this._wallets.release()
    this._reconciliation.release()
    this._toClean.forEach(f => f())
    this._toClean.length = 0
  }
}

export function fxhashClientBasic(options: FxhashClientBasicOptions) {
  const init = intialization()
  const clean = cleanup()
  const gql = new GraphqlWrapper()
  const _options = {
    ...defaultOptions(gql),
    ...options,
  }

  return {
    gql,
    emitter: userSource.emitter,

    async init() {
      init.start()
      await userSource.init()
      init.finish()
    },

    release() {
      userSource.release?.()
      clean.clear()
    },
  }
}
