/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { invariant } from "@fxhash/utils"
import {
  ClientBasicWallets,
  IClientBasic,
  IClientBasicParams,
} from "./_interfaces.js"
import {
  GraphqlWrapper,
  IUserSource,
  Storage,
  authWallets,
  jwtCredentials,
  privateKeyWallets,
  walletsAndAccount,
  web3AuthWallets,
  authWeb3Auth,
  windowWallets,
  IAccountSourceCommonOptions,
  multipleUserSources,
} from "@fxhash/client-sdk"

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
export function createClient(params: IClientBasicParams): IClientBasic {
  invariant(params.metadata, "metadata are required")

  // defaults
  const gql = params.drivers?.gql || new GraphqlWrapper()
  const storage = params.drivers?.storage || new Storage()
  const credentialsDriver = params.drivers?.credentials || jwtCredentials(gql)
  const accountSourceOptions: IAccountSourceCommonOptions = {
    gqlWrapper: gql,
    storage,
    credentialsDriver,
  }

  // different sources will be pushed here based on provided settings
  const userSources: IUserSource[] = []

  const wallets: ClientBasicWallets = {
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
      source = walletsAndAccount({
        wallets: wallets.privateKeys,
        account: authWallets(accountSourceOptions),
      })
    }
    userSources.push(source)
  }

  if (params.wallets?.web3auth) {
    wallets.web3auth = web3AuthWallets({})
    let source: IUserSource = wallets.web3auth
    // if auth, wrap with some web3 authentication
    if (params.authentication) {
      source = walletsAndAccount({
        wallets: wallets.web3auth,
        account: authWeb3Auth(accountSourceOptions),
      })
    }
    userSources.push(source)
  }

  if (params.wallets?.window) {
    const opts = params.wallets.window
    wallets.window = windowWallets({
      evm: opts.evm
        ? {
            config: opts.evm.wagmiConfig,
          }
        : undefined,
      tezos: opts.tezos
        ? {
            config: opts.tezos.beaconConfig,
          }
        : undefined,
    })
    let source: IUserSource = wallets.window
    // if auth, wrap authentication wallets arround window source
    if (params.authentication) {
      source = walletsAndAccount({
        wallets: wallets.window,
        account: authWallets(accountSourceOptions),
      })
    }
    userSources.push(source)
  }

  // will reconciliate the different sources to ensure only a single source
  const rootSource = multipleUserSources({ sources: userSources })

  return {
    userSource: rootSource,
    wallets,
  }
}
