import Head from "next/head"
import { useContext } from "react"
import { UserContext } from "@fxhash/contracts/context/User"
import { GenerativeToken } from "@fxhash/contracts/types/entities/GenerativeToken"
import { useContractOperation } from "@fxhash/contracts/hooks/useContractOperation"
import { TMintOperationParams, } from "@fxhash/contracts/services/contract-operations/Mint"
import { TMintV3OperationParams } from "@fxhash/contracts/services/contract-operations/MintV3"
import { getMintOperationByToken } from "@fxhash/contracts/utils/getMintOperationByTokenVersion"
import { createApolloClient } from "@fxhash/gql/apollo"
import { Qu_genToken } from "@fxhash/gql/queries/generative-token"

import { GetServerSideProps } from "next"

interface Props {y
  token: GenerativeToken
}

export default function Home(props) {
  const { token } = props
  const userContext = useContext(UserContext)
  const mintOperation = getMintOperationByToken(token)
  const { state, loading, success, call, error, opHash, opData, clear } =
    useContractOperation<TMintOperationParams | TMintV3OperationParams>(
      mintOperation.operation
    )

  const handleConnectWallet = () => {
    userContext.connect()
  }
  return (
    <>
      <Head>
        <title>playground</title>
      </Head>
      <button onClick={handleConnectWallet}>connect wallet</button>
      <h1>{token.metadata.name}</h1>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = 217
  let token = null
  const apolloClient = createApolloClient()
  const { data } = await apolloClient.query({
    query: Qu_genToken,
    fetchPolicy: "no-cache",
    variables: { id },
  })
  if (data) {
    token = data.generativeToken
  }

  return {
    props: {
      token: token,
    },
    notFound: !token,
  }
}
