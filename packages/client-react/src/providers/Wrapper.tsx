import { IReactClientPlugnPlayConfig } from "@/_interfaces.js"
import { DependencyProviders, IClientPlugnPlay, QueryClient } from "@fxhash/sdk"
import { PropsWithChildren, useRef } from "react"

interface WagmiWrapperProps {
  client: IClientPlugnPlay
}

/**
 * A wrapper that provides the necessary context for wagmi
 */
const WagmiWrapper: React.FC<PropsWithChildren<WagmiWrapperProps>> = ({
  client,
  children,
}) => {
  const queryClientRef = useRef<QueryClient>(new QueryClient())

  return (
    <DependencyProviders
      wagmiConfig={client.config.wagmi!}
      queryClient={queryClientRef.current!}
    >
      {children}
    </DependencyProviders>
  )
}

interface WrapperProps {
  config: IReactClientPlugnPlayConfig
  client: IClientPlugnPlay
}

/**
 * A wrapper that provides the necessary context for the fxhash client based on the given configuration.
 * When EVM wallets are used, it will also provide the necessary context for the wagmi client.
 */
export const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
  config,
  client,
  children,
}) => {
  // depending on wether EVM is neede we don't expose the same tree
  if (!config.wallets.evm) {
    return children
  }

  return <WagmiWrapper client={client}>{children}</WagmiWrapper>
}
