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
import { listToken } from "@fxhash/evm-sdk/services/operations/Marketplace"
import {
  encodeAbiParameters,
  numberToHex,
  parseAbiParameters,
  parseEther,
} from "viem"

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
        minter: "0xD935876c9E718992BCB56937f43429DCC9ba8f89",
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
        minter: "0xa21DEE517111cEF1F3eb9a60A368D738b7eC7A45",
        reserveInfo: {
          startTime: new Date().getTime() + 100,
          endTime: new Date().getTime() + 500,
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
    price: 10000,
    mintId: 0,
    token: "0x41cafcfaa979cc5130cc891d4f1136e0b35fba83",
    amount: 1,
  }

  const mintDAParams: TMintDAEthV1OperationParams = {
    price: 10000,
    token: "0x9c80b32109ed0a6579be6b4ae0e6a4dbe16f3d27",
    amount: 1,
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

  const handleMintFixed = () => {
    mintFixedOperation.call()
  }

  const handleMintDA = () => {
    mintDAOperation.call()
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

  const handleMintFixed = () => {
    mintFixedOperation.call()
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
          <button onClick={handleMintFixed}>mintFixed</button>
          <button onClick={handleMintDA}>mintDA</button>
          <button onClick={handleListToken}>listToken</button>
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}
