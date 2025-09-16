import { config } from "@fxhash/config"
import {
  BaseError,
  ContractFunctionRevertedError,
  type TransactionReceipt,
  ContractFunctionExecutionError,
  InsufficientFundsError as InsufficientFundsErrorViem,
  TransactionExecutionError,
  type Chain,
  type Abi,
  type ContractFunctionName,
  type ContractFunctionArgs,
  type ContractFunctionParameters,
  erc20Abi,
  createPublicClient,
  http,
} from "viem"
import { FX_TICKETS_FACTORY_ABI } from "@/abi/FxTicketFactory.js"
import {
  ALLOCATION_BASE,
  MAX_UINT_64,
  type MerkleTreeWhitelist,
} from "@/utils/index.js"
import {
  type EthereumWalletManager,
  getConfigForChain,
  getCurrentChain,
} from "@/services/Wallet.js"
import { getOpenChainError } from "@/services/Openchain.js"
import { FX_ISSUER_FACTORY_ABI } from "@/abi/index.js"
import {
  BlockchainType,
  InsufficientFundsError,
  TransactionRevertedError,
  UserRejectedError,
} from "@fxhash/shared"
import { invariant } from "@fxhash/utils"
import {
  waitForCallsStatus,
  simulateCalls,
  readContract,
  simulateContract,
} from "viem/actions"

export enum MintTypes {
  FIXED_PRICE,
  DUTCH_AUCTION,
  TICKET,
}

//Type definition for the primary and royalties receivers
export interface ReceiverEntry {
  address: `0x${string}`
  pct: number
}

// Type definition of the parameters for the simulateContract function
export type SimulateAndExecuteContractRequest<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  > = ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
  chain extends Chain | undefined = Chain | undefined,
> = {
  account: `0x${string}`
  chain: chain
  value?: bigint
} & ContractFunctionParameters<
  abi,
  "nonpayable" | "payable",
  functionName,
  args
>

export interface MintInfo {
  minter: `0x${string}`
  reserveInfo: ReserveInfo
  params: `0x${string}`
}

export interface InitInfo {
  name: string
  symbol: string
  primaryReceivers: `0x${string}`[]
  allocations: number[]
  randomizer: `0x${string}`
  renderer: `0x${string}`
  tagIds: bigint[]
  onchainData: `0x${string}`
}

export interface ProjectInfo {
  mintEnabled: boolean
  burnEnabled: boolean
  maxSupply: bigint
  inputSize: bigint
  earliestStartTime: number
}

export interface MetadataInfo {
  baseURI: `0x${string}`
  onchainPointer: `0x${string}`
}

export interface ReserveInfo {
  startTime: bigint
  endTime: bigint
  allocation: bigint
}

export interface ReserveInfoArgs {
  startTime?: bigint
  endTime?: bigint
  allocation: bigint
}

export interface FixedPriceMintInfoArgs {
  type: MintTypes.FIXED_PRICE
  reserveInfo: ReserveInfoArgs
  params: FixedPriceParams | FarcasterFrameFixedPriceMintParams
  isFrame: boolean
}

export interface DutchAuctionMintInfoArgs {
  type: MintTypes.DUTCH_AUCTION
  reserveInfo: ReserveInfoArgs
  params: DutchAuctionParams
}

export interface TicketMintInfoArgs {
  type: MintTypes.TICKET
  reserveInfo: ReserveInfoArgs
}

export interface BaseReserves {
  whitelist?: MerkleTreeWhitelist
  mintPassSigner?: string
}

export interface FixedPriceParams extends BaseReserves {
  price: bigint
}

export interface FarcasterFrameFixedPriceMintParams {
  price: bigint
  maxAmountPerFid?: bigint
}

export interface DutchAuctionParams extends BaseReserves {
  prices: bigint[]
  stepLength: bigint
  refunded: boolean
}

export interface ConfigInfo {
  secondaryFeeAllocation: number
  primaryFeeAllocation: number
  lockTime: number
  referrerShare: bigint
  defaultMetadataURI: string
}

const getPublicAlchemyClient = (blockchainType: BlockchainType) => {
  return createPublicClient({
    chain: getCurrentChain(blockchainType),
    transport: http(getConfigForChain(blockchainType).apis.alchemy.rpc),
  })
}

/**
 * Defines a set of constant variables used by the Ethereum stack. There are
 * static and instanciated at runtime from the config.
 */
export const onchainConfig: ConfigInfo = {
  secondaryFeeAllocation: config.eth.config.fxhashFees.secondary,
  primaryFeeAllocation: config.eth.config.fxhashFees.primary,
  lockTime: config.config.projectLockTime,
  referrerShare: BigInt(config.config.referrerShare),
  defaultMetadataURI: config.apis.ethMetadata,
}

/**
 * `handleContractError`
 * The function `handleContractError` handles contract errors by checking if the error is an instance
 * of `BaseError` and if it is, it checks if it is an instance of `ContractFunctionRevertedError` and
 * throws an error message based on the error name.
 * @param {any} error - The `error` parameter from the simulation of the contract function call.
 * @param {object} options - Optional object that can contain property `ignoreInsufficientAllowance`.
 * If set to `true`, it will not rethrow if the error is an insufficient allowance error.
 * @returns a Promise that resolves to a string.
 */
export async function handleContractError(error: any): Promise<string> {
  // This can be thrown by the simulateContract function
  if (error instanceof ContractFunctionExecutionError) {
    const isInsufficientFundsError = error.walk(
      e => e instanceof InsufficientFundsErrorViem
    )
    if (isInsufficientFundsError) {
      throw new InsufficientFundsError()
    }
  }

  // This can be thrown by the writeContract function
  if (
    error instanceof TransactionExecutionError &&
    error.cause.name === "UserRejectedRequestError"
  ) {
    throw new UserRejectedError()
  }

  //if it's an error sent by the contract, we want to throw a more meaningful error
  if (error instanceof BaseError) {
    // Log the error, can be useful for debugging
    console.error(error)
    const revertError = error.walk(
      err => err instanceof ContractFunctionRevertedError
    )
    if (revertError instanceof ContractFunctionRevertedError) {
      let errorName = revertError.data?.errorName ?? ""
      if (!errorName) {
        errorName = revertError.signature
          ? await getOpenChainError(revertError.signature)
          : ""
      }
      if (errorName) {
        throw new TransactionRevertedError(errorName)
      }
      console.log("error: ", error)
      return `Failed: ${errorName}`
    }
    const executionError = error.walk(
      err => err instanceof ContractFunctionExecutionError
    )
    if (executionError instanceof ContractFunctionExecutionError) {
      throw new TransactionRevertedError(executionError.shortMessage)
    }
  }
  throw error // Re-throwing error if it's not an instance of BaseError.
}

/**
 * Helper function to check if a wallet supports batched transactions
 */
export async function supportsBatchedTransactions(
  walletManager: EthereumWalletManager,
  chain: Chain
): Promise<boolean> {
  const capabilities = await walletManager.walletClient.getCapabilities()
  return ["supported", "ready"].includes(
    (capabilities as Record<string, any>)[chain.id]?.atomic?.status
  )
}

interface ApprovalArgs {
  amount: bigint
  spenderAddress: `0x${string}`
  tokenAddress: `0x${string}`
  useSmartAccount: boolean
}

export type BatchedCall =
  | {
      to: `0x${string}`
      abi: any
      functionName: string
      args: any[]
      value?: bigint
    }
  | {
      to: `0x${string}`
      data: `0x${string}`
      value?: bigint
    }

export async function simulateAndExecuteContractWithApproval<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    "nonpayable" | "payable"
  > = ContractFunctionName<abi, "nonpayable" | "payable">,
>(
  walletManager: EthereumWalletManager,
  args: SimulateAndExecuteContractRequest<abi, functionName>,
  blockchainType: BlockchainType,
  approvalArgs?: ApprovalArgs,
  additionalOperations?: any[]
): Promise<string> {
  if (!approvalArgs && !additionalOperations)
    return simulateAndExecuteContract(walletManager, args)

  const account = walletManager.walletClient.account

  // if the consumer wants to use a smart account, we can batch the calls
  if (approvalArgs?.useSmartAccount) {
    const calls: BatchedCall[] = [
      {
        to: approvalArgs.tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [approvalArgs.spenderAddress, approvalArgs.amount],
      },
      {
        to: args.address,
        abi: args.abi,
        functionName: args.functionName,
        args: args.args as any[],
        value: args.value,
      },
    ]

    if (additionalOperations) {
      calls.unshift(...additionalOperations)
    }

    // On base, simulateCalls is not enabled in the public RPC nodes so we fallback to Alchemy as they support it
    // Once it's enabled on base, we can remove this fallback
    const publicClient =
      blockchainType === BlockchainType.BASE
        ? getPublicAlchemyClient(blockchainType)
        : walletManager.publicClient

    try {
      const { results } = await simulateCalls(publicClient, {
        account: walletManager.walletClient.account,
        calls: calls,
      })
      for (const result of results) {
        if (result.status === "failure") {
          const errorMessage = await handleContractError(result.error)
          throw new Error(errorMessage)
        }
      }
    } catch (error) {
      console.log("error when simulating batch call", error)
      if (error.message.includes("lack of funds")) {
        throw new InsufficientFundsError(error.message)
      }
      throw error
    }

    // if all simulations pass, execute the batch
    try {
      const { id } = await walletManager.walletClient.sendCalls({
        account,
        chain: args.chain,
        calls: calls,
        experimental_fallback: true,
      })

      // wait for the batch to complete
      const status = await waitForCallsStatus(walletManager.walletClient, {
        id,
      })

      // check if any transaction in the batch failed
      if (!status.receipts) throw new Error("failed to get batch status")
      for (const receipt of status.receipts || []) {
        if (receipt.status === "reverted") {
          throw new TransactionRevertedError("Batched transaction reverted")
        }
      }

      // return the hash of the last transaction, we assume that the last tx will always be the action we index
      return status.receipts[status.receipts.length - 1].transactionHash
    } catch (err: any) {
      console.log("error when executing batch call")
      console.log(err)
      throw err
    }
  }

  // todo: this a temporary fix for non-smart account wallets. We definitely
  //       need to clean the architecture cause this is fetting spaghetti
  if (additionalOperations && additionalOperations.length > 0) {
    console.log("executing additional operations")
    for (const op of additionalOperations) {
      console.log("executing additional operation", op)
      const txHash = await walletManager.walletClient.sendTransaction(op)
      console.log("waiting for additional operation", txHash)
      await walletManager.waitForTransaction({ hash: txHash })
    }
    console.log("additional operations executed")
  }

  if (approvalArgs) {
    console.log("approving and executing", approvalArgs)
    // otherwise, we approve + execute sequentially
    const approvalTxHash = await simulateAndExecuteContract(walletManager, {
      address: approvalArgs.tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [approvalArgs.spenderAddress, approvalArgs.amount],
      account: args.account,
      chain: args.chain,
    })

    console.log("waiting for approval", approvalTxHash)
    // wait for the approval before executing the main transaction
    await walletManager.waitForTransaction({ hash: approvalTxHash })
    console.log("approval executed")
  }

  console.log("executing", args)
  return simulateAndExecuteContract(walletManager, args)
}

/**
 * `simulateAndExecuteContract`
 * The function `simulateAndExecuteContract` takes in a public client, wallet client, and arguments,
 * and simulates and executes a contract transaction using the provided clients and arguments.
 * @param {PublicClient} publicClient - The `publicClient` parameter is an instance of a client that
 * interacts with a public blockchain network. It is used to simulate contract execution and wait for
 * transaction receipts.
 * @param {WalletClient} walletClient - The `walletClient` parameter is an instance of the WalletClient
 * class, which is used to interact with a wallet or blockchain client. It likely has methods for
 * reading and writing contracts, as well as accessing the account associated with the wallet.
 * @param {SimulateAndExecuteContractRequest} args - The `args` parameter is an object that contains
 * the necessary information to simulate and execute a contract. It likely includes properties such as
 * the contract address, the contract method to call, and any arguments required for the method.
 * @returns a Promise that resolves to the submitted hash.
 */
export async function simulateAndExecuteContract<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    "nonpayable" | "payable"
  > = ContractFunctionName<abi, "nonpayable" | "payable">,
>(
  walletManager: EthereumWalletManager,
  args: SimulateAndExecuteContractRequest<abi, functionName>
): Promise<string> {
  //fetch the account from the wallet
  const account = walletManager.walletClient.account

  invariant(walletManager.isConnected(), "wallet client account is not defined")

  try {
    //simulate the contract call
    const { request } = await simulateContract(
      walletManager.publicClient,
      args as any
    )

    //execute the contract call
    const hash = await walletManager.walletClient.writeContract({
      ...request,
      account: account!,
    })
    return hash
  } catch (error) {
    //handle any error from the execution
    const errorMessage = await handleContractError(error)
    throw Error(errorMessage)
  }
}

/**
 * Given a Reserve info where the fields are allowed to be undefined, define
 * such fields with their corresponding integer value based on the contract
 * design.
 * @param info Reserve info where fields are allowed to be undefined
 * @returns Reserve info without undefined fields
 */
export function defineReserveInfo(
  info: ReserveInfoArgs
): Required<ReserveInfo> {
  return {
    allocation: info.allocation,
    endTime: info.endTime ? info.endTime : MAX_UINT_64,
    startTime: info.startTime ? info.startTime : BigInt(0),
  }
}

/**
 * The function `predictFxContractAddress` predicts the contract address for a token or ticket
 * contract deployed from an fx factoryn based on the given parameters.
 * @param {string} nonceAddress - The address of the creator.
 * @param {"issuer" | "ticket"} factoryType - The `factoryType` parameter is a string that specifies
 * the type of factory contract to use. It can have two possible values: "issuer" or "ticket".
 * @param {EthereumWalletManager} walletManager - The `walletManager` parameter is an instance of the
 * `EthereumWalletManager` class. It is used to interact with the Ethereum network and manage wallets.
 * @returns the predicted address (checksummed).
 */
export async function predictFxContractAddress(
  nonceAddress: string,
  factoryType: "issuer" | "ticket",
  walletManager: EthereumWalletManager,
  blockchainType: BlockchainType
): Promise<`0x${string}`> {
  const chainConfig =
    blockchainType === BlockchainType.ETHEREUM ? config.eth : config.base
  await walletManager.prepareSigner({ blockchainType: blockchainType })
  const address = await readContract(walletManager.publicClient, {
    address:
      factoryType === "ticket"
        ? chainConfig.contracts.mint_ticket_factory_v1
        : chainConfig.contracts.issuer_factory_v1,
    abi:
      factoryType === "ticket" ? FX_TICKETS_FACTORY_ABI : FX_ISSUER_FACTORY_ABI,
    functionName:
      factoryType === "ticket" ? "getTicketAddress" : "getTokenAddress",
    args: [nonceAddress as `0x${string}`],
  })
  return address as `0x${string}`
}

/**
 * The function checks if an object is a valid transaction receipt by verifying the presence and types
 * of the transactionHash and blockHash properties.
 * @param {any} obj - The parameter `obj` is of type `any`, which means it can be any type of object.
 * @returns a boolean value.
 */
export function isTransactionReceipt(obj: any): obj is TransactionReceipt {
  return (
    obj &&
    typeof obj.transactionHash === "string" &&
    typeof obj.blockHash === "string"
  )
}

export function sortReceiversAlphabetically(
  accounts: ReceiverEntry[]
): ReceiverEntry[] {
  return accounts.sort((a, b) => a.address.localeCompare(b.address))
}

/**
 * Given a list of receivers, if the same receiver is set twice in the list,
 * merge those entry and add up their values.
 */
export function mergeSameReceivers(
  receivers: ReceiverEntry[]
): ReceiverEntry[] {
  const out: ReceiverEntry[] = []
  for (const receiver of receivers) {
    const f = out.find(r => r.address === receiver.address)
    if (f) f.pct += receiver.pct
    else out.push({ ...receiver })
  }
  return out
}

/**
 * The `prepareReceivers` function prepares a list of primary receivers by sorting them alphabetically,
 * distributing a fee proportionally among them and adjusting the values to ensure the total is 10,000.
 * It also transforms the values to base 1_000_000.
 * In the end, if an address is defined multiple times, the entries are merged
 * into one.
 * @param {ReceiverEntry[]} receivers - An array of objects representing the primary receivers. Each
 * object has a "value" property indicating the amount to be received by that receiver.
 * @param {ReceiverEntry} feeReceiver - The `feeReceiver` parameter is an object that represents the
 * receiver who will receive the fee. It has the following properties:
 * @param {ConfigInfo} config - The `config` parameter is onchain configuration of the contracts
 * @returns an array of ReceiverEntry objects.
 */
export function prepareReceivers(
  chain: BlockchainType,
  receivers: ReceiverEntry[],
  type: "primary" | "secondary"
): ReceiverEntry[] {
  // Calculate the original total value before fee distribution
  const originalTotal = receivers.reduce((sum, account) => sum + account.pct, 0)
  /**
   * Check that the total is 10_000
   * This is a sanity check to make sure that the total is 100%
   */
  if (originalTotal !== 10_000) {
    throw Error("Primary receivers total must be 10_000")
  }

  const feeReceiver: ReceiverEntry = {
    address: getConfigForChain(chain).config.ethFeeReceiver as `0x${string}`,
    pct:
      type === "primary"
        ? onchainConfig.primaryFeeAllocation
        : onchainConfig.secondaryFeeAllocation,
  }
  // Calculate the fee ratio for each account
  const feeRatio = feeReceiver.pct / ALLOCATION_BASE

  // Subtract the fee from each account proportionally and transform it to base 1_000_000
  receivers = receivers.map(account => ({
    ...account,
    pct: (account.pct - account.pct * feeRatio) * 100,
  }))

  // Add the fee account with its full value
  receivers.push({
    address: feeReceiver.address,
    pct: feeReceiver.pct * 100,
  })

  receivers = sortReceiversAlphabetically(receivers)

  // Due to floating point precision, there might be a small discrepancy
  // from the intended total, so we can adjust the last account slightly
  const finalTotal = receivers.reduce((sum, account) => sum + account.pct, 0)
  const discrepancy = 1_000_000 - finalTotal
  if (discrepancy !== 0) {
    receivers[receivers.length - 1].pct += discrepancy
  }

  return mergeSameReceivers(receivers)
}

/**
 * Reverses the fee deduction from each receiver in an array and
 * ensures that the total percentage is back to 10,000.
 * @param {ReceiverEntry[]} receivers - An array of objects representing the receivers. Each object
 * should have the following properties:
 * @param {"primary" | "secondary"} type - The `type` parameter is a string that can have two possible
 * values: "primary" or "secondary". It determines which fee allocation ratio to use for reversing the
 * fee deduction from each receiver.
 * @returns the properly processed `ReceiverEntry` array.
 */
export function revertReceiversFee(
  chain: BlockchainType,
  receivers: ReceiverEntry[],
  type: "primary" | "secondary"
): ReceiverEntry[] {
  // Define the fee ratio
  const feeRatio =
    type === "primary"
      ? onchainConfig.primaryFeeAllocation / ALLOCATION_BASE
      : onchainConfig.secondaryFeeAllocation / ALLOCATION_BASE

  // Reverse the fee deduction from each receiver
  const originalReceivers = receivers
    .filter(account => {
      if (account.address === getConfigForChain(chain).config.ethFeeReceiver) {
        return false
      }
      return true
    })
    .map(account => {
      return {
        ...account,
        // Reverse the fee deduction
        pct: Math.round(account.pct / (100 * (1 - feeRatio))),
      } as ReceiverEntry
    })
    .filter(account => account !== null) // Remove null (fee receiver)

  // Ensure the total is back to 10,000
  const total = originalReceivers.reduce(
    (sum, account) => (account ? sum + account.pct : 0),
    0
  )
  if (total !== ALLOCATION_BASE) {
    throw Error("The reverted receivers' total must be 10_000")
  }

  return originalReceivers
}
