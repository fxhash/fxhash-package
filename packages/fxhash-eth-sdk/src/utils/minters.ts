import {
  PublicClient,
  WalletClient,
  encodeAbiParameters,
  encodePacked,
  getContract,
} from "viem"
import {
  FlattenedWhitelist,
  MerkleTreeWhitelist,
  Whitelist,
  getWhitelistTree,
} from "./whitelist"
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
 * The function `getFixedPriceMinterEncodedParams` takes a price, a whitelist
 * merkle root, and a signer address as input and returns the encoded parameters
 * in ABI format.
 * @param price `bigint` value representing the fixed price. It is the cost or
 * value associated with a particular item or service.
 * @param whitelist A merkle tree with the elements in the list and the merkle
 * root, which represent the whitelist.
 * @param signer Ethereum address represented as a string. It is used to
 * specify the address of the account that will sign the transaction.
 * @returns the encoded ABI parameters, as expected by the smart contract.
 * @throws if the provided merkle tree's list doesn't match with its merkle
 * root.
 */
export function getFixedPriceMinterEncodedParams(
  price: bigint,
  whitelist?: MerkleTreeWhitelist | null,
  signer: `0x${string}` = ZERO_ADDRESS
) {
  let merkleRoot: `0x${string}` = EMPTY_BYTES_32

  if (whitelist) {
    if (whitelist.whitelist.length > 0) {
      const tree = getWhitelistTree(whitelist.whitelist)
      merkleRoot = tree.root as `0x${string}`
      if (merkleRoot !== whitelist.merkleRoot) {
        throw new Error(
          `The merkle root associated given whitelist (${whitelist.whitelist}) doesn't match with the merkle root which was computed as a check step (${merkleRoot}).`
        )
      }
    }
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
 * Given a set of tiered dutch auction parameters, returns hex string
 * reprensentation of the ABI encoded parameters as the Smart Contract expects.
 * @param prices Array of bigints representing the prices for each tier of the
 * Dutch Auction.
 * @param stepLength bigint` value that represents the time-duration of each
 * step in the Dutch auction. It determines how long each price stays active
 * until the auction ends.
 * @param refundEnabled A boolean value indicating whether refunds are enabled
 * in the auction. Refunds happen when the project has reached a final price
 * (all of its iterations have been minted) or when it has reached its resting
 * price. Collectors can then get a refund of the difference between what they
 * spent and this final price.
 * @param whitelist A merkle tree with the elements in the list and the merkle
 * root, which represent the whitelist.
 * @param signer Ethereum address represented as a string. It is used to
 * specify the address of the account that will sign the transaction.
 * @returns the encoded parameters of a Dutch auction minter.
 * @throws if the provided merkle tree's list doesn't match with its merkle
 * root.
 */
export function getDutchAuctionMinterEncodedParams(
  prices: bigint[],
  stepLength: bigint,
  refundEnabled: boolean,
  whitelist?: MerkleTreeWhitelist | null,
  signer: `0x${string}` = ZERO_ADDRESS
) {
  let merkleRoot: `0x${string}` = EMPTY_BYTES_32

  if (whitelist) {
    if (whitelist.whitelist.length > 0) {
      const tree = getWhitelistTree(whitelist.whitelist)
      merkleRoot = tree.root as `0x${string}`
      if (merkleRoot !== whitelist.merkleRoot) {
        throw new Error(
          `The merkle root associated given whitelist (${whitelist.whitelist}) doesn't match with the merkle root which was computed as a check step (${merkleRoot}).`
        )
      }
    }
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
