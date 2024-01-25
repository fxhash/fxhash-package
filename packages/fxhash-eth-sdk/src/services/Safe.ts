import SafeApiKit, { SafeInfoResponse } from "@safe-global/api-kit"
import Safe, { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit"
import {
  JsonRpcProvider,
  JsonRpcSigner,
  Provider,
  Signer,
  Wallet,
  ethers,
} from "ethers"
import {
  SafeSignature,
  MetaTransactionData,
} from "@safe-global/safe-core-sdk-types"
import { CURRENT_CHAIN, EthereumWalletManager } from "./Wallet"
import { getAddress } from "viem"
import { UserRejectedError } from "@fxhash/contracts-shared"

/**
 * The function `getSafeSDK` returns a Promise that resolves to an instance of the Safe SDK, given a
 * Safe address and a signer.
 * @param {string} safeAddress - The `safeAddress` parameter is a string that represents the address of
 * the Safe contract. This is the address of the specific Safe instance that you want to interact with.
 * @param signer - The `signer` parameter is an instance of `ethers.providers.JsonRpcSigner`. It
 * represents an Ethereum account that can sign transactions and messages. It is used to interact with
 * the Ethereum network and perform operations on behalf of the account.
 * @returns a Promise that resolves to an instance of the Safe class.
 */
export async function getSafeSDK(
  safeAddress: string,
  signer: JsonRpcSigner | Provider
): Promise<Safe> {
  // @dev: we have to add this otherwise it won't compile, however runtime is fine ...
  // @ts-ignore
  return await Safe.default.create({
    ethAdapter: getEthersAdapterForSafe(signer),
    safeAddress: safeAddress,
  })
}

/**
 * The function `getSafeFactory` creates a SafeFactory instance using a JsonRpcSigner.
 * @param signer - The `signer` parameter is an instance of `ethers.providers.JsonRpcSigner`. It
 * represents an Ethereum account that can sign transactions and interact with the Ethereum network.
 * @returns a Promise that resolves to a SafeFactory instance.
 */
export async function getSafeFactory(signer: JsonRpcSigner | Provider) {
  return await SafeFactory.create({
    ethAdapter: getEthersAdapterForSafe(signer),
  })
}

/**
 * The function `getSafeService` returns an instance of `SafeApiKit` with the specified signer and
 * configuration.
 * @param signer - The `signer` parameter is an instance of `ethers.providers.JsonRpcSigner`. It
 * represents an Ethereum account that can sign transactions and messages. It is used to authenticate
 * and authorize actions performed by the SafeApiKit instance.
 * @returns an instance of the `SafeApiKit` class.
 */
export function getSafeService(): SafeApiKit {
  // @dev: we have to add this otherwise it won't compile, however runtime is fine ...
  // @ts-ignore
  return new SafeApiKit.default({
    chainId: BigInt(CURRENT_CHAIN.id),
  })
}

/**
 * The function returns a wallet provider object initialized with a private key and a JSON-RPC
 * provider.
 * @param {string} privateKey - A string representing the private key of a wallet.
 * @returns an instance of the ethers Wallet class, which is initialized with the provided private key
 * and a JsonRpcProvider instance.
 */
export function getWalletProvider(
  privateKey: string,
  rpc: string
): ethers.Wallet {
  const provider = new JsonRpcProvider(rpc)
  return new Wallet(privateKey, provider)
}

/**
 * The function returns an EthersAdapter instance for a given signer.
 * @param signer - The `signer` parameter is an instance of `ethers.providers.JsonRpcSigner`. It
 * represents a signer object that can be used to sign Ethereum transactions and messages.
 * @returns an instance of the `EthersAdapter` class.
 */
export function getEthersAdapterForSafe(
  signer: Signer | Provider
): EthersAdapter {
  return new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  })
}

/**
 * The function proposes a safe transaction by creating a transaction, signing it, and then sending it
 * to the safe service.
 * @param {SafeTransactionDataPartial} safeTransactionData - The `safeTransactionData` parameter is an
 * object that contains the data for the safe transaction. It may include properties such as `to` (the
 * recipient address), `value` (the amount of ether to send), `data` (the transaction data),
 * `operation` (the type of operation
 * @param {EthereumWalletManager} walletManager - The `walletManager` parameter is an instance of the
 * `EthereumWalletManager` class. It is used to manage the Ethereum wallet and perform various
 * operations such as creating transactions, signing transaction hashes, and getting the wallet
 * address.
 * @returns the safeTxHash, which is the hash of the safe transaction.
 */
export async function proposeSafeTransaction(
  safeTransactionData: MetaTransactionData[],
  walletManager: EthereumWalletManager
) {
  const safeAddress = await walletManager.safe.getAddress()
  //to avoid having conflicting transactions where only one will be executable, we get the next nonce
  //and we use it to create the transaction so each transaction has a unique nonce
  const nextNonce = await getSafeService().getNextNonce(safeAddress)

  const safeTransaction = await walletManager.safe.createTransaction({
    transactions: safeTransactionData,
    options: {
      nonce: nextNonce,
    },
  })

  const safeTxHash = await walletManager.safe.getTransactionHash(
    safeTransaction
  )
  let senderSignature: SafeSignature
  try {
    senderSignature = await walletManager.safe.signTransactionHash(safeTxHash)
  } catch (error) {
    // User rejected signing the message
    if (error.action === "signMessage" && error.code === "ACTION_REJECTED") {
      throw new UserRejectedError()
    }
    throw error
  }
  await getSafeService().proposeTransaction({
    safeAddress: safeAddress,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: getAddress(walletManager.address),
    senderSignature: senderSignature.data,
  })
  return safeTxHash
}

/**
 * Retrieves the safes owned by a user.
 * @param {string} userAddress - The userAddress parameter is a string that represents the address of a
 * user.
 * @returns the list of safes related to the user.
 */
export async function getUserSafes(userAddress: string) {
  return await getSafeService().getSafesByOwner(userAddress)
}

/**
 * Retrieves pending transactions for a given safe address.
 * @param {string} safeAddress - address of a safe.
 * @returns pending transactions for the safe with the specified address.
 */
export async function getPendingTransactionsForSafe(safeAddress: string) {
  return await getSafeService().getPendingTransactions(safeAddress)
}

/**
 * Retrieves all transactions associated with a given safe address.
 * @param {string} safeAddress - address of a safe contract.
 * @returns all transactions associated with the safe with the specified address.
 */
export async function getAllSafeTransactions(safeAddress: string) {
  return await getSafeService().getAllTransactions(safeAddress)
}

/**
 * Retrieves information about a safe
 * @param {JsonRpcSigner | Provider} provider - The `provider`
 * parameter is an instance of `ethers.providers.JsonRpcSigner` or `ethers.providers.Provider`.
 * @param {string} safeAdress - The `safeAddress` parameter is a string that represents the address of
 * a safe.
 * @returns {SafeInfoResponse} safe data
 */
export async function getSafeData(
  safeAdress: string
): Promise<SafeInfoResponse> {
  return await getSafeService().getSafeInfo(safeAdress)
}

/**
 * Retrieves the provided safe creation information
 * @param {string} safeAddress - address of a safe contract.
 * @returns {SafeCreationInfoResponse} safe creation information
 */
export async function getSafeCreationInfo(safeAddress: string) {
  return await getSafeService().getSafeCreationInfo(safeAddress)
}
