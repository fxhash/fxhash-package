import Head from "next/head"
import { useContext, useState } from "react"

import { UserContext as EthUserContext } from "@fxhash/evm-sdk/context/User"
import { getConfig } from "@fxhash/evm-sdk/services/Wallet"

import { ConnectKitButton } from "connectkit"
import {
  UploadOnchainCodeOperation,
  type TUploadOnchainCodeOperationParams,
} from "@fxhash/evm-sdk/services/operations/UploadOnchainCode"

import { ScriptUpload } from "@fxhash/evm-sdk/types/OnChainCode"

import { WagmiConfig } from "wagmi"
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
  MintDAEthV1Operation,
  TMintDAEthV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/MintDutchAuctionEthV1"
import {
  CreateTicketEthV1Operation,
  TCreateTicketEthV1OperationParams,
} from "@fxhash/evm-sdk/services/operations/TicketCreateEthV1"
import { listToken } from "@fxhash/evm-sdk/services/operations/Marketplace"
import {
  encodeAbiParameters,
  numberToHex,
  parseAbiParameters,
  parseEther,
} from "viem"
import { config } from "@fxhash/config"

export default function EthPlayground(props: any) {
  const { connect, walletManager } = useContext(EthUserContext)
  const tokenId =
    "0x7c4b13b5893cd82f371c5e28f12fb2f37542bbc5:37874328891959367057980953554699571553718588281221769671817266699907421437953"
  const expiration = `${Math.floor(new Date().getTime() / 1000) + 1000000}`

  const price = 10000
  const supply = 1000
  const dutchAuctionParams = {
    prices: [BigInt(1000), BigInt(900), BigInt(800), BigInt(700)],
    stepLength: BigInt(100),
    refunded: false,
  }

  const paramsMintIssuerFixed: TMintEthIssuerV1OperationParams = {
    projectInfo: {
      enabled: true,
      supply: BigInt(supply),
      onchain: false,
      contractURI: "contractURI://",
    },
    metadataInfo: {
      baseURI: "baseURI://",
      imageURI: "imageURI://",
      animation: {
        bodyTags: [],
        headTags: [],
      },
      attributes: {
        bodyTags: [],
        headTags: [],
      },
    },
    mintInfo: [
      {
        minter: config.eth.contracts!.fixed_price_minter_v1,
        reserveInfo: {
          startTime: 0,
          endTime: new Date().getTime() + 9999,
          allocation: BigInt(supply),
        },
        params: numberToHex(price, { size: 32 }),
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

  const paramsMintIssuerDA: TMintEthIssuerV1OperationParams = {
    ...paramsMintIssuerFixed,
    mintInfo: [
      {
        minter: config.eth.contracts!.dutch_auction_minter_v1,
        reserveInfo: {
          startTime: parseInt((new Date().getTime() / 1000).toFixed(0)),
          endTime: parseInt((new Date().getTime() / 1000 + 400).toFixed(0)),
          allocation: BigInt(1000),
        },
        params: encodeAbiParameters(
          parseAbiParameters(
            "(uint256[] prices, uint256 stepLength, bool refunded)"
          ),
          [
            {
              prices: dutchAuctionParams.prices,
              stepLength: dutchAuctionParams.stepLength,
              refunded: dutchAuctionParams.refunded,
            },
          ]
        ),
      },
    ],
  }

  const mintFixedPriceParams: TMintFixedPriceEthV1OperationParams = {
    price: price,
    mintId: 0,
    token: "0xc334cf6b32ee992c3999a3987f74c81154236f13",
    amount: 1,
  }

  const mintDAParams: TMintDAEthV1OperationParams = {
    price: 700,
    token: "0x68ced53942ed3ed628c300bd806bf9d23a67477e",
    reserveId: 0,
    amount: 1,
  }

  const createTicketParams: TCreateTicketEthV1OperationParams = {
    gracePeriod: 86_400,
    token: "0x41cafcfaa979cc5130cc891d4f1136e0b35fba83",
    baseURI: "baseURI://",
  }

  const createProjectFixedOperation = new MintEthIssuerV1Operation(
    walletManager!,
    paramsMintIssuerFixed
  )
  const createProjectDAOperation = new MintEthIssuerV1Operation(
    walletManager!,
    paramsMintIssuerDA
  )
  const mintFixedOperation = new MintFixedPriceEthV1Operation(
    walletManager!,
    mintFixedPriceParams
  )
  const mintDAOperation = new MintDAEthV1Operation(walletManager!, mintDAParams)

  const handleConnect = async () => {
    await connect()
  }

  const handleCreateProjectFixed = () => {
    createProjectFixedOperation.call()
  }

  const handleCreateProjectDA = () => {
    createProjectDAOperation.call()
  }

  const createTicketOperation = new CreateTicketEthV1Operation(
    walletManager!,
    createTicketParams
  )

  const handleMintFixed = () => {
    mintFixedOperation.call()
  }

  const handleMintDA = () => {
    mintDAOperation.call()
  }

  const handleCreateTicket = () => {
    createTicketOperation.call()
  }

  const handleListToken = async () => {
    await listToken(
      [
        {
          token: tokenId,
          weiPrice: parseEther("0.00000000001").toString(),
          orderbook: "reservoir",
          orderKind: "seaport-v1.5",
          expirationTime: expiration,
        },
      ],
      walletManager.walletClient!
    )
  }

  // State to hold the uploaded files
  const [uploadedFiles, setUploadedFiles] = useState<ScriptUpload[] | null>(
    null
  )

  // Handler for file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const scriptUploads: ScriptUpload[] = []
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader()
        const file = files[i]
        fileReader.readAsText(file)
        fileReader.onload = async () => {
          const fileData = fileReader.result as string
          scriptUploads.push({
            scriptName: file.name,
            scriptContent: fileData,
            scriptDetails: "",
          })
          setUploadedFiles(scriptUploads)
        }
      }
    }
  }

  // Handler to show uploaded files (For demonstration)
  const upload = () => {
    if (uploadedFiles) {
      const params: TUploadOnchainCodeOperationParams = {
        uploadRequests: uploadedFiles,
      }
      const uploadOperation = new UploadOnchainCodeOperation(
        walletManager!,
        params
      )
      uploadOperation.call()
    }
  }

  return (
    <>
      {/* File Upload Section */}
      <input type="file" multiple onChange={handleFileUpload} />
      <button onClick={upload}>Upload to ETH</button>
      <button onClick={handleConnect}>connect</button>

      <WagmiConfig config={getConfig()}>
        <ConnectKitProvider>
          <Head>
            <title>playground</title>
          </Head>
          <ConnectKitButton />
          <button onClick={handleCreateProjectFixed}>createProjectFixed</button>
          <button onClick={handleCreateProjectDA}>createProjectDA</button>
          <button onClick={handleCreateTicket}>createTicket</button>
          <button onClick={handleMintFixed}>mintFixed</button>
          <button onClick={handleMintDA}>mintDA</button>
          <button onClick={handleListToken}>listToken</button>
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}
