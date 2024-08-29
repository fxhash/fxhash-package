"use client"

import {
  Fragment,
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  IClientPlugnPlay,
  DependencyProviders,
  createClientPlugnPlay,
  QueryClient,
  GetSingleUserAccountResult,
  UserSourceEventsTypemap,
  WalletManagersMap,
  deriveManagersMap,
  cleanup,
  BlockchainNetwork,
  invariant,
  xorshift64,
} from "@fxhash/sdk"
import {
  IClientPlugnPlayProviderWeb2SignInOptions,
  IReactClientPlugnPlayConfig,
  IReactClientPlugnPlayProviderProps,
} from "@/_interfaces.js"
import { isProviderCustomConfigValid } from "@/utils/validate.js"

const defaultWeb2SignInOptions: IClientPlugnPlayProviderWeb2SignInOptions = {
  email: true,
}

export type ClientBasicState = {
  config: IReactClientPlugnPlayConfig
  client: IClientPlugnPlay | null
  account: GetSingleUserAccountResult | null
  managers: WalletManagersMap
  userError: UserSourceEventsTypemap["error"]["error"] | null
}

const defaultActiveManagers = {
  [BlockchainNetwork.ETHEREUM]: null,
  [BlockchainNetwork.TEZOS]: null,
}

const defaultContext: ClientBasicState = {
  config: null as any,
  client: null,
  account: null,
  managers: defaultActiveManagers,
  userError: null,
}

export const ClientPlugnPlayContext = createContext(defaultContext)

export function ClientPlugnPlayProvider({
  children,
  config,
  safeDomContainer,
}: PropsWithChildren<IReactClientPlugnPlayProviderProps>) {
  const configChecked = useRef<number>()
  const _config = (() => {
    invariant(config, "missing config")

    // Check if config has changed: we don't support that
    const configHash = xorshift64(config)
    if (configChecked.current && configChecked.current !== configHash) {
      throw Error(
        "The fxhash client plugnplay config should never change through the application life."
      )
    }
    configChecked.current = configHash

    // Extend with default values if missing
    const out: IReactClientPlugnPlayConfig = {
      ...config,
      web2SignIn:
        typeof config.web2SignIn !== "undefined"
          ? config.web2SignIn
          : defaultWeb2SignInOptions,
    }

    const configValidRes = isProviderCustomConfigValid(out)
    if (configValidRes.isFailure()) throw configValidRes.error

    return out
  })()

  const [state, setState] = useState<ClientBasicState>({
    ...defaultContext,
    config: _config,
  })

  const clientRef = useRef<IClientPlugnPlay | null>(null)

  useEffect(() => {
    if (clientRef.current) return

    clientRef.current = createClientPlugnPlay({
      metadata: _config.metadata,
      wallets: _config.wallets,
      credentials: _config.credentials,
      safeDomWrapper: safeDomContainer,
    })

    const client = clientRef.current
    invariant(safeDomContainer, "wrapper not available")

    const clean = cleanup()
    clean.add(
      client.emitter.on("error", err => {
        setState(st => ({ ...st, userError: err.error }))
      }),
      client.emitter.on("user-changed", () => {
        const wallets = client.source.getWallets()
        setState(st => ({
          ...st,
          userError: null,
          account: client.source.getAccount(),
          managers: wallets
            ? deriveManagersMap(wallets)
            : defaultActiveManagers,
        }))
      })
    )

    client.init()

    setState(st => ({ ...st, client }))

    return () => {
      clean.clear()
    }
  }, [_config, safeDomContainer])

  // Depending on whether EVM is needed we don't expose the same tree
  const Wrapper: FunctionComponent<PropsWithChildren> = (() => {
    if (!_config.wallets.evm) return Fragment
    const queryClient = new QueryClient()
    return props =>
      state.client ? (
        <DependencyProviders
          wagmiConfig={state.client.config.wagmi!}
          queryClient={queryClient}
        >
          {props.children}
        </DependencyProviders>
      ) : null
  })()

  return (
    <Wrapper>
      <ClientPlugnPlayContext.Provider value={state}>
        {children}
      </ClientPlugnPlayContext.Provider>
    </Wrapper>
  )
}
