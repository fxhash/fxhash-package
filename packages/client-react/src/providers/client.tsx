"use client"

import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  IClientPlugnPlay,
  createClientPlugnPlay,
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
import { Wrapper } from "./Wrapper.js"

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
  client: null as any, // a bit dirty but OK
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

  const clientRef = useRef<IClientPlugnPlay | null>(null)

  const client = useMemo(() => {
    if (clientRef.current) return clientRef.current
    return (clientRef.current = createClientPlugnPlay({
      metadata: config.metadata,
      wallets: config.wallets,
      credentials: config.credentials,
      safeDomWrapper: safeDomContainer,
    }))
  }, [])

  const [state, setState] = useState<ClientBasicState>({
    ...defaultContext,
    config: _config,
    client,
  })

  const once = useRef(false)

  useEffect(() => {
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

    if (!once.current) {
      client.init()
      once.current = true
    }

    return () => {
      clean.clear()
      // TODO: in dev we don't want to releave and init the client twice ?
      // client.release()
    }
  }, [])

  return (
    <Wrapper config={_config} client={state.client}>
      <ClientPlugnPlayContext.Provider value={state}>
        {children}
      </ClientPlugnPlayContext.Provider>
    </Wrapper>
  )
}
