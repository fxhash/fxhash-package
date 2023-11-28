import SafeApiKit, { SafeInfoResponse } from "@safe-global/api-kit"
import Safe, { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit"
import { ethers } from "ethers-v5"
import { config } from "@fxhash/config"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import { EthereumWalletManager } from "./Wallet"
import { getAddress } from "viem"

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
  signer: ethers.providers.JsonRpcSigner | ethers.providers.Provider
): Promise<Safe> {
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
export async function getSafeFactory(
  signer: ethers.providers.JsonRpcSigner | ethers.providers.Provider
) {
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
export function getSafeService(
  signer: ethers.providers.JsonRpcSigner | ethers.providers.Provider
): SafeApiKit {
  // @ts-ignore
  return new SafeApiKit.default({
    txServiceUrl: config.eth.apis.safe,
    ethAdapter: getEthersAdapterForSafe(signer),
  })
}

/**
 * The function returns a new instance of the Web3Provider class from the ethers library, using the
 * ethereum object from the window object.
 * @returns a new instance of the ethers.providers.Web3Provider class, with the window.ethereum object
 * as the provider
 */
export function getWeb3Provider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider((window as any).ethereum, "any")
}

/**
 * The function returns a wallet provider object initialized with a private key and a JSON-RPC
 * provider.
 * @param {string} privateKey - A string representing the private key of a wallet.
 * @returns an instance of the ethers Wallet class, which is initialized with the provided private key
 * and a JsonRpcProvider instance.
 */
export function getWalletProvider(privateKey: string): ethers.Wallet {
  const provider = new ethers.providers.JsonRpcProvider(config.eth.apis.rpcs[0])
  return new ethers.Wallet(privateKey, provider)
}

/**
 * The function returns an EthersAdapter instance for a given signer.
 * @param signer - The `signer` parameter is an instance of `ethers.providers.JsonRpcSigner`. It
 * represents a signer object that can be used to sign Ethereum transactions and messages.
 * @returns an instance of the `EthersAdapter` class.
 */
export function getEthersAdapterForSafe(
  signer: ethers.Signer | ethers.providers.Provider
): EthersAdapter {
  const ethAdapter = new EthersAdapter({
    // @ts-ignore
    ethers,
    signerOrProvider: signer,
  })
  return ethAdapter
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
  safeTransactionData: SafeTransactionDataPartial,
  walletManager: EthereumWalletManager
) {
  const safeTransaction = await walletManager.safe.createTransaction({
    safeTransactionData,
  })

  const safeTxHash = await walletManager.safe.getTransactionHash(
    safeTransaction
  )
  const senderSignature = await walletManager.safe.signTransactionHash(
    safeTxHash
  )
  await getSafeService(walletManager.signer).proposeTransaction({
    safeAddress: await walletManager.safe.getAddress(),
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
export async function getUserSafes(
  provider: ethers.providers.JsonRpcSigner | ethers.providers.Provider,
  userAddress: string
) {
  return await getSafeService(provider).getSafesByOwner(userAddress)
}

/**
 * Retrieves pending transactions for a given safe address.
 * @param {string} safeAddress - address of a safe.
 * @returns pending transactions for the safe with the specified address.
 */
export async function getPendingTransactionsForSafe(
  provider: ethers.providers.JsonRpcSigner | ethers.providers.Provider,
  safeAddress: string
) {
  return await getSafeService(provider).getPendingTransactions(safeAddress)
}

/**
 * Retrieves all transactions associated with a given safe address.
 * @param {string} safeAddress - address of a safe contract.
 * @returns all transactions associated with the safe with the specified address.
 */
export async function getAllSafeTransactions(
  provider: ethers.providers.JsonRpcSigner | ethers.providers.Provider,
  safeAddress: string
) {
  return await getSafeService(provider).getAllTransactions(safeAddress)
}

/**
 * Retrieves information about a safe
 * @param {ethers.providers.JsonRpcSigner | ethers.providers.Provider} provider - The `provider`
 * parameter is an instance of `ethers.providers.JsonRpcSigner` or `ethers.providers.Provider`.
 * @param {string} safeAdress - The `safeAddress` parameter is a string that represents the address of
 * a safe.
 * @returns {SafeInfoResponse} safe data
 */
export async function getSafeData(
  provider: ethers.providers.JsonRpcSigner | ethers.providers.Provider,
  safeAdress: string
): Promise<SafeInfoResponse> {
  return await getSafeService(provider).getSafeInfo(safeAdress)
}

/**
 * Retrieves the provided safe creation information
 * @param {string} safeAddress - address of a safe contract.
 * @returns {SafeCreationInfoResponse} safe creation information
 */
export async function getSafeCreationInfo(
  provider: ethers.providers.JsonRpcSigner | ethers.providers.Provider,
  safeAddress: string
) {
  return await getSafeService(provider).getSafeCreationInfo(safeAddress)
}
