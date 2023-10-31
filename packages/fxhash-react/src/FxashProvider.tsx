import {
  TezosUserProvider,
  TezosUserProviderConfig,
} from "./authentication/TezosUser"

interface FxhashProviderProps {
  config: {
    tezos: TezosUserProviderConfig
  }
  children: React.ReactNode
}

export const FxhashProvider = ({ config, children }: FxhashProviderProps) => {
  return <TezosUserProvider config={config.tezos}>{children}</TezosUserProvider>
}
