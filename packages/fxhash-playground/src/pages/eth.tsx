import Head from "next/head"
import { useContext, useEffect, useState } from "react"

import { UserContext as EthUserContext } from "@fxhash/evm-sdk/context/User"
import { getConfig } from "@fxhash/evm-sdk/services/Wallet"

import { ConnectKitButton } from "connectkit"
import {
  UploadOnchainCodeOperation,
  type TUploadOnchainCodeOperationParams,
} from "@fxhash/evm-sdk/services/operations/UploadOnchainCode"

import { CaptureMode, CaptureTriggerMode } from "@fxhash/contracts/types/Mint"
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
import { listToken } from "@fxhash/evm-sdk/services/operations/Marketplace"
import { parseEther } from "viem"

export default function EthPlayground(props: any) {
  const { connect, walletManager } = useContext(EthUserContext)
  const tokenId =
    "0x7c4b13b5893cd82f371c5e28f12fb2f37542bbc5:37874328891959367057980953554699571553718588281221769671817266699907421437953"
  const expiration = `${Math.floor(new Date().getTime() / 1000) + 1000000}`

  const paramsMintIssuer: TMintEthIssuerV1OperationParams = {
    data: {
      distribution: {
        enabled: true,
        editions: "100",
        royalties: "0",
        pricing: {
          pricingFixed: {
            price: "1000000",
            opensAt: new Date(0),
          },
          pricingDutchAuction: {
            levels: [],
          },
        },
        splitsPrimary: [
          {
            address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            pct: 500000,
          },
          {
            address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267",
            pct: 500000,
          },
        ],
        splitsSecondary: [
          {
            address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            pct: 100,
          },
        ],
        reserves: [],
      },
    },
    metadata: {
      artifactUri: "qdqsdqsdsq",
      name: "",
      symbol: "",
      displayUri: "dqsdqsdqsd",
      thumbnailUri: "qsdqsdqsdqsd",
      description: "",
      childrenDescription: "",
      tags: [],
      generativeUri: "dqsdqsdqsdq",
      authenticityHash: "",
      capture: {
        mode: CaptureMode.CUSTOM,
        triggerMode: CaptureTriggerMode.FN_TRIGGER,
      },
      decimals: 0,
      params: {
        definition: undefined,
        inputBytesSize: 0,
      },
    },
    metadataBytes: "",
    ticketMetadataBytes: "",
  }

  const mintFixedPriceParams: TMintFixedPriceEthV1OperationParams = {
    price: 1000000000000,
    mintId: 0,
    token: "0x41cafcfaa979cc5130cc891d4f1136e0b35fba83",
  }
  const createProjectOperation = new MintEthIssuerV1Operation(
    walletManager!,
    paramsMintIssuer
  )
  const mintFixedOperation = new MintFixedPriceEthV1Operation(
    walletManager!,
    mintFixedPriceParams
  )

  const handleConnect = async () => {
    await connect()
  }

  const handleCreateProject = () => {
    createProjectOperation.call()
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
          <button onClick={handleCreateProject}>createProject</button>
          <button onClick={handleMintFixed}>mintFixed</button>
          <button onClick={handleListToken}>listToken</button>
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}
