import {
  TezosUserProvider,
  TezosUserProviderConfig,
} from "./authentication/TezosUser"
import {
  EthereumUserProvider,
  EthereumUserProviderConfig,
} from "./authentication/EthereumUser"
import {
  PendingSigningRequestError,
  UserRejectedError,
} from "@fxhash/contracts-shared"

interface FxhashProviderProps {
  config: {
    tezos: TezosUserProviderConfig
    ethereum: EthereumUserProviderConfig
  }
  children: React.ReactNode
}

export type FxhashContext = {
  connectionError?: UserRejectedError | PendingSigningRequestError
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
