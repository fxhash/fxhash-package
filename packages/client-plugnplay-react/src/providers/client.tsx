import {
  FunctionComponent,
  PropsWithChildren,
  StrictMode,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import {
  IClientPlugnPlay,
  ClientPlugnPlayOptions,
  DependencyProviders,
  createClientPlugnPlay,
  QueryClient,
} from "@fxhash/client-plugnplay"
import {
  GetSingleUserAccountResult,
  UserConsistencyError,
  WalletManagersMap,
} from "@fxhash/client-sdk"
import { cleanup, DeepOmit } from "@fxhash/utils"
import { invariant } from "@fxhash/shared"

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
  userError: UserConsistencyError | null
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
  safeDomContainer,
}: PropsWithChildren<ClientBasicproviderOptions>) {
  const [state, setState] = useState<ClientBasicState>(defaultContext)
  const set = <K extends keyof ClientBasicState>(
    k: K,
    val: ClientBasicState[K]
  ) => {
    setState(st => ({ ...st, [k]: val }))
  }

  const once = useRef(false)
  useEffect(() => {
    if (once.current) return
    once.current = true

    invariant(safeDomContainer, "wrapper not available")

    const clean = cleanup()
    console.log(safeDomContainer)
    const client = createClientPlugnPlay({
      metadata: config.metadata,
      wallets: config.wallets,
      safeDomWrapper: safeDomContainer,
    })

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

    client.init()
    set("client", client)

    return () => {
      // clean.clear()
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
