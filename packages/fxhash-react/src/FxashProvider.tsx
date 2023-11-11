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
import { ConfirmationProvider } from "./confirmation/Confirmation"

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
    <ConfirmationProvider>
      <TezosUserProvider config={config.tezos}>
        <EthereumUserProvider config={config.ethereum}>
          {children}
        </EthereumUserProvider>
      </TezosUserProvider>
    </ConfirmationProvider>
  )
}
