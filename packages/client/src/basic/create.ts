/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { invariant } from "@fxhash/utils"
import {
  IClient,
  ICreateClientParams,
  WalletSourcesMap,
} from "./_interfaces.js"
import {
  type IAccountSourceCommonOptions,
  type IMultipleUserSources,
  type IUserSource,
  GraphqlWrapper,
  authWallets,
  authWeb3Auth,
  jwtCredentials,
  multipleUserSources,
  privateKeyWallets,
  web3AuthWallets,
  windowWallets,
  defaultStorageDriver,
  withAccountHydration,
} from "@fxhash/core"
import { isBrowser } from "@fxhash/utils-browser"

export interface IClientManySources extends IClient {
  /**
   * @override
   */
  userSource: IMultipleUserSources

  /**
   * A map of the wallets instanciated, based on the provided configuration.
   * **Note**: If a wallet wasn't declared in the provided config, its value
   * will be null in the map.
   */
  walletSources: WalletSourcesMap
}

/**
 * A medium-level API which provides the instanciation of user sources using
 * a declarative JS object with a simple API. This client doesn't provide any
 * high-level utility function to interact with the underlying wallets
 * instanciated but rather exposes these directly.
 *
 * This client should be used for use-cases where having some level of control
 * over the fxhash client is useful, but when using the low-level imperative
 * API is overkill.
 *
 * This client is also be used by higher level abstractions
 * (`@fxhash/client-plugnplay` for instance).
 */
export function createClient(params: ICreateClientParams): IClientManySources {
  invariant(params.metadata, "metadata are required")

  // defaults
  const gql = params.drivers?.gql || new GraphqlWrapper()
  const storage = params.drivers?.storage || defaultStorageDriver()
  const credentialsDriver = params.drivers?.credentials || jwtCredentials(gql)
  const accountSourceOptions: IAccountSourceCommonOptions = {
    gqlWrapper: gql,
    storage,
    credentialsDriver,
  }

  // different sources will be pushed here based on provided settings
  const userSources: IUserSource[] = []

  const wallets: WalletSourcesMap = {
    window: null,
    web3auth: null,
    privateKeys: null,
  }

  if (params.wallets?.privateKeys) {
    const opts = params.wallets.privateKeys
    wallets.privateKeys = privateKeyWallets({
      evm: opts.evm,
      tezos: opts.tezos,
    })
    let source: IUserSource = wallets.privateKeys
    // if auth, wrap wallets with some wallet-authentication
    if (params.authentication) {
      source = authWallets({
        wallets: wallets.privateKeys,
        ...accountSourceOptions,
      })
    }
    userSources.push(source)
  }

  if (isBrowser() && params.wallets?.web3auth) {
    wallets.web3auth = web3AuthWallets({
      gqlWrapper: gql,
      safeFrameDomWrapper:
        typeof params.wallets.web3auth !== "boolean"
          ? params.wallets.web3auth.safeDomWrapper
          : undefined,
    })
    let source: IUserSource = wallets.web3auth
    // if auth, wrap with some web3 authentication
    if (params.authentication) {
      source = authWeb3Auth({
        wallets: wallets.web3auth,
        ...accountSourceOptions,
      })
    }
    userSources.push(source)
  }

  if (isBrowser() && params.wallets?.window) {
    const opts = params.wallets.window
    wallets.window = windowWallets({
      evm: configOrUndefined(opts.evm?.wagmiConfig),
      tezos: configOrUndefined(opts.tezos?.beaconConfig),
    })
    let source: IUserSource = wallets.window
    // if auth, wrap authentication wallets arround window source
    if (params.authentication) {
      source = authWallets({
        wallets: wallets.window,
        ...accountSourceOptions,
      })
    }
    userSources.push(source)
  }

  // will reconciliate the different sources to ensure only a single source
  let rootSource = multipleUserSources({ sources: userSources })

  if (params.hydration?.account) {
    rootSource = withAccountHydration({
      source: rootSource,
      account: params.hydration?.account,
    })
  }

  return {
    userSource: rootSource,
    walletSources: wallets,
  }
}

// small helper
function configOrUndefined<T>(config?: T): { config: T } | undefined {
  return config ? { config } : undefined
}
