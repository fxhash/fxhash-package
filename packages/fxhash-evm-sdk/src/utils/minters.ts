import {
  PublicClient,
  WalletClient,
  encodeAbiParameters,
  getContract,
} from "viem"
import { getWhitelistTree } from "./whitelist"
import { EMPTY_BYTES_32, ZERO_ADDRESS } from "./constants"
import { sign } from "viem/accounts"

/**
 * The function `getFixedPriceMinterEncodedParams` returns the encoded parameters for a fixed price
 * minter, including the price, whitelist, and signer.
 * @param {bigint} price - The `price` parameter is of type `bigint` and represents the fixed price
 * value. It is the amount that needs to be paid for a specific item or service.
 * @param {`0x`[]} whitelist - The `whitelist` parameter is an array of Ethereum addresses
 * represented as strings. It is used to specify a list of addresses that are allowed to purchase a
 * fixed price item.
 * @param signer - The `signer` parameter is an Ethereum address. It is represented as a hexadecimal
 * string starting with "0x".
 * @returns The function `getFixedPriceMinterEncodedParams` returns the encoded parameters of the
 * `price`, `merkleRoot`, and `signer` values.
 */
export function getFixedPriceMinterEncodedParams(
  price: bigint,
  whitelist: `0x${string}`[] = [],
  signer: `0x${string}` = ZERO_ADDRESS
) {
  let merkleRoot: `0x${string}` = EMPTY_BYTES_32
  if (whitelist.length > 0) {
    const tree = getWhitelistTree(whitelist)
    merkleRoot = tree.root as `0x${string}`
  }
  return encodeAbiParameters(
    [
      { name: "price", type: "uint256" },
      { name: "merkleRoot", type: "bytes32" },
      { name: "signer", type: "address" },
    ],
    [BigInt(price), merkleRoot, signer]
  )
}

/**
 * The function `getDutchAuctionMinterEncodedParams` takes in various parameters and returns the
 * encoded parameters for a Dutch auction minter.
 * @param {bigint[]} prices - An array of big integers representing the prices for each step in the
 * Dutch auction.
 * @param {number} stepLength - The `stepLength` parameter is a number that represents the number of
 * blocks between each price decrement in the Dutch auction.
 * @param {boolean} refundEnabled - A boolean value indicating whether refunds are enabled in the Dutch
 * auction.
 * @param {`0x${string}`[]} whitelist - The `whitelist` parameter is an array of Ethereum addresses
 * (`0x${string}`). It is used to specify a list of addresses that are allowed to participate in the
 * Dutch auction.
 * @param signer - The `signer` parameter is an Ethereum address (`0x` followed by 40 hexadecimal
 * characters) that represents the account that will sign the transaction.
 * @returns the encoded parameters of the Dutch auction minter.
 */
export function getDutchAuctionMinterEncodedParams(
  prices: bigint[],
  stepLength: bigint,
  refundEnabled: boolean,
  whitelist: `0x${string}`[] = [],
  signer: `0x${string}` = ZERO_ADDRESS
) {
  let merkleRoot: `0x${string}` = EMPTY_BYTES_32
  if (whitelist.length > 0) {
    const tree = getWhitelistTree(whitelist)
    merkleRoot = tree.root as `0x${string}`
  }
  return encodeAbiParameters(
    [
      {
        name: "auctionInfo",
        type: "tuple",
        components: [
          { name: "refunded", type: "bool" },
          { name: "stepLength", type: "uint248" },
          { name: "prices", type: "uint256[]" },
        ],
      },
      { name: "merkleRoot", type: "bytes32" },
      { name: "signer", type: "address" },
    ],
    [
      {
        refunded: refundEnabled,
        stepLength: stepLength,
        prices: prices,
      },
      merkleRoot,
      signer,
    ]
  )
}

/**
 * The function `signMintPass` signs a mint pass using a private key and returns the encoded signature.
 * @param {number} index - The `index` parameter is a number that represents the index of the mint
 * pass. It is used to identify a specific mint pass within the contract.
 * @param address - The `address` parameter is the Ethereum address of the user who wants to mint a
 * pass. It should be a string starting with "0x".
 * @param {WalletClient} walletClient - The `walletClient` parameter is an instance of a wallet client
 * that is used to interact with the user's wallet. It is typically used for signing transactions or
 * messages with the user's private key.
 * @param {PublicClient} publicClient - The `publicClient` parameter is an instance of a client that
 * interacts with the public blockchain network. It is used to read data from the blockchain and does
 * not require any private keys or signing capabilities.
 * @param privateKey - The `privateKey` parameter is a hexadecimal string representing the private key
 * used for signing the typed data hash. It should be in the format `0x` followed by a series of
 * hexadecimal characters.
 * @param minter - The `minter` parameter is the address of the contract or account that will be
 * responsible for minting the pass.
 * @param {any} abi - The `abi` parameter is the ABI (Application Binary Interface) of the smart
 * contract that you are interacting with. It is a JSON array that describes the functions and events
 * of the contract, including their names, inputs, and outputs. The ABI is used to encode and decode
 * function calls and event data
 * @returns the encoded ABI parameters of the signature, which includes the "v" (uint8), "r" (bytes32),
 * and "s" (bytes32) values.
 */
export async function signMintPass(
  index: number,
  address: `0x${string}`,
  walletClient: WalletClient,
  publicClient: PublicClient,
  privateKey: `0x${string}`,
  minter: `0x${string}`,
  abi: any
) {
  const contract = getContract({
    address: minter,
    abi: abi,
    walletClient: walletClient,
    publicClient: publicClient,
  })
  const typedDataHash = await contract.read.generateTypedDataHash([
    index,
    address,
  ])
  if (typeof typedDataHash !== "string") {
    throw Error("Could not get typed hash for mint pass")
  }
  const signature = await sign({
    hash: typedDataHash,
    privateKey: privateKey,
  })
  return encodeAbiParameters(
    [
      { type: "uint8", name: "v" },
      { type: "bytes32", name: "r" },
      { type: "bytes32", name: "s" },
    ],
    [Number(signature.v), signature.r, signature.s]
  )
}
