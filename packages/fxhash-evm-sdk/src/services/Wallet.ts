import { config } from "@fxhash/config"
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletManager,
  PromiseResult,
  failure,
  success,
} from "@fxhash/contracts-shared"
import {
  Address,
  PublicClient,
  TransactionReceipt,
  UserRejectedRequestError,
  WalletClient,
} from "viem"
import { mainnet, sepolia, hardhat } from "viem/chains"
import { TEthereumContractOperation } from "./operations"

//list of supported chains by the SDK
export const chains = [mainnet, sepolia, hardhat]
//Since the configuration of SDK is only for one chain at a time, we select the one configured
export const CURRENT_CHAIN = chains.find(
  chain => chain.name === config.eth.config.network
)

const rpcUrls = config.eth.apis.rpcs

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

interface EthereumWalletManagerParams {
  address: string
  walletClient: WalletClient
  publicClient: PublicClient
  rpcNodes: string[]
}

export class EthereumWalletManager extends WalletManager {
  private signingInProgress = false
  public walletClient: WalletClient
  public publicClient: PublicClient
  private rpcNodes: string[]

  constructor(params: EthereumWalletManagerParams) {
    super(params.address)
    this.walletClient = params.walletClient
    this.publicClient = params.publicClient
    this.rpcNodes = params.rpcNodes
  }

  async signMessage(
    message: string
  ): PromiseResult<string, PendingSigningRequestError | UserRejectedError> {
    if (this.signingInProgress) {
      return failure(new PendingSigningRequestError())
    }
    this.signingInProgress = true

    try {
      const signature = await this.walletClient.signMessage({
        message,
        account: this.address as `0x${string}`,
      })
      return success(signature)
    } catch (error) {
      if (error instanceof UserRejectedRequestError) {
        return failure(new UserRejectedError())
      }
      throw error
    } finally {
      this.signingInProgress = false
    }
  }

  async sendTransaction<TParams>(
    OperationClass: TEthereumContractOperation<TParams>,
    params: TParams
  ): PromiseResult<
    {
      operation: TransactionReceipt
      message: string
    },
    UserRejectedError | PendingSigningRequestError
  > {
    if (this.signingInProgress) {
      return failure(new PendingSigningRequestError())
    }
    this.signingInProgress = true

    // Prepare the contract operation
    const contractOperation = new OperationClass(this, params)

    for (let i = 0; i < this.rpcNodes.length + 2; i++) {
      try {
        await contractOperation.prepare()
        const operation = await contractOperation.call()
        const message = contractOperation.success()

        return success({
          operation,
          message,
        })
      } catch (error) {
        if (error instanceof UserRejectedRequestError) {
          return failure(new UserRejectedError())
        }
        // TODO try to catch insufficient funds error and return failure of new InsufficientFundsError()
        if (this.canErrorBeCycled(error) && i < this.rpcNodes.length) {
          this.cycleRpcNode()
          // retry after RPCs were swapped
          continue
        }
        throw error
      } finally {
        this.signingInProgress = false
      }
    }

    // This is not reachable, but TS doesn't know that so we need to return something here
    return failure(new UserRejectedError("Rpc nodes exhausted"))
  }

  // given an error, returns true if request can be cycled to another RPC node
  private canErrorBeCycled(err: any): boolean {
    return (
      err &&
      (err.name === "HttpRequestFailed" ||
        err.status === 500 ||
        err.status === 408)
    )
  }

  private cycleRpcNode() {
    // re-arrange the RPC nodes array
    const out = this.rpcNodes.shift()!
    this.rpcNodes.push(out)
    console.log(`update RPC provider: ${this.rpcNodes[0]}`)
    // TODO see how to do that - update the transport with the new RPC node on the fly (without recreating a new client instance)
    // this.walletClient.transport = http(this.rpcNodes[0])

    //   const account = this.walletClient?.account
    //   const client = createWalletClient({
    //     account: account,
    //     chain: CURRENT_CHAIN,
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     transport: http(rpcUrls[0]),
    //   })
    //   this.walletClient = client
  }
}
