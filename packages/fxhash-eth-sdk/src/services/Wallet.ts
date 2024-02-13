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
  TransactionReceiptError,
  TransactionUnknownError,
  TransactionType,
  BlockchainType,
  WalletConnectionErrorReason,
  WalletConnectionError,
  invariant,
} from "@fxhash/contracts-shared"
import {
  Chain,
  PublicClient,
  TransactionNotFoundError,
  TransactionReceipt,
  UserRejectedRequestError,
  WalletClient,
} from "viem"
import { mainnet, base, baseSepolia, sepolia } from "viem/chains"
import Safe from "@safe-global/protocol-kit"
import { getSafeSDK } from "../services/Safe"
import { TEthereumContractOperation } from "./operations"
import { JsonRpcSigner } from "ethers"

export const chains: Record<string, Chain> =
  config.config.envName === "production"
    ? { [BlockchainType.ETHEREUM]: mainnet, [BlockchainType.BASE]: base }
    : { [BlockchainType.ETHEREUM]: sepolia, [BlockchainType.BASE]: baseSepolia }

export function getChainIdForChain(chain: BlockchainType) {
  return chains[chain].id
}

export function getCurrentChain(chain: BlockchainType): Chain {
  return config.config.envName === "production"
    ? chain === BlockchainType.ETHEREUM
      ? mainnet
      : base
    : chain === BlockchainType.ETHEREUM
      ? sepolia
      : baseSepolia
}

export function getConfigForChain(chain: BlockchainType) {
  return chain === BlockchainType.ETHEREUM ? config.eth : config.base
}

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

  isConnected(): boolean {
    return !(!this.walletClient.account || !this.walletClient.chain)
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
        // ! TODO: to fix
        // @ts-ignore
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
    } catch (error: any) {
      return failure(new Error(error))
    }
  }

  // ! TODO: to fix
  // @ts-ignore
  async sendTransaction<TParams>(
    OperationClass: TEthereumContractOperation<TParams>,
    params: TParams,
    blockchainType: BlockchainType
  ): PromiseResult<
    {
      type: TransactionType
      message: string
      hash: string
    },
    | WalletConnectionError
    | UserRejectedError
    | PendingSigningRequestError
    | InsufficientFundsError
    | TransactionRevertedError
    | TransactionUnknownError
  > {
    if (this.signingInProgress) {
      return failure(new PendingSigningRequestError())
    }
    this.signingInProgress = true

    // Prepare the contract operation
    const contractOperation = new OperationClass(this, params, blockchainType)

    for (let i = 0; i < this.rpcNodes.length + 2; i++) {
      try {
        const result = await this.prepareSigner({
          blockchainType,
        })
        if (result.isFailure()) {
          return failure(result.error)
        }

        // ! TODO: to fix
        // @ts-ignore
        await contractOperation.prepare()
        // ! TODO: to fix
        // @ts-ignore
        const operation = await contractOperation.call()
        // ! TODO: to fix
        // @ts-ignore
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
        } else if (error instanceof TransactionUnknownError) {
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
    | UserRejectedError
    | TransactionRevertedError
    | TransactionReceiptError
    | TransactionUnknownError
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
        return failure(new TransactionReceiptError())
      return failure(new TransactionUnknownError())
    }
  }

  /**
   * Prepare the Ethereum signer. Will add the chain config to the signer if it's not already there.
   * If the wrong chain is selected, it will switch to the correct chain.
   */
  public async prepareSigner({
    blockchainType,
  }: {
    blockchainType: BlockchainType
  }): PromiseResult<void, WalletConnectionError> {
    const chain = chains[blockchainType]
    try {
      const signerChainId = await this.walletClient.getChainId()
      if (signerChainId !== chain.id) {
        // Add the chain config to the wallet, if already set it will be ignored
        await this.addChain(chain)
        const result = await this.switchChain(chain)
        if (result.isFailure()) {
          return result
        }
      }
    } catch (error: any) {
      if (error.code === "UNSUPPORTED_OPERATION") {
        return failure(
          new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN)
        )
      }
    }
    return success()
  }

  private async addChain(chain: Chain): Promise<void> {
    try {
      await this.walletClient.addChain({ chain })
    } catch (error) {
      // Do nothing in case the wallet doesn't support adding chains
    }
  }

  private async switchChain(
    chain: Chain
  ): PromiseResult<void, WalletConnectionError> {
    try {
      await this.walletClient.switchChain({ id: chain.id })
      return success()
    } catch (error) {
      // Do nothing as we return an error below
    }
    return failure(
      new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN)
    )
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
