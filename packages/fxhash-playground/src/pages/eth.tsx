import Head from "next/head"
import { useContext, useEffect, useState } from "react"

import { UserContext as EthUserContext } from "@fxhash/evm-contracts/context/User"
import { useContractOperation } from "@fxhash/contracts/hooks/useContractOperation"
import { ConnectKitButton } from "connectkit"
import { MintIssuerV3Operation, type TMintIssuerV3OperationParams } from "@fxhash/evm-contracts/services/contract-operations/MintIssuerV3"
import { UploadOnchainCodeOperation, type TUploadOnchainCodeOperationParams } from "@fxhash/evm-contracts/services/contract-operations/UploadOnchainCode"

import { CaptureMode, CaptureTriggerMode } from "@fxhash/contracts/types/Mint"
import { ScriptUpload } from "@fxhash/evm-contracts/types/OnChainCode"

import {
  Config,
  WagmiConfig
} from "wagmi"
import { ConnectKitProvider } from "connectkit";

export default function EthPlayground(props: any) {
  let { connect, walletManager } = useContext(EthUserContext);

  let wagmiConfig: Config | undefined = undefined
  if(walletManager) {
    wagmiConfig = walletManager?.getCurrentConfig()
  }

  const { state, loading, success, call, error, opHash, opData, clear } =
  useContractOperation<TMintIssuerV3OperationParams>(
    MintIssuerV3Operation
  )

  const params: TMintIssuerV3OperationParams = {
    data: {
      distribution: {
        enabled: true,
        editions: "100",
        royalties: "0",
        pricing: {
          pricingFixed: {
            price: "1000000",
            opensAt: new Date(),
          },
          pricingDutchAuction: {
            levels: []
          }
        },
        splitsPrimary: [
          {
            address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            pct: 500000
          },
          {
            address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267",
            pct: 500000
          }
        ],
        splitsSecondary: [
          {
            address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            pct: 100
          }
        ],
        reserves: []
      }
    },
    metadata: {
      artifactUri: "",
      name: "",
      symbol: "",
      displayUri: "",
      thumbnailUri: "",
      description: "",
      childrenDescription: "",
      tags: [],
      generativeUri: "",
      authenticityHash: "",
      capture: {
        mode: CaptureMode.CUSTOM,
        triggerMode: CaptureTriggerMode.FN_TRIGGER
      },
      decimals: 0,
      params: {
        definition: undefined,
        inputBytesSize: 0,
      }
    },
    metadataBytes: "",
    ticketMetadataBytes: "",
  }
  const createProjectOperation = new MintIssuerV3Operation(walletManager!, params)

  const handleConnect = async () => {
    if(!wagmiConfig && walletManager) {
      wagmiConfig = walletManager?.getCurrentConfig()
    }
    await connect()
  }

  const handleCreateProject = () => {
    createProjectOperation.call()
  }

  // State to hold the uploaded files
  const [uploadedFiles, setUploadedFiles] = useState<ScriptUpload[] | null>(null);

  // Handler for file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      let scriptUploads: ScriptUpload[] = [];
        for (let i = 0; i < files.length; i++) {
          const fileReader = new FileReader();
          const file = files[i];
          fileReader.readAsText(file);
          fileReader.onload = async () => {
            const fileData = fileReader.result as string;
            scriptUploads.push({
              scriptName: file.name,
              scriptContent: fileData,
              scriptDetails: "",
        })
        setUploadedFiles(scriptUploads);
      }
    }
  }
};

  // Handler to show uploaded files (For demonstration)
  const upload = () => {
    if (uploadedFiles) {
      const params: TUploadOnchainCodeOperationParams = {
        uploadRequests: uploadedFiles,
      }
      const uploadOperation = new UploadOnchainCodeOperation(walletManager!, params)
      uploadOperation.call()
  }};

  return (
    <>
      {/* File Upload Section */}
      <input
        type="file"
        multiple
        onChange={handleFileUpload}
      />
      <button onClick={upload}>Upload to ETH</button>
      <button onClick={handleConnect}>connect</button>

        {wagmiConfig && (<WagmiConfig config={wagmiConfig!}>
          <ConnectKitProvider>
            <Head>
              <title>playground</title>
            </Head>
              <ConnectKitButton />
              <button onClick={handleCreateProject}>createProject</button>
              <p>{loading && "loading"}</p>
              <p>{success && "success"}</p>
              <p>{error && "error"}</p>
          </ConnectKitProvider>
        </WagmiConfig>)}
    </>
  )
}
