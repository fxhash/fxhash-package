import {
  PublicClient,
  WalletClient,
  encodeAbiParameters,
  getContract,
} from "viem"
import { FlattenedWhitelist, getWhitelistTree } from "./whitelist"
import { EMPTY_BYTES_32, ZERO_ADDRESS } from "./constants"
import { sign } from "viem/accounts"

/**
 * The ReserveListEntry type represents an entry in a reserve list, with an account address and an
 * index. It's a high level type for simpler manupulation of reserve lists.
 * @property account - The `account` property is a string that represents an Ethereum address. It is
 * prefixed with "0x" and followed by a series of hexadecimal characters.
 * @property {number} index - The `index` property is a number that represents the position or order of
 * the entry in a reserve list.
 */
export type ReserveListEntry = {
  account: `0x${string}`
  index: number
}

/**
 * The function `getFixedPriceMinterEncodedParams` takes a price, a whitelist, and a signer address as
 * input and returns the encoded parameters in ABI format.
 * @param {bigint} price - The `price` parameter is a `bigint` value representing the fixed price. It
 * is the cost or value associated with a particular item or service.
 * @param {FlattenedWhitelist} whitelist - The `whitelist` parameter is an array of objects
 * representing the whitelist. Each object in the array should have the following properties:
 * @param signer - The `signer` parameter is an Ethereum address represented as a string. It is used to
 * specify the address of the account that will sign the transaction.
 * @returns The function `getFixedPriceMinterEncodedParams` returns the encoded ABI parameters as a
 * result.
 */
export function getFixedPriceMinterEncodedParams(
  price: bigint,
  whitelist: FlattenedWhitelist = [],
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
 * encoded ABI parameters for a Dutch auction minter.
 * @param {bigint[]} prices - An array of bigints representing the prices for each step of the Dutch
 * auction.
 * @param {bigint} stepLength - The `stepLength` parameter is a `bigint` value that represents the
 * length of each step in the Dutch auction. It determines how much the price decreases at each step
 * until the auction ends.
 * @param {boolean} refundEnabled - A boolean value indicating whether refunds are enabled in the
 * auction.
 * @param {FlattenedWhitelist} whitelist - The `whitelist` parameter is an array of objects
 * representing addresses that are allowed to participate in the Dutch auction. Each object in the
 * array has the following structure:
 * @param signer - The `signer` parameter is the address of the account that will sign the transaction.
 * It is of type `address`.
 * @returns The function `getDutchAuctionMinterEncodedParams` returns the encoded parameters of a Dutch
 * auction minter.
 */
export function getDutchAuctionMinterEncodedParams(
  prices: bigint[],
  stepLength: bigint,
  refundEnabled: boolean,
  whitelist: FlattenedWhitelist = [],
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
