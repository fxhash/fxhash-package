import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider } from "connectkit"
import { PropsWithChildren } from "react"
import { Config as WagmiConfig, WagmiProvider } from "wagmi"

type Props = PropsWithChildren<{
  wagmiConfig: WagmiConfig
  queryClient: QueryClient
}>

/**
 * Although this package is framework-agnostic, because we use ConnectKit to
 * provide a connection UI for users, we need to implement it there. React
 * packages can re-use this implementation if they define need a custom
 * Provider tree.
 *
 * **If you are using `@fxhash/client-plugnplay` in a react context and happen
 * to find a need to use this module, you should look into
 * `@fxhash/client-plugnplay-react` instead.
 */
export function DependencyProviders({
  wagmiConfig,
  queryClient,
  children,
}: Props): JSX.Element {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
