import {
  ContractOperationCallback,
  ContractOperationStatus,
} from "../contracts/Contracts"
import { config } from "@fxhash/config"
import { TContractOperation } from "@/services/operations/contractOperation"
import { isOperationApplied } from "./Blockchain"
import { Address, createWalletClient, http } from "viem"
import { createConfig, configureChains } from "wagmi"
import { type WalletClient } from "wagmi"
import { mainnet, sepolia, hardhat } from "wagmi/chains"
import { Config } from "wagmi"
import { getDefaultConfig } from "connectkit"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

//list of supported chains by the SDK
export const chains = [mainnet, sepolia, hardhat]
//Since the configuration of SDK is only for one chain at a time, we select the one configured
export const CURRENT_CHAIN = chains.find(
  chain => chain.id === parseInt(config.ETH_CHAIN_ID)
)

const rpcUrls = config.ETH_RPC_NODES.split(",")

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

//Wrapper to get the proper provider for the chain with the corresponding configured RPC URL
export function getProvider(rpcUrl: string): any {
  return jsonRpcProvider({
    rpc: chain => {
      // eslint-disable-next-line no-unused-labels
      return { http: rpcUrl }
    },
  })
}

//WAGMI config that will be used for the wallet client
export function getConfig(): Config {
  const { publicClient } = configureChains(
    chains,
    rpcUrls.map(rpcUrl => getProvider(rpcUrl))
  )
  return createConfig(
    getDefaultConfig({
      publicClient: publicClient,
      chains: [CURRENT_CHAIN],
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
  account: Address | undefined

  constructor(client) {
    this.walletClient = client
  }

  async disconnect(): Promise<void> {
    this.walletClient = undefined
  }

  async connect(): Promise<string | false> {
    try {
      const [account] = await this.walletClient.requestAddresses()
      if (!this.walletClient) {
        this.walletClient = createWalletClient({
          account: account,
          chain: CURRENT_CHAIN,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          transport: http(rpcUrls[0]),
        })
      }
      return account
    } catch (error) {
      console.log(error)
      return false
    }
  }

  cycleRpcNode(): void {
    // re-arrange the RPC nodes array
    const out = rpcUrls.shift()
    rpcUrls.push(out)
    console.log(`update RPC provider: ${rpcUrls[0]}`)
    const account = this.walletClient?.account
    //TODO see how to do that
    const client = createWalletClient({
      account: account,
      chain: CURRENT_CHAIN,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transport: http(rpcUrls[0]),
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
    for (let i = 0; i < rpcUrls.length + 2; i++) {
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
        if (this.canErrorBeCycled(err) && i < rpcUrls.length) {
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
