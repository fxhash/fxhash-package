import {
  ContractOperationCallback,
  ContractOperationStatus,
} from "../types/Contracts"
import { config } from "@fxhash/config"
import { TContractOperation } from "./contract-operations/contractOperation"
import { isOperationApplied } from "./Blockchain"
import { Address, createWalletClient, http } from "viem"
import { createConfig, configureChains } from "wagmi"
import { type WalletClient } from "wagmi"
import { mainnet, goerli, hardhat } from "wagmi/chains"
import { Config } from "wagmi"
import { getDefaultConfig } from "connectkit"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

export const chains = [mainnet, goerli, hardhat]

// the different operations which can be performed by the wallet
export enum EWalletOperations {
  UPDATE_PROFILE = "UPDATE_PROFILE",
  PUBLISH_GENERATIVE = "PUBLISH_GENERATIVE",
  UPDATE_GENERATIVE = "UPDATE_GENERATIVE",
  BURN_GENERATIVE = "BURN_GENERATIVE",
  BURN_GENERATIVE_SUPPLY = "BURN_GENERATIVE_SUPPLY",
  MINT_ITERATION = "MINT_ITERATION",
  LIST_TOKEN = "LIST_TOKEN",
  CANCEL_LISTING = "CANCEL_LISTING",
  COLLECT = "COLLECT",
  REPORT = "REPORT",
  MODERATE_TOKEN = "MODERATE_TOKEN",
  MODERATE_USER = "MODERATE_USER",
  VERIFY_USER = "VERIFY_USER",
  BAN_USER = "BAN_USER",
}

export function getProvider(rpcUrl: string): any {
  return jsonRpcProvider({
    rpc: chain => {
      // eslint-disable-next-line no-unused-labels
      return { http: rpcUrl }
    },
  })
}

export function getConfig(rpcUrl: string): Config {
  const { publicClient } = configureChains(chains, [getProvider(rpcUrl)])
  return createConfig(
    getDefaultConfig({
      // Required API Keys
      publicClient: publicClient,
      chains: chains,
      walletConnectProjectId: config.ETH_WALLET_CONNECT_ID,

      // Required
      appName: "FXHASH",

      // Optional
      appDescription:
        "fxhash is an open platform to mint and collect Generative Tokens.",
      appUrl: "https://fxhash.xyz", // your app's url
      appIcon:
        "https://gateway.fxhash2.xyz/ipfs/QmUQUtCenBEYQLoHvfFCRxyHYDqBE49UGxtcp626FZnFDG", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
  )
}

/**
 * The Wallet Manager class can be used to interract with Taquito API, by providing a level of abstration
 * so that the rest of the app is simpler to write
 * It is responsible for handlinf interactions with the contracts as well
 */
export class WalletManager {
  walletClient: WalletClient | undefined
  rpcNodes: string[] = [...config.ETH_RPC_NODES.split(",")]
  account: Address | undefined

  constructor(client) {
    this.walletClient = client
  }

  async disconnect(): Promise<void> {
    try {
      //TBD
    } catch (_) {
      /**
       * If an autonomy wallet is connected, then the disconnect method will throw an error
       * because it's a fake wallet provider. We can ignore this error
       */
    }
    //this.ethereumClient = undefined
  }

  getCurrentConfig(): Config {
    return getConfig(this.rpcNodes[0])
  }

  async connect(): Promise<string | false> {
    try {
      const [address] = await this.walletClient.requestAddresses()
      this.account = address
      return address
    } catch (error) {
      console.log(error)
      return false
    }
  }

  cycleRpcNode(): void {
    // re-arrange the RPC nodes array
    const out = this.rpcNodes.shift()
    this.rpcNodes.push(out)
    console.log(`update RPC provider: ${this.rpcNodes[0]}`)
    //TODO see how to do that
    const client = createWalletClient({
      chain: mainnet,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transport: http(this.rpcNodes[0]),
    })

    chains.forEach(chain => {
      client.addChain({ chain: chain })
    })
    this.walletClient = client
  }

  // given an error, returns true if request can be cycled to another RPC node
  canErrorBeCycled(err: any): boolean {
    return (
      err &&
      (err.name === "HttpRequestFailed" ||
        err.status === 500 ||
        err.status === 408)
    )
  }

  /**
   * Generic method to wrap Contract Interaction methods to add some general
   * logic required for each contract call (refetch, RPC cycling, checking
   * if operation is applied... etc)
   */
  async runContractOperation<Params>(
    OperationClass: TContractOperation<Params>,
    params: Params,
    statusCallback: ContractOperationCallback
  ): Promise<any> {
    // instanciate the class
    const contractOperation = new OperationClass(this, params)

    // we create a loop over the number of available nodes, representing retry
    // operations on failure. (exits under certain criteria)
    for (let i = 0; i < this.rpcNodes.length + 2; i++) {
      try {
        // run the preparations
        statusCallback?.(ContractOperationStatus.CALLING)
        await contractOperation.prepare()

        // now run the contract call
        const op = await contractOperation.call()

        // wait for the confirmation of the operation
        statusCallback?.(ContractOperationStatus.WAITING_CONFIRMATION)
        const opData = await isOperationApplied(op.transactionHash)

        // operation is injected, display a success message and exits loop
        return statusCallback?.(ContractOperationStatus.INJECTED, {
          hash: op.transactionHash,
          operation: op,
          opData: opData,
          // todo: remove this
          operationType: EWalletOperations.UPDATE_PROFILE,
          message: contractOperation.success(),
        })
      } catch (err: any) {
        console.log({ err })

        // if network error, and the nodes have not been all tried
        if (this.canErrorBeCycled(err) && i < this.rpcNodes.length) {
          this.cycleRpcNode()
          // retry after RPCs were swapped
          continue
        } else {
          // we just fail, and exit the loop
          return statusCallback?.(
            ContractOperationStatus.ERROR,
            err.description || err.message || null
          )
        }
      }
    }
  }
}