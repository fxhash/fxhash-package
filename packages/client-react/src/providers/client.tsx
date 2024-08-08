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
  ClientPlugnPlayOptions,
  DependencyProviders,
  createClientPlugnPlay,
  QueryClient,
  GetSingleUserAccountResult,
  UserSourceEventsTypemap,
  WalletManagersMap,
  deriveManagersMap,
} from "@fxhash/sdk"
import { cleanup, DeepOmit } from "@fxhash/utils"
import { BlockchainNetwork, invariant } from "@fxhash/shared"

export type ReactClientPlugnPlayOptions = DeepOmit<
  ClientPlugnPlayOptions,
  "manageConnectKitProvider"
>

export type ClientBasicproviderOptions = {
  config: ReactClientPlugnPlayOptions
} & {
  safeDomContainer: HTMLElement
}

export type ClientBasicState = {
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
}: PropsWithChildren<ClientBasicproviderOptions>) {
  const [state, setState] = useState<ClientBasicState>(defaultContext)
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
