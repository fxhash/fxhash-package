import { BeaconWallet } from "@taquito/beacon-wallet"
import {
  ContractAbstraction,
  TezosToolkit,
  Wallet,
  WalletOperation,
} from "@taquito/taquito"
import { AbortedBeaconError, SigningType } from "@airgap/beacon-sdk"
import { encodeTezosSignInPayload } from "@fxhash/auth"
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletManager,
  PromiseResult,
  failure,
  success,
  NetworkError,
  BadRequestError,
  TransactionType,
  BlockchainType,
} from "@fxhash/shared"
import { TzktOperation } from "@/types/Tzkt"
import { isOperationApplied } from "./Blockchain"
import { TTezosContractOperation } from "./operations"

interface TezosWalletManagerParams {
  address: string
  beaconWallet: BeaconWallet
  tezosToolkit: TezosToolkit
  rpcNodes: string[]
}

export class TezosWalletManager extends WalletManager {
  private signingInProgress = false
  beaconWallet: BeaconWallet
  tezosToolkit: TezosToolkit
  contracts: Record<string, ContractAbstraction<Wallet> | null> = {}
  rpcNodes: string[]

  constructor(params: TezosWalletManagerParams) {
    super(params.address)
    this.beaconWallet = params.beaconWallet
    this.tezosToolkit = params.tezosToolkit
    this.rpcNodes = params.rpcNodes
  }

  async signMessageWithWallet(
    message: string
  ): PromiseResult<string, PendingSigningRequestError | UserRejectedError> {
    if (this.signingInProgress) {
      return failure(new PendingSigningRequestError())
    }
    this.signingInProgress = true

    try {
      const payloadBytes = encodeTezosSignInPayload(message)
      const { signature } = await this.beaconWallet.client.requestSignPayload({
        signingType: SigningType.MICHELINE,
        payload: payloadBytes,
        sourceAddress: this.address,
      })
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
