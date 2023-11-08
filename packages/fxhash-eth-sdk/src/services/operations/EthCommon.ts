import { FxhashContracts } from "@/contracts/Contracts"
import { config } from "@fxhash/config"
import {
  BaseError,
  ContractFunctionRevertedError,
  TransactionReceipt,
  concat,
  encodeAbiParameters,
  fromHex,
  getContract,
  getContractAddress,
  keccak256,
  toHex,
} from "viem"

import { FX_TICKETS_FACTORY_ABI } from "@/abi/FxTicketFactory"
import { Whitelist } from "@/utils"
import { EthereumWalletManager } from "@/services/Wallet"
import { getOpenChainError } from "@/services/Openchain"

export enum MintTypes {
  FIXED_PRICE,
  DUTCH_AUCTION,
  TICKET,
}

//Type definition for the primary and royalties receivers
export interface ReceiverEntry {
  account: string
  value: number
}

//Type definition of the parameters for the simulateContract function
export interface SimulateAndExecuteContractRequest {
  address: `0x${string}`
  abi: any[]
  functionName: string
  args: any[]
  account: string
  value?: bigint
}

export interface MintInfo {
  minter: string
  reserveInfo: {
    startTime: number
    endTime: number
    allocation: bigint
  }
  params: string
}

export interface InitInfo {
  name: string
  symbol: string
  primaryReceiver: string
  randomizer: string
  renderer: string
  tagIds: number[]
}

export interface ProjectInfo {
  onchain: boolean
  mintEnabled: boolean
  burnEnabled: boolean
  maxSupply: bigint
  inputSize: number
  contractURI: string
}

export interface MetadataInfo {
  baseURI: string
  imageURI: string
  onchainData: string
}

export interface ReserveInfo {
  startTime: number
  endTime: number
  allocation: bigint
}

export interface FixedPriceMintInfoArgs {
  type: MintTypes.FIXED_PRICE
  reserveInfo: ReserveInfo
  params: FixedPriceParams
}

export interface DutchAuctionMintInfoArgs {
  type: MintTypes.DUTCH_AUCTION
  reserveInfo: ReserveInfo
  params: DutchAuctionParams
}

export interface TicketMintInfoArgs {
  type: MintTypes.TICKET
  reserveInfo: ReserveInfo
}

export interface FixedPriceParams {
  price: bigint
  whitelist?: Whitelist
  mintPassSigner?: string
}

export interface DutchAuctionParams {
  prices: bigint[]
  stepLength: bigint
  refunded: boolean
  whitelist?: Whitelist
  mintPassSigner?: string
}

/**
 * `handleContractError`
 * The function `handleContractError` handles contract errors by checking if the error is an instance
 * of `BaseError` and if it is, it checks if it is an instance of `ContractFunctionRevertedError` and
 * throws an error message based on the error name.
 * @param {any} error - The `error` parameter from the simulation of the contract function call.
 * object.
 */
export async function handleContractError(error: any): Promise<string> {
  //if it's an error sent by the contract, we want to throw a more meaningful error
  if (error instanceof BaseError) {
    const revertError = error.walk(
      err => err instanceof ContractFunctionRevertedError
    )
    if (revertError instanceof ContractFunctionRevertedError) {
      let errorName = revertError.data?.errorName ?? ""
      if (!errorName) {
        errorName = await getOpenChainError(revertError.signature)
      }
      console.log("error: ", error)
      return "Failed: " + errorName
    }
  }
  throw error // Re-throwing error if it's not an instance of BaseError.
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
 * @returns a Promise that resolves to a TransactionReceipt object.
 */
export async function simulateAndExecuteContract(
  walletManager: EthereumWalletManager,
  args: SimulateAndExecuteContractRequest
): Promise<TransactionReceipt> {
  //fetch the account from the wallet
  const account = walletManager.walletClient.account
  try {
    //simulate the contract call
    const { request } = await walletManager.publicClient.simulateContract(args)

    //TODO: process the actual request result

    //execute the contract call
    const hash = await walletManager.walletClient.writeContract({
      ...request,
      account: account,
    })

    //wait for the transaction receipt
    const receipt = await walletManager.publicClient.waitForTransactionReceipt({
      hash,
    })
    console.log("tx success: ", receipt)
    return receipt
  } catch (error) {
    //handle any error from the execution
    const errorMessage = await handleContractError(error)
    throw Error(errorMessage)
  }
}

/**
 * The function `predictTicketContractAddress` predicts the contract address for a ticket contract
 * based on a given nonce address and wallet manager.
 * @param {string} nonceAddress - The `nonceAddress` parameter is a string representing the address
 * used to generate a unique nonce for the contract address.
 * @param {WalletManager} walletManager - The `walletManager` parameter is an instance of the
 * `WalletManager` class. It is used to interact with the Ethereum network and perform wallet-related
 * operations such as signing transactions and retrieving account information.
 * @returns a Promise that resolves to the perdicted contract address
 */
export async function predictTicketContractAddress(
  nonceAddress: string,
  walletManager: EthereumWalletManager
): Promise<string> {
  const salt = encodeAbiParameters(
    [
      { name: "address", type: "address" },
      { name: "nonce", type: "uint256" },
    ],
    [
      nonceAddress as `0x${string}`,
      await getTicketFactoryUserNonce(nonceAddress, walletManager),
    ]
  )
  return getContractAddress({
    bytecode: toHex(
      concat([
        fromHex("0x3d602d80600a3d3981f3363d3d373d3d3d363d73", "bytes"),
        fromHex(
          config.eth.contracts.mint_ticket_impl_v1 as `0x${string}`,
          "bytes"
        ),
        fromHex("0x5af43d82803e903d91602b57fd5bf3", "bytes"),
      ])
    ),
    from: config.eth.contracts.mint_ticket_factory_v1 as `0x${string}`,
    opcode: "CREATE2",
    salt: keccak256(salt),
  })
}

/**
 * The function `getTicketFactoryUserNonce` retrieves the nonce for a given address from a ticket
 * factory contract.
 * @param {string} nonceAddress - The `nonceAddress` parameter is a string representing the address for
 * which you want to retrieve the nonce. This address is used as an input to the `nonces` function of
 * the `ticketFactory` contract.
 * @param {WalletManager} walletManager - The `walletManager` parameter is an object that contains the
 * wallet client and public client. It is used to interact with the blockchain and perform operations
 * such as reading contract data and sending transactions.
 * @returns a Promise that resolves to the nonce as bigint
 */
export async function getTicketFactoryUserNonce(
  nonceAddress: string,
  walletManager: EthereumWalletManager
): Promise<bigint> {
  const ticketFactory = getContract({
    address: FxhashContracts.ETH_MINT_TICKETS_FACTORY_V1 as `0x${string}`,
    abi: FX_TICKETS_FACTORY_ABI,
    walletClient: walletManager.walletClient,
    publicClient: walletManager.publicClient,
  })
  const nonce = await ticketFactory.read.nonces([nonceAddress])
  if (typeof nonce !== "bigint") {
    throw Error("Could not get nonce")
  }
  return nonce
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
  return accounts.sort((a, b) => a.account.localeCompare(b.account))
}

/**
 * The `preparePrimaryReceivers` function prepares a list of primary receivers by sorting them alphabetically,
 * distributing a fee proportionally among them and adjusting the values to ensure the total is 10,000.
 * It also transforms the values to base 1_000_000.
 * @param {ReceiverEntry[]} receivers - An array of objects representing the primary receivers. Each
 * object has a "value" property indicating the amount to be received by that receiver.
 * @param {ReceiverEntry} feeReceiver - The `feeReceiver` parameter is an object that represents the
 * receiver who will receive the fee. It has the following properties:
 * @returns an array of ReceiverEntry objects.
 */
export function preparePrimaryReceivers(
  receivers: ReceiverEntry[]
): ReceiverEntry[] {
  // Calculate the original total value before fee distribution
  const originalTotal = receivers.reduce(
    (sum, account) => sum + account.value,
    0
  )
  /**
   * Check that the total is 10_000
   * This is a sanity check to make sure that the total is 100%
   */
  if (originalTotal !== 10_000) {
    throw Error("Primary receivers total must be 10000")
  }

  const feeReceiver: ReceiverEntry = {
    account: config.config.ethFeeReceiver,
    value: config.config.fxhashPrimaryFee,
  }
  // Calculate the fee ratio for each account
  const feeRatio = feeReceiver.value / originalTotal

  // Subtract the fee from each account proportionally and transform it to base 1_000_000
  receivers = receivers.map(account => ({
    ...account,
    value: (account.value - account.value * feeRatio) * 100,
  }))

  // Add the fee account with its full value
  receivers.push({
    account: feeReceiver.account,
    value: feeReceiver.value * 100,
  })

  receivers = sortReceiversAlphabetically(receivers)

  // Due to floating point precision, there might be a small discrepancy
  // from the intended total, so we can adjust the last account slightly
  const finalTotal = receivers.reduce((sum, account) => sum + account.value, 0)
  const discrepancy = 1_000_000 - finalTotal
  if (discrepancy !== 0) {
    receivers[receivers.length - 1].value += discrepancy
  }

  return receivers
}
