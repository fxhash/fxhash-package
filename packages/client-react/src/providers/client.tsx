import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
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
  client: IClientPlugnPlay
  account: GetSingleUserAccountResult | null
  managers: WalletManagersMap
  userError: UserSourceEventsTypemap["error"]["error"] | null
}

const defaultActiveManagers = {
  [BlockchainNetwork.ETHEREUM]: null,
  [BlockchainNetwork.TEZOS]: null,
}

const defaultContext: ClientBasicState = {
  config: null as any, // a bit dirty but OK
  client: null as any,
  account: null,
  managers: defaultActiveManagers,
  userError: null,
}

export const ClientPlugnPlayContext = createContext(defaultContext)

/**
 * A provider for fxhash client plugnplay.
 */
export function ClientPlugnPlayProvider({
  children,
  config,
  safeDomContainer,
}: PropsWithChildren<IReactClientPlugnPlayProviderProps>) {
  // parse the provided config, verify if it matches requirements and provide
  // default values where missing
  const configChecked = useRef<number>()
  const _config = useMemo(() => {
    invariant(config, "missing config")

    // check if config has changed: we don't support that
    const configHash = xorshift64(config)
    if (configChecked.current && configChecked.current !== configHash) {
      throw Error(
        "The fxhash client plugnplay config should never change through the application life."
      )
    }
    configChecked.current = configHash

    // extend with default values if missing
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
  }, [config])

  const [state, setState] = useState<ClientBasicState>({
    ...defaultContext,
    config: _config,
  })
  const set = <K extends keyof ClientBasicState>(
    k: K,
    val: ClientBasicState[K]
  ) => {
    setState(st => ({ ...st, [k]: val }))
  }
  const update = (values: Partial<ClientBasicState>) => {
    setState(st => ({ ...st, ...values }))
  }

  const clientRef = useRef<IClientPlugnPlay | null>(null)
  const client = useMemo(() => {
    if (clientRef.current) return clientRef.current
    return (clientRef.current = createClientPlugnPlay({
      metadata: config.metadata,
      wallets: config.wallets,
      safeDomWrapper: safeDomContainer,
    }))
  }, [])

  const once = useRef(false)

  useEffect(() => {
    invariant(safeDomContainer, "wrapper not available")

    const clean = cleanup()
    clean.add(
      client.emitter.on("error", err => {
        set("userError", err.error)
      }),
      client.emitter.on("user-changed", () => {
        const wallets = client.source.getWallets()
        update({
          userError: null,
          account: client.source.getAccount(),
          managers: wallets
            ? deriveManagersMap(wallets)
            : defaultActiveManagers,
        })
      })
    )

    if (!once.current) {
      client.init()
      once.current = true
    }

    set("client", client)

    return () => {
      clean.clear()

      // todo: in dev we don't want to releave and init the client twice ?
      // client.release()
    }
  }, [])

  console.log({ state })

  // depending on whether EVM is needed we don't expose the same tree
  const Wrapper: FunctionComponent<PropsWithChildren> = (() => {
    if (!config.wallets.evm) return props => props.children
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
