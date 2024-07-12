import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  IClientPlugnPlay,
  clientPlugnPlay,
  ClientPlugnPlayOptions,
  DependencyProviders,
} from "@fxhash/client-plugnplay"
import {
  GetSingleUserAccountResult,
  UserReconciliationError,
  WalletManagersMap,
} from "@fxhash/client-sdk"
import { cleanup } from "@fxhash/utils"

type PropertiesOf<T extends {}, Props extends keyof T> = Props

type EnforcedConfigProperties = PropertiesOf<
  ClientPlugnPlayOptions,
  "manageConnectKit"
>

export type ClientBasicproviderOptions = {
  config: Omit<ClientPlugnPlayOptions, EnforcedConfigProperties>
}

const enforcedConfigProperties: Pick<
  ClientPlugnPlayOptions,
  EnforcedConfigProperties
> = {
  /**
   * This react module implements ConnectKit itself
   */
  manageConnectKit: false,
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

  console.log({ state })

  const once = useRef(false)
  useEffect(() => {
    if (once.current) return
    once.current = true

    const clean = cleanup()

    const client = clientPlugnPlay(config)
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

    // todo: in prod we shoudl return, but in dev this runs only once cause
    // of the once.current, but then it doesn't reset these

    // return () => {
    //   clean.clear()
    //   client.release()
    // }
  }, [])

  return (
    <DependencyProviders wagmiConfig={}>
      <ClientPlugnPlayContext.Provider value={state}>
        {children}
      </ClientPlugnPlayContext.Provider>
    </DependencyProviders>
  )
}
