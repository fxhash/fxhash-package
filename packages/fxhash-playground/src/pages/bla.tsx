import Head from "next/head"
import { GenerativeToken } from "@fxhash/contracts/types/entities/GenerativeToken"
import { createApolloClient } from "@fxhash/gql/apollo"
import { Qu_genToken } from "@fxhash/gql/queries/generative-token"

import { GetServerSideProps } from "next"

interface Props {
  token: GenerativeToken
}

export default function Home(props) {

  return (
    <>
      <Head>
        <title>playground</title>
      </Head>
    adas
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
