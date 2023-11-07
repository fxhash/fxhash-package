import {
  PublicClient,
  WalletClient,
  encodeAbiParameters,
  encodePacked,
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
 * The function `signMintPass` signs a mint pass using the provided parameters and returns the encoded
 * signature.
 * @param token - The `token` parameter is a string representing the token address. It should be in the
 * format `0x` followed by a hexadecimal string.
 * @param {number} reserveId - The `reserveId` parameter is a number that represents the ID of the
 * reserve. It is used to identify a specific reserve in the contract.
 * @param {number} index - The `index` parameter is a number that represents the index of the mint
 * pass. It is used to uniquely identify a specific mint pass within a reserve.
 * @param claimer - The `claimer` parameter is the Ethereum address of the account that will claim the
 * mint pass.
 * @param {WalletClient} walletClient - The `walletClient` parameter is an instance of a wallet client
 * that will be used to sign the mint pass.
 * @param {PublicClient} publicClient - The `publicClient` parameter is an instance of a client that
 * interacts with the public blockchain network. It is used to read data from the blockchain, such as
 * contract state or transaction information.
 * @param privateKey - The `privateKey` parameter is a hexadecimal string representing the private key
 * of the signer. It is used to sign the `typedDataHash` and generate a signature for the mint pass.
 * @param minter - The `minter` parameter is the address of the minter contract used for the mint pass
 * @param {any} abi - The `abi` parameter is the ABI (Application Binary Interface) of minter contract used
 * @returns the encoded packed values of the signature components (`signature.r`, `signature.s`, and
 * `signature.v`) as a `bytes32` array and a `uint8` value.
 */
export async function signMintPass(
  token: `0x${string}`,
  reserveId: number,
  index: number,
  claimer: `0x${string}`,
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
  const nonce = await contract.read.reserveNonce([token, reserveId])
  const typedDataHash = await contract.read.generateTypedDataHash([
    token,
    reserveId,
    nonce,
    index,
    claimer,
  ])
  if (typeof typedDataHash !== "string") {
    throw Error("Could not get typed hash for mint pass")
  }
  const signature = await sign({
    hash: typedDataHash,
    privateKey: privateKey,
  })
  return encodePacked(
    ["bytes32", "bytes32", "uint8"],
    [signature.r, signature.s, Number(signature.v)]
  )
}
