import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { clientSideClient } from "@fxhash/gql/apollo"
import { ApolloProvider } from "@apollo/client"
import { Root } from "@/containers/Root"
import { UserProvider } from "@fxhash/contracts/context/User"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={clientSideClient}>
      <UserProvider>
        <Root>
          <Component {...pageProps} />
        </Root>
      </UserProvider>
    </ApolloProvider>
  )
}
