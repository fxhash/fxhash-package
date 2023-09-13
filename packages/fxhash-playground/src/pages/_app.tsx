import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { clientSideClient } from "@fxhash/gql/apollo"
import { ApolloProvider } from "@apollo/client"
import { Root } from "@/containers/Root"
import { UserProvider as EthProvider } from "@fxhash/evm-contracts/context/User"
import { UserProvider as TezProvider } from "@fxhash/contracts/context/User"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={clientSideClient}>
      <TezProvider>
        <EthProvider>
          <Root>
            <Component {...pageProps} />
          </Root>
        </EthProvider>
      </TezProvider>
    </ApolloProvider>
  )
}
