import { BeaconWallet } from "@taquito/beacon-wallet"
import {
  ContractAbstraction,
  Signer,
  TezosToolkit,
  Wallet,
  WalletOperation,
  WalletProvider,
} from "@taquito/taquito"
import { InMemorySigner } from "@taquito/signer"
import {
  AbortedBeaconError,
  DAppClientOptions,
  NetworkType,
  SigningType,
} from "@airgap/beacon-sdk"
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletManager,
  NetworkError,
  BadRequestError,
  TransactionType,
  BlockchainType,
} from "@fxhash/shared"
import { PromiseResult, failure, success } from "@fxhash/utils"
import { TzktOperation } from "@/types/Tzkt"
import { isOperationApplied } from "./Blockchain"
import { TTezosContractOperation } from "./operations"
import { IAppMetadata, config } from "@fxhash/config"
import { encodeSignMessagePayload } from "./messages"

export function createBeaconConfig(metadata: IAppMetadata): DAppClientOptions {
  return {
    name: metadata.name,
    iconUrl: metadata.icon,
    network: {
      type: config.tez.config.network as NetworkType,
    },
  }
}

export const DefaultBeaconWalletConfig: DAppClientOptions = createBeaconConfig(
  config.config.metadata
)

export function isWalletProvider(
  provider: TezosProvider
): provider is TezosWalletProvider {
  return !!(provider as TezosWalletProvider).wallet
}

/**
 * Check whether a WalletProvider is a BeaconWallet (checking for the existence
 * of some properties from BeaconWallet
 */
export function isBeaconWallet(
  provider: WalletProvider
): provider is BeaconWallet {
  if (!(provider as BeaconWallet).client) return false
  const client = (provider as BeaconWallet).client
  if (client.requestSignPayload || client.requestOperation) return true
  return false
}

type TezosSignerProvider = {
  signer: Signer
}
type TezosWalletProvider = {
  wallet: WalletProvider
}
type TezosProvider =
  | {
      signer: Signer
    }
  | {
      wallet: WalletProvider
    }

interface TezosWalletManagerParams {
  address: string
  wallet: TezosProvider
  tezosToolkit?: TezosToolkit
  rpcNodes?: string[]
}

export class TezosWalletManager extends WalletManager {
  private signingInProgress = false
  wallet: TezosProvider
  tezosToolkit: TezosToolkit
  contracts: Record<string, ContractAbstraction<Wallet> | null> = {}
  rpcNodes: string[]

  constructor(params: TezosWalletManagerParams) {
    super(params.address)
    this.wallet = params.wallet
    this.tezosToolkit =
      params.tezosToolkit || new TezosToolkit(config.tez.apis.rpcs[0])
    if (isWalletProvider(params.wallet)) {
      this.tezosToolkit.setWalletProvider(params.wallet.wallet)
    } else {
      this.tezosToolkit.setSignerProvider(params.wallet.signer)
    }
    this.rpcNodes = params.rpcNodes || config.tez.apis.rpcs
  }

  /**
   * This method is used to get the public key of the active wallet.
   * @returns The public key of the wallet
   * @throws {Error} If there is an unexpected error
   */
  async getPublicKey(): Promise<string> {
    if (isWalletProvider(this.wallet)) {
      return this.wallet.wallet.getPK()
    } else {
      return this.wallet.signer.publicKey()
    }
  }

  /**
   * This method is used to get the public key hash of the active wallet.
   * @returns The public key hash of the wallet
   * @throws {Error} If there is an unexpected error
   */
  getPublicKeyHash(): Promise<string> {
    if (isWalletProvider(this.wallet)) {
      return this.wallet.wallet.getPKH()
    } else {
      return this.wallet.signer.publicKeyHash()
    }
  }

  /**
   * This method is used to sign a message with the wallet.
   * @param message The message to be signed
   * @returns The signature of the message
   * @throws {PendingSigningRequestError} If there is a pending signing request
   * @throws {UserRejectedError} If the user rejects the signing request
   * @throws {Error} If there is an unexpected error:console.warn();
   */

  async signMessageWithWallet(
    message: string
  ): PromiseResult<string, PendingSigningRequestError | UserRejectedError> {
    if (this.signingInProgress) {
      return failure(new PendingSigningRequestError())
    }
    this.signingInProgress = true

    try {
      const payloadBytes = encodeSignMessagePayload(message)
      let signature = null
      if (isWalletProvider(this.wallet)) {
        const provider = this.wallet.wallet
        // special case for BeaconWallet, requires calling requestSignPayload
        if (isBeaconWallet(provider)) {
          const res = await provider.client.requestSignPayload({
            signingType: SigningType.MICHELINE,
            payload: payloadBytes,
            sourceAddress: this.address,
          })
          signature = res.signature
        } else {
          const res = await this.wallet.wallet.sign(payloadBytes)
          signature = res
        }
      } else {
        const res = await this.wallet.signer.sign(payloadBytes)
        signature = res.sig
      }
      return success(signature)
    } catch (error) {
      if (error instanceof AbortedBeaconError) {
        return failure(new UserRejectedError())
      }
      throw error
    } finally {
      this.signingInProgress = false
    }
  }

  async sendTransaction<TParams>(
    OperationClass: TTezosContractOperation<TParams>,
    params: TParams,
    chain: BlockchainType
  ): PromiseResult<
    {
      type: TransactionType.ONCHAIN
      operation: WalletOperation
      message: string
      hash: string
    },
    UserRejectedError | PendingSigningRequestError
  > {
    if (this.signingInProgress) {
      return failure(new PendingSigningRequestError())
    }
    this.signingInProgress = true

    // Prepare the contract operation
    const contractOperation = new OperationClass(this, params, chain)

    for (let i = 0; i < this.rpcNodes.length + 2; i++) {
      try {
        await contractOperation.prepare()
        const operation = await contractOperation.call()
        const message = contractOperation.success()

        return success({
          type: TransactionType.ONCHAIN,
          operation,
          message,
          hash: operation.opHash,
        })
      } catch (error) {
        // TODO try to catch insufficient funds error and return failure of new InsufficientFundsError()
        if (error instanceof AbortedBeaconError) {
          return failure(new UserRejectedError())
        }
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
    // TODO real return type smth like BroadcastedError
  }): PromiseResult<TzktOperation[], UserRejectedError> {
    // TODO change isOperationApplied to return a PromiseResult
    return success(await isOperationApplied(hash))
  }

  /**
   * Search for the contract in the in-memory record of the class, creates it if it doesn't exist,
   * and then returns it.
   */
  async getContract(address: string): Promise<ContractAbstraction<Wallet>> {
    if (!this.contracts[address]) {
      this.contracts[address] = await this.tezosToolkit.wallet.at(address)
    }
    return this.contracts[address]!
  }

  /**
   * Given a RPC endpoint, makes a query to such endpoint by trying over all the
   * RPCs available if any fails with a retryable error.
   * @param endpoint The RPC endpoint which will be queried
   * @returns The JSON response from the RPC
   */
  async fetchRpc<ReturnType = any>(
    endpoint: `/${string}`
  ): PromiseResult<ReturnType, NetworkError | BadRequestError> {
    if (!endpoint.startsWith("/")) {
      return failure(
        new BadRequestError("RPC call endpoint must start with a '/'")
      )
    }
    for (let i = 0; i < this.rpcNodes.length + 2; i++) {
      try {
        const result = await fetch(`${this.rpcNodes[0]}${endpoint}`)
        return success(await result.json())
      } catch (err) {
        if (this.canErrorBeCycled(err) && i < this.rpcNodes.length) {
          this.cycleRpcNode()
          continue
        }
        return failure(new BadRequestError())
      }
    }
    return failure(new NetworkError())
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
    this.tezosToolkit.setProvider({ rpc: this.rpcNodes[0] })
  }

  /**
   * Factory method to create a new TezosWalletManager instance from a private key.
   * @param privateKeyOrWallet The private key of the wallet to connect to or the InMemorySigner instance.
   * @param options The options to create the instance.
   *  - `tezosToolkit` The TezosToolkit instance to use.
   *  - `wallet` The InMemorySigner instance to use.
   * @returns A promise that resolves with the new TezosWalletManager instance.
   */

  static async fromPrivateKey(
    privateKey: string,
    options?: { tezosToolkit?: TezosToolkit }
  ): Promise<TezosWalletManager>

  static async fromPrivateKey(
    wallet: InMemorySigner,
    options?: { tezosToolkit?: TezosToolkit }
  ): Promise<TezosWalletManager>

  static async fromPrivateKey(
    privateKeyOrWallet: string | InMemorySigner,
    options?: { tezosToolkit?: TezosToolkit }
  ) {
    // init signer from private key
    const wallet =
      privateKeyOrWallet instanceof InMemorySigner
        ? privateKeyOrWallet
        : await InMemorySigner.fromSecretKey(privateKeyOrWallet)
    // get public key hash
    const pkh = await wallet.publicKeyHash()
    return new TezosWalletManager({
      address: pkh,
      wallet: { signer: wallet },
      tezosToolkit:
        options?.tezosToolkit || new TezosToolkit(config.tez.apis.rpcs[0]),
    })
  }

  /**
   * Factory method to create a new TezosWalletManager instance from a BeaconWallet.
   * @param options The options to create the instance.
   *  - `wallet` The BeaconWallet instance to use.
   *  - `tezosToolkit` The TezosToolkit instance to use.
   * @returns A promise that resolves with the new TezosWalletManager instance.
   */

  static async fromBeaconWallet(options?: {
    wallet?: BeaconWallet
    tezosToolkit?: TezosToolkit
  }) {
    // init beacon wallet
    const wallet =
      options?.wallet || new BeaconWallet(DefaultBeaconWalletConfig)
    // request permission
    await wallet.requestPermissions()
    // get public key hash
    const pkh = await wallet.getPKH()
    return new TezosWalletManager({
      address: pkh,
      wallet: { wallet },
      tezosToolkit: options.tezosToolkit,
    })
  }
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
