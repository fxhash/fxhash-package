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
} from "@fxhash/shared"
import {
  Account,
  Chain,
  HttpTransport,
  PublicClient,
  TransactionNotFoundError,
  TransactionReceipt,
  Transport,
  UserRejectedRequestError,
  WalletClient,
  createPublicClient,
  http,
  Client,
  createWalletClient,
  PrivateKeyAccount,
} from "viem"
import { mainnet, base, baseSepolia, sepolia } from "viem/chains"
import Safe, { EthersAdapter } from "@safe-global/protocol-kit"
import {
  getEthersAdapterForSafe,
  getSafeSDK,
  getWalletProvider,
} from "../services/Safe.js"
import { TEthereumContractOperation } from "./operations/index.js"
import {
  BrowserProvider,
  JsonRpcSigner,
  FallbackProvider,
  JsonRpcProvider,
} from "ethers"
import { privateKeyToAccount } from "viem/accounts"
/* Temp remove until package is esm compatible
import {
  fallback,
  unstable_connector,
  getConnectorClient,
  Config,
} from "@wagmi/core"
import { metaMask, walletConnect, coinbaseWallet } from "@wagmi/connectors"
*/

export type { PrivateKeyAccount }

export function clientToSigner(
  client: Client<Transport, Chain, Account>
): JsonRpcSigner {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}
/* Temp remove until package is esm compatible
export async function getEthersSigner(
  config: Config,
  { chainId }: { chainId?: number } = {}
) {
  const client = await getConnectorClient(config, { chainId })
  return clientToSigner(client)
}
*/
export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  if (transport.type === "fallback") {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network)
    )
    if (providers.length === 1) return providers[0]
    return new FallbackProvider(providers)
  }
  return new JsonRpcProvider(transport.url, network)
}
/* Temp remove until package is esm compatible
export async function getEthersProvider(
  config: Config,
  { chainId }: { chainId?: number } = {}
) {
  const client = await getConnectorClient(config, { chainId })
  return clientToProvider(client)
}
*/
export const chains: Record<string, Chain> =
  config.config.envName === "production"
    ? {
        [BlockchainType.ETHEREUM]: mainnet as Chain,
        [BlockchainType.BASE]: base as Chain,
      }
    : {
        [BlockchainType.ETHEREUM]: sepolia as Chain,
        [BlockchainType.BASE]: baseSepolia as Chain,
      }

export function getChainIdForChain(chain: BlockchainType) {
  return chains[chain].id
}

export function getCurrentChain(chain: BlockchainType): Chain {
  return (
    config.config.envName === "production"
      ? chain === BlockchainType.ETHEREUM
        ? mainnet
        : base
      : chain === BlockchainType.ETHEREUM
        ? sepolia
        : baseSepolia
  ) as Chain
}
/* Temp remove until package is esm compatible
export const defaultTransports = [
  unstable_connector(metaMask),
  unstable_connector(walletConnect),
  unstable_connector(coinbaseWallet),
]

export const transports: Record<string, Transport> =
  config.config.envName === "production"
    ? {
        [BlockchainType.ETHEREUM]: fallback([
          ...defaultTransports,
          http(prdConfig.eth.apis!.rpcs[0]),
          http(),
        ]),
        [BlockchainType.BASE]: fallback([
          ...defaultTransports,
          http(prdConfig.base.apis!.rpcs[0]),
          http(),
        ]),
      }
    : {
        [BlockchainType.ETHEREUM]: fallback([
          ...defaultTransports,
          http(devConfig.eth.apis!.rpcs[0]),
          http(),
        ]),
        [BlockchainType.BASE]: fallback([
          ...defaultTransports,
          http(devConfig.eth.apis!.rpcs[0]),
          http(),
        ]),
      }
*/
export function getConfigForChain(chain: BlockchainType): typeof config.eth {
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
  walletClient: WalletClient<Transport, Chain, Account>
  publicClient: PublicClient<Transport, Chain>
  rpcNodes?: string[]
  signer: JsonRpcSigner | PrivateKeyAccount
  ethersAdapterForSafe?: EthersAdapter
}

export class EthereumWalletManager extends WalletManager {
  private signingInProgress = false
  public walletClient: WalletClient<Transport, Chain, Account>
  public publicClient: PublicClient<Transport, Chain>
  public signer: JsonRpcSigner | PrivateKeyAccount
  public safe: Safe.default | undefined
  public ethersAdapterForSafe?: EthersAdapter
  private rpcNodes: string[]

  constructor(params: EthereumWalletManagerParams) {
    super(params.address)
    this.walletClient = params.walletClient
    this.publicClient = params.publicClient
    this.rpcNodes = params.rpcNodes || config.eth.apis!.rpcs
    this.signer = params.signer
    this.ethersAdapterForSafe = params.ethersAdapterForSafe
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
      let signature
      if (this.ethersAdapterForSafe) {
        signature = await (this.signer as PrivateKeyAccount).signMessage({
          message,
        })
      } else {
        signature = await this.walletClient.signMessage({
          message,
          // ! TODO: to fix
          // @ts-ignore
          account: this.address as `0x${string}`,
        })
      }
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
      let safeSdk
      if (this.ethersAdapterForSafe) {
        safeSdk = await Safe.default.create({
          ethAdapter: this.ethersAdapterForSafe,
          safeAddress: safeAddress,
        })
      } else {
        safeSdk = await getSafeSDK(safeAddress, this.signer as JsonRpcSigner)
      }
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
    // MetaMask will try to create an existing chain if the name is not the same
    // see https://github.com/wevm/viem/issues/1193 so to avoid this, we only add chain
    // different than mainnet (id 1) as we assume that mainnet is already added in all wallets
    if (chain.id === 1) {
      return
    }
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
      this.publicClient = createPublicClient<HttpTransport, Chain>({
        chain: chain,
        transport: http(),
      })
      return success()
    } catch (error) {
      console.log("error when switching chains:")
      console.log(error)
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

  static async fromPrivateKey(privateKey: `0x${string}`) {
    const chain = chains[BlockchainType.ETHEREUM]
    const transport = http(config.eth.apis.rpcs[0])
    const publicClient = createPublicClient({
      chain,
      transport,
    })
    const account = privateKeyToAccount(privateKey)
    const walletClient = createWalletClient({ account, chain, transport })
    invariant(walletClient, "walletClient is not set")
    return new EthereumWalletManager({
      publicClient,
      walletClient,
      address: account.address,
      signer: account,
      ethersAdapterForSafe: getEthersAdapterForSafe(
        getWalletProvider(privateKey, config.eth.apis.rpcs[0])
      ),
    })
  }
}
