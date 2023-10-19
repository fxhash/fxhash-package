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

import { ABI as MintTicketFactoryABI } from "@/abi/FxTicketFactory"
import { WalletManager } from "../Wallet"

//Type definition of the parameters for the simulateContract function
export interface SimulateAndExecuteContractRequest {
  address: `0x${string}`
  abi: any[]
  functionName: string
  args: any[]
  account: string
  value?: bigint
}

/**
 * `handleContractError`
 * The function `handleContractError` handles contract errors by checking if the error is an instance
 * of `BaseError` and if it is, it checks if it is an instance of `ContractFunctionRevertedError` and
 * throws an error message based on the error name.
 * @param {any} error - The `error` parameter from the simulation of the contract function call.
 * object.
 */
export function handleContractError(error: any): never {
  //if it's an error sent by the contract, we want to throw a more meaningful error
  if (error instanceof BaseError) {
    const revertError = error.walk(
      err => err instanceof ContractFunctionRevertedError
    )
    if (revertError instanceof ContractFunctionRevertedError) {
      const errorName = revertError.data?.errorName ?? ""
      console.log("error: ", error)
      throw Error("Failed: " + errorName)
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
  walletManager: WalletManager,
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
    handleContractError(error)
  }
}

export async function predictTicketContractAddress(
  nonceAddress: string,
  walletManager: WalletManager
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
          config.eth.contracts.mint_ticket_impl_V1 as `0x${string}`,
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

export async function getTicketFactoryUserNonce(
  nonceAddress: string,
  walletManager: WalletManager
): Promise<bigint> {
  const ticketFactory = getContract({
    address: FxhashContracts.ETH_MINT_TICKETS_FACTORY_V1 as `0x${string}`,
    abi: MintTicketFactoryABI,
    walletClient: walletManager.walletClient,
    publicClient: walletManager.publicClient,
  })
  const nonce = await ticketFactory.read.nonces([nonceAddress])
  if (typeof nonce !== "bigint") {
    throw Error("Could not get nonce")
  }
  return nonce
}
