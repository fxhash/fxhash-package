import Head from "next/head"
import { useContext, useEffect, useState } from "react"

import { UserContext as EthUserContext } from "@fxhash/evm-sdk/context/User"
import { getConfig } from "@fxhash/evm-sdk/services/Wallet"

import { ConnectKitButton, getDefaultConfig } from "connectkit"

import { predictTicketContractAddress } from "@fxhash/evm-sdk/services/operations/EthCommon"

import { WagmiConfig, createConfig } from "wagmi"
import { ConnectKitProvider } from "connectkit"
import {
  MintEthIssuerV1Operation,
  TMintEthIssuerV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/MintIssuerEthV1"
import {
  MintFixedPriceEthV1Operation,
  TMintFixedPriceEthV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/MintFixedPriceEthV1"
import {
  ClaimTicketEthV1Operation,
  TClaimTicketEthV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/TicketClaimEthV1"
import {
  CreateTicketEthV1Operation,
  TCreateTicketEthV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/TicketCreateEthV1"
import {
  TicketDepositEthV1Operation,
  TTicketDepositEthV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/TicketDepositEthV1"
import {
  SetPriceTicketEthV1Operation,
  TSetPriceTicketEthV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/TicketSetPriceEthV1"
import {
  RedeemTicketEthV1Operation,
  TRedeemTicketEthV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/TicketRedeemEthV1"
import {
  WithdrawTicketEthV1Operation,
  TWithdrawTicketEthV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/TicketWithdrawEthV1"
import {
  encodeAbiParameters,
  numberToHex,
  parseAbiParameters,
  parseEther,
  toHex,
} from "viem"
import { config } from "@fxhash/config"
import LoadingSpinner from "@/components/Spinner/spinner"

/**
 *
 * Tx: Create Project with ticket: https://sepolia.etherscan.io/tx/0x84120cddb4c85214cd45bf54de1ea733fe5ebf4c17df7462d628aa676aafc505
 * Tx: Create ticket: https://sepolia.etherscan.io/tx/0x4d1bbc58b2f210f79a22676df29f4009c21e46ed0b7860444fffec90e9426588
 */
export default function EthPlayground(props: any) {
  const { walletManager } = useContext(EthUserContext)
  const now = Math.floor(new Date().getTime() / 1000)
  const price = BigInt(1000000000000000)
  const supply = 1000
  const [token, setToken] = useState("")
  const [ticket, setTicket] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const data = window.localStorage.getItem("token")
    if (data !== null && data !== "") setToken(data)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("token", token)
  }, [token])

  useEffect(() => {
    const data = window.localStorage.getItem("ticket")
    if (data !== null && data !== "") setTicket(data)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("ticket", ticket)
  }, [ticket])

  const handleCreateProjectFixed = async () => {
    setIsLoading(true)
    const predictedAddress = await predictTicketContractAddress(
      walletManager?.walletClient.account.address,
      walletManager
    )
    const encodedPredictedAddress = encodeAbiParameters(
      [{ name: "address", type: "address" }],
      [predictedAddress]
    )
    const paramsMintIssuerFixedWithTicket: TMintEthIssuerV1OperationParams = {
      initInfo: {
        name: "ticket test",
        symbol: "ticket",
        randomizer: config.eth.contracts!.randomizer_v1,
        renderer: config.eth.contracts!.renderer_v1,
        tagIds: [0],
      },
      projectInfo: {
        onchain: false,
        mintEnabled: true,
        burnEnabled: true,
        maxSupply: BigInt(supply),
        inputSize: 0,
        contractURI: "contractURI://",
      },
      metadataInfo: {
        baseURI: "baseURI://",
        imageURI: "imageURI://",
        onchainData: "",
      },
      mintInfo: [
        {
          minter: config.eth.contracts!.ticket_redeemer_v1,
          reserveInfo: {
            startTime: now + 60,
            endTime: now + 9999,
            allocation: BigInt(supply),
          },
          params: encodedPredictedAddress,
        },
      ],
      primaryReceivers: [
        "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b41",
        "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42",
      ],
      primaryBasisPoints: [500000, 500000],
      royaltiesReceivers: [
        "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b41",
        "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42",
      ],
      basisPoints: [500, 500],
    }
    const createProjectFixedOperation = new MintEthIssuerV1Operation(
      walletManager!,
      paramsMintIssuerFixedWithTicket
    )

    const tx = await createProjectFixedOperation.call()
    setToken(tx.logs[1].address)
    console.log(token)
    setIsLoading(false)
  }

  const handleCreateTicket = async () => {
    setIsLoading(true)

    const encodedParams = encodeAbiParameters(
      [
        { name: "price", type: "uint256" },
        { name: "merkleRoot", type: "bytes32" },
        { name: "signer", type: "address" },
      ],
      [
        BigInt(price),
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
      ]
    )
    const createTicketParams: TCreateTicketEthV1OperationParams = {
      gracePeriod: 0,
      token: token,
      baseURI: "baseURI://",
      mintInfo: [
        {
          minter: config.eth.contracts!.fixed_price_minter_v1,
          reserveInfo: {
            startTime: now + 60,
            endTime: now + 9999,
            allocation: BigInt(supply),
          },
          params: encodedParams,
        },
      ],
    }
    const createTicketOperation = new CreateTicketEthV1Operation(
      walletManager!,
      createTicketParams
    )
    const tx = await createTicketOperation.call()
    setTicket(tx.logs[1].address)
    console.log(ticket)
    setIsLoading(false)
  }

  const handleMintFixed = async () => {
    setIsLoading(true)

    const mintFixedPriceParams: TMintFixedPriceEthV1OperationParams = {
      price: price,
      mintId: 0,
      token: ticket,
      amount: BigInt(1),
    }

    const mintFixedOperation = new MintFixedPriceEthV1Operation(
      walletManager!,
      mintFixedPriceParams
    )
    await mintFixedOperation.call()
    setIsLoading(false)
  }

  const handleClaimTicket = async () => {
    setIsLoading(true)

    const claimTicketParams: TClaimTicketEthV1OperationParams = {
      ticket: ticket,
      tokenId: 1,
      newPrice: price + BigInt(1000),
      value: price + BigInt(2000),
    }

    const claimTicketOperation = new ClaimTicketEthV1Operation(
      walletManager!,
      claimTicketParams
    )
    await claimTicketOperation.call()
    setIsLoading(false)
  }

  const handleTicketDeposit = async () => {
    setIsLoading(true)

    const ticketDepositParams: TTicketDepositEthV1OperationParams = {
      ticket: ticket,
      tokenId: 1,
      value: BigInt(price),
    }

    const ticketDepositOperation = new TicketDepositEthV1Operation(
      walletManager!,
      ticketDepositParams
    )
    await ticketDepositOperation.call()
    setIsLoading(false)
  }

  const handleTicketSetPrice = async () => {
    setIsLoading(true)

    const setPriceParams: TSetPriceTicketEthV1OperationParams = {
      ticket: ticket,
      tokenId: 1,
      newPrice: BigInt(price * BigInt(2)),
    }

    const setPriceOperation = new SetPriceTicketEthV1Operation(
      walletManager!,
      setPriceParams
    )
    await setPriceOperation.call()
    setIsLoading(false)
  }

  const handleTicketRedeem = async () => {
    setIsLoading(true)

    const redeemParams: TRedeemTicketEthV1OperationParams = {
      ticket: ticket,
      tokenId: 1,
      params: "",
    }

    const redeemOperation = new RedeemTicketEthV1Operation(
      walletManager!,
      redeemParams
    )
    await redeemOperation.call()
    setIsLoading(false)
  }

  const handleWithdraw = async () => {
    setIsLoading(true)

    const withdrawParams: TWithdrawTicketEthV1OperationParams = {
      ticket: ticket,
      address: walletManager!.walletClient.account.address,
    }

    const withdrawOperation = new WithdrawTicketEthV1Operation(
      walletManager!,
      withdrawParams
    )
    await withdrawOperation.call()
    setIsLoading(false)
  }
  return (
    <>
      <WagmiConfig config={createConfig(getDefaultConfig(getConfig()))}>
        <ConnectKitProvider>
          <Head>
            <title>playground</title>
          </Head>
          <p>
            Last minted token = <b>{token}</b>
          </p>
          <p>
            Last minted ticket = <b>{ticket}</b>
          </p>
          {isLoading ? <LoadingSpinner /> : null}
          <ConnectKitButton />
          <button onClick={handleCreateProjectFixed}>createProjectFixed</button>
          <button onClick={handleCreateTicket}>createTicket</button>
          <button onClick={handleMintFixed}>mintFixed</button>
          <button onClick={handleClaimTicket}>
            handleClaimTicket (require changing wallet)
          </button>
          <button onClick={handleTicketDeposit}>handleTicketDeposit</button>
          <button onClick={handleTicketSetPrice}>handleTicketSetPrice</button>
          <button onClick={handleTicketRedeem}>handleTicketRedeem</button>
          <button onClick={handleWithdraw}>handleWithdraw</button>
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}
