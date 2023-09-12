import Head from "next/head"
import { useContext, useMemo } from "react"
import { UserContext, UserProvider } from "@fxhash/contracts/context/User"
import { GenerativeToken } from "@fxhash/contracts/types/entities/GenerativeToken"
import { useContractOperation } from "@fxhash/contracts/hooks/useContractOperation"
import { useMintingState } from "@fxhash/contracts/hooks/useMintingState"
import {
  getReserveConsumptionMethod,
  reserveEligibleAmount,
  reserveSize,
} from "@fxhash/contracts/utils/generative-token/reserve"
import {
  IReserveConsumption,
  TMintOperationParams,
} from "@fxhash/contracts/services/contract-operations/Mint"
import { TMintV3OperationParams } from "@fxhash/contracts/services/contract-operations/MintV3"
import { ipfsGatewayUrl, EGatewayIpfs } from "@fxhash/contracts/services/Ipfs"
import { getMintOperationByToken } from "@fxhash/contracts/utils/getMintOperationByTokenVersion"
import { createApolloClient } from "@fxhash/gql/apollo"
import { Qu_genToken } from "@fxhash/gql/queries/generative-token"

import { GetServerSideProps } from "next"
import { User } from "@fxhash/contracts/types/entities/User"

interface Props {
  token: GenerativeToken
}

export default function Home(props) {
  const { token } = props
  const { connect, user, disconnect } = useContext(UserContext)

  const mintingState = useMintingState(token, false)
  const { hidden, enabled, locked, price } = mintingState

  const mintOperation = getMintOperationByToken(token)
  const { state, loading, success, call, error, opHash, opData, clear } =
    useContractOperation<TMintOperationParams | TMintV3OperationParams>(
      mintOperation.operation
    )

  const handleConnect = () => {
    connect()
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const liveMintingContext = null

  // the number of editions left in the reserve
  const reserveLeft = useMemo(() => reserveSize(token), [token])

  // only the reserve is available for minting
  const onlyReserveLeft = reserveLeft === token.balance
  // compute how many editions in reserve the user is eligible for
  const eligibleFor = useMemo(
    () =>
      user ? reserveEligibleAmount(user as User, token, liveMintingContext) : 0,
    [user, token]
  )
  const userEligible = eligibleFor > 0

  const forceReserveConsumption = false

  const reserveConsumption =
    (userEligible &&
      (onlyReserveLeft || forceReserveConsumption) &&
      getReserveConsumptionMethod(token, user as User, liveMintingContext)) ||
    null

  const handleMint = () => {
    call(
      mintOperation.getParams({
        token: token,
        price: price,
        reserveConsumption,
      })
    )
  }
  return (
    <>
        <Head>
          <title>playground</title>
        </Head>
        {!user && <button onClick={handleConnect}>connect</button>}
        {user && (
          <p>
            Hi <b>{user.name}</b>{" "}
            <button onClick={handleDisconnect}>logout</button>
          </p>
        )}
        <h1>{token.metadata.name}</h1>
        <img
          width={300}
          src={ipfsGatewayUrl(token.captureMedia.cid, EGatewayIpfs.FXHASH)}
        />
        <br />
        <button onClick={handleMint}>mint</button>
        <p>{loading && "loading"}</p>
        <p>{success && "success"}</p>
        <p>{error && "error"}</p>
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
