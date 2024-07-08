import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  CleanUserReconciliationError,
  FxhashClientBasic,
  FxhashClientBasicOptions,
} from "@fxhash/client-basic"
import {
  GetSingleUserAccountResult,
  TActiveManagersMap,
} from "@fxhash/client-sdk"

export type ClientBasicproviderOptions = {
  config: FxhashClientBasicOptions
}

export type ClientBasicState = {
  client: FxhashClientBasic | null
  account: GetSingleUserAccountResult | null
  managers: TActiveManagersMap
  userError: CleanUserReconciliationError | null
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

export const FxhashClientBasicContext = createContext(defaultContext)

export function FxhashClientBasicProvider({
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

    const client = new FxhashClientBasic(config)
    const listenersOff = [
      client.on("user-reconciliation-error", err => {
        set("userError", err)
      }),
      client.on("valid-user-changed", () => {
        set("userError", null)
        set("account", client.auth.account)
        set("managers", client.wallets.managers)
      }),
    ]
    client.init()
    set("client", client)

    // todo: in prod we shoudl return, but in dev this runs only once cause
    // of the once.current, but then it doesn't reset these

    // return () => {
    //   listenersOff.forEach(fn => fn())
    //   client.release()
    // }
  }, [])

  return (
    <FxhashClientBasicContext.Provider value={state}>
      {children}
    </FxhashClientBasicContext.Provider>
  )
}
