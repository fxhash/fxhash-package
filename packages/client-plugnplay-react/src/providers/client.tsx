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
} from "@fxhash/client-plugnplay"
import {
  GetSingleUserAccountResult,
  UserReconciliationError,
  WalletManagersMap,
} from "@fxhash/client-sdk"
import { cleanup, DeepOmit } from "@fxhash/utils"

export type ReactClientPlugnPlayOptions = DeepOmit<
  ClientPlugnPlayOptions,
  "manageConnectKitProvider"
>

export type ClientBasicproviderOptions = {
  config: ReactClientPlugnPlayOptions
}

export type ClientBasicState = {
  client: IClientPlugnPlay | null
  account: GetSingleUserAccountResult | null
  managers: WalletManagersMap
  userError: UserReconciliationError | null
}

const defaultActiveManagers = {
  EVM: null,
  TEZOS: null,
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
}: PropsWithChildren<ClientBasicproviderOptions>) {
  const [state, setState] = useState<ClientBasicState>(defaultContext)
  const set = <K extends keyof ClientBasicState>(
    k: K,
    val: ClientBasicState[K]
  ) => {
    setState(st => ({ ...st, [k]: val }))
  }

  const once = useRef(false)

  const client = useMemo(
    () =>
      createClientPlugnPlay({
        metadata: config.metadata,
        wallets: config.wallets,
      }),
    []
  )

  useEffect(() => {
    const clean = cleanup()
    clean.add(
      client.emitter.on("error", err => {
        set("userError", err)
      }),
      client.emitter.on("user-changed", () => {
        set("userError", null)
        set("account", client.source.getAccount())
        set(
          "managers",
          client.source.getWalletManagers() || defaultActiveManagers
        )
      })
    )
    set("client", client)

    // only initialize once
    if (!once.current) {
      client.init()
      once.current = true
    }

    return () => {
      clean.clear()
      // client.release()
    }
  }, [])

  // depending on whether EVM is needed we don't expose the same tree
  const Wrapper: FunctionComponent<PropsWithChildren> = (() => {
    if (!config.wallets.evm) return props => props.children
    const queryClient = new QueryClient()
    return props => (
      <DependencyProviders
        wagmiConfig={client.config.wagmi! as any}
        queryClient={queryClient}
      >
        {props.children}
      </DependencyProviders>
    )
  })()

  return (
    <Wrapper>
      <ClientPlugnPlayContext.Provider value={state}>
        {children}
      </ClientPlugnPlayContext.Provider>
    </Wrapper>
  )
}
