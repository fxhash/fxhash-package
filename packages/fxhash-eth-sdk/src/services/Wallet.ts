import { config } from "@fxhash/config"
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletManager,
  PromiseResult,
  failure,
  success,
  InsufficientFundsError,
  TransactionRevertedError,
  TransactionType,
  TransactionReceiptError,
} from "@fxhash/contracts-shared"
import {
  PublicClient,
  TransactionNotFoundError,
  TransactionReceipt,
  UserRejectedRequestError,
  WalletClient,
} from "viem"
import { mainnet, sepolia, hardhat, goerli } from "viem/chains"
import Safe from "@safe-global/protocol-kit"
import { getSafeSDK } from "@/services/Safe"
import { TEthereumContractOperation } from "./operations"
import { JsonRpcSigner } from "ethers"

//list of supported chains by the SDK
export const chains = [mainnet, sepolia, goerli, hardhat]
//Since the configuration of SDK is only for one chain at a time, we select the one configured
export const CURRENT_CHAIN = chains.find(
  chain => chain.name === config.eth.config.network
)

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
  address: `0x${string}`
  walletClient: WalletClient
  publicClient: PublicClient
  rpcNodes: string[]
  signer: JsonRpcSigner
}

export class EthereumWalletManager extends WalletManager {
  private signingInProgress = false
  public walletClient: WalletClient
  public publicClient: PublicClient
  public signer: JsonRpcSigner
  public safe: Safe | undefined
  private rpcNodes: string[]

  constructor(params: EthereumWalletManagerParams) {
    super(params.address)
    this.walletClient = params.walletClient
    this.publicClient = params.publicClient
    this.rpcNodes = params.rpcNodes
    this.signer = params.signer
  }

  async signMessageWithWallet(
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

  /**
   * The `connectSafe` function connects to a Safe contract using a given address, and returns
   * the address of the connected Safe.
   * @param {string} safeAddress - A string representing the address of the safe. This is the address of
   * the smart contract that manages the safe and holds the funds.
   * @param signer - The `signer` parameter is of type `ethers.providers.JsonRpcSigner`. It represents a
   * signer object that can be used to sign transactions and messages using a private key.
   * @returns a `PromiseResult<string, Error>`.
   */
  async connectSafe(safeAddress: string): PromiseResult<string, Error> {
    if ((await this.safe?.getAddress()) === safeAddress) {
      return success(safeAddress)
    }
    try {
      const safeSdk = await getSafeSDK(safeAddress, this.signer)
      this.safe = safeSdk
      return success(safeAddress)
    } catch (error) {
      return failure(new Error(error))
    }
  }

  async sendTransaction<TParams>(
    OperationClass: TEthereumContractOperation<TParams>,
    params: TParams
  ): PromiseResult<
    {
      type: TransactionType
      message: string
      hash: string
    },
    | UserRejectedError
    | PendingSigningRequestError
    | InsufficientFundsError
    | TransactionRevertedError
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
          type: operation.type,
          message,
          hash: operation.hash,
        })
      } catch (error) {
        if (
          error instanceof UserRejectedRequestError ||
          // This can happen for Safe transactions
          error instanceof UserRejectedError
        ) {
          return failure(new UserRejectedError())
        } else if (error instanceof InsufficientFundsError) {
          return failure(error)
        } else if (error instanceof TransactionRevertedError) {
          return failure(error)
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

  async waitForTransaction({
    hash,
  }: {
    hash: string
  }): PromiseResult<
    TransactionReceipt,
    UserRejectedError | TransactionRevertedError | TransactionReceiptError
  > {
    try {
      const receipt = await this.publicClient.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
        confirmations: 2,
        timeout: 120_000,
      })
      if (receipt.status !== "success") {
        console.error("Transaction failed", receipt)
        return failure(new TransactionRevertedError("Execution reverted"))
      }
      console.log("tx success: ", receipt)
      return success(receipt)
    } catch (error: any) {
      if (error instanceof TransactionNotFoundError)
        return failure(
          new TransactionReceiptError(hash)
        )
      throw error
    }
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
