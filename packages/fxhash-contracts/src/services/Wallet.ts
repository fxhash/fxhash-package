import { BeaconWallet } from "@taquito/beacon-wallet"
import {
  ContractAbstraction,
  TezosToolkit,
  Wallet,
  WalletOperation,
} from "@taquito/taquito"
import { char2Bytes } from "@taquito/utils"
import { AbortedBeaconError, SigningType } from "@airgap/beacon-sdk"
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletManager,
  PromiseResult,
  failure,
  success,
} from "@fxhash/contracts-shared"
import { TzktOperation } from "@/types/Tzkt"
import { isOperationApplied } from "./Blockchain"
import { TTezosContractOperation } from "./operations"

const TEZOS_SIGNING_PREFIX = "050100"

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
      const payloadBytes = this.encodeSignInPayload(message)
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
    params: TParams
  ): PromiseResult<
    {
      operation: WalletOperation
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
    this.tezosToolkit.setRpcProvider(this.rpcNodes[0])
  }

  /**
   * Encodes the payload into the desired format.
   *
   * @param {string} payload - The payload to encode.
   * @return {string} - The encoded payload.
   */
  private encodeSignInPayload(payload: string): string {
    const bytes = char2Bytes(payload)
    return TEZOS_SIGNING_PREFIX + char2Bytes(bytes.length.toString()) + bytes
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
