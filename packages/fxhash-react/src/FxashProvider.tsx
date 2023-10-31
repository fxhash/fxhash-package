import {
  TezosUserProvider,
  TezosUserProviderConfig,
} from "./authentication/TezosUser"
import {
  EthereumUserProvider,
  EthereumUserProviderConfig,
} from "./authentication/EthereumUser"

interface FxhashProviderProps {
  config: {
    tezos: TezosUserProviderConfig
    ethereum: EthereumUserProviderConfig
  }
  children: React.ReactNode
}

export const FxhashProvider = ({ config, children }: FxhashProviderProps) => {
  return (
    <TezosUserProvider config={config.tezos}>
      <EthereumUserProvider config={config.ethereum}>
        {children}
      </EthereumUserProvider>
    </TezosUserProvider>
  )
}
