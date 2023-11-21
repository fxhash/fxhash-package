import { StandardMerkleTree } from "@openzeppelin/merkle-tree"
import { ReserveListEntry } from "./minters"
import { gqlClient } from "@fxhash/gql-client"
import {
  Mu_CreateWhitelist,
  Qu_GetReserves,
  Qu_GetWhitelists,
} from "@fxhash/gql"

/**
 * High level wrapper time for the whitelist for easier use in the UI
 * @dev this type should used for user manipulations
 * @dev to transform it to the format that is used in the smart contracts, you
 * can use the `flattenWhitelist` function
 */
export type Whitelist = Map<`0x${string}`, number>

/**
 * Wrapper type for the whitelist type that is used in the smart contracts. The
 * format is [index, allocation][].
 * @dev this type should be used for smart contract interactions
 * @dev to transform it to the format that is used in the UI, you can use the
 *`flattenWhitelist` and `inflateWhitelist` utilities.
 */
export type FlattenedWhitelist = string[][]

/**
 * The merkle root in a hex string of a 32 bytes sequence prefixed by 0x.
 */
export type MerkleRoot = `0x${string}`

/**
 * The above type represents a project whitelist with a project ID, merkle root,
 * and a flattened whitelist. It is used to represent a project whitelist stored
 * in the db.
 * @property merkleRoot - The `merkleRoot` property is a string that r
 */
export type MerkleTreeWhitelist = {
  /**
   * Represents the Merkle root hash of a Merkle tree. A Merkle tree is a data
   * structure that is used to efficiently verify the integrity of large data
   * sets. The Merkle root is a hash value that is computed by hashing together
   * the flattened whitelist.
   */
  merkleRoot: MerkleRoot

  /**
   * The whitelist flattened: [address, allocation][]
   */
  whitelist: FlattenedWhitelist
}

/**
 * The type WhitelistReserveData represents data containing a merkle root allow list and a list of consumed slots.
 * @property {string} merkleRoot - The `merkleRoot` property is a string that represents the root hash
 * of a Merkle tree.
 * @property {string[][]} consumedSlots - The `consumedSlots` property is an array of arrays of
 * strings. Each inner array represents a slot (index and address of a user) that has been consumed.
 */
export type WhitelistReserveData = {
  merkleRoot: string
  consumedSlots: ReserveListEntry[]
}

/**
 * The function `getWhitelistTree` takes a whitelist and returns a Merkle tree of flattened whitelist
 * entries.
 * @param {Whitelist} whitelist - The `whitelist` parameter is of type `Whitelist`. It represents a
 * data structure that contains a list of addresses and their corresponding permissions.
 * @returns a StandardMerkleTree object.
 */
export function getWhitelistTree(
  whitelist: FlattenedWhitelist
): StandardMerkleTree<string[]> {
  const tree = StandardMerkleTree.of(whitelist, ["uint256", "address"])

  return tree
}

/**
 * The `flattenWhitelist` function takes a whitelist object and returns a flattened version of it,
 * where each entry is repeated a number of times based on its associated number property.
 * @param {Whitelist} whitelist - The `whitelist` parameter is of type `Whitelist`, which is likely an
 * object or a map-like data structure. It contains entries where each key is a string and each value
 * is a number. The key represents a string value, and the value represents the number of times that
 * string should be
 * @returns a flattened whitelist, which is an array of arrays. Each inner array contains two elements:
 * the index as a string and the corresponding whitelist entry.
 */
export function flattenWhitelist(whitelist: Whitelist): FlattenedWhitelist {
  const flattenedWhitelist: FlattenedWhitelist = []
  let index = 0
  // Iterate through each record
  for (const whitelistEntry of whitelist.entries()) {
    // Use the `number` property of the record to determine how many times to add the string to the array
    for (let i = 0; i < whitelistEntry[1]; i++) {
      flattenedWhitelist[index] = [index.toString(), whitelistEntry[0]]
      index++
    }
  }

  return flattenedWhitelist
}

/**
 * The function takes a flattened whitelist and converts it into a map where each address is a key and
 * the number of occurrences is the value.
 * @param {FlattenedWhitelist} flattenedWhitelist - The parameter `flattenedWhitelist` is of type
 * `FlattenedWhitelist`.
 * @returns a `Whitelist` object, which is a `Map` containing addresses as keys and the number of
 * occurrences of each address as values.
 */
export function inflateWhitelist(
  flattenedWhitelist: FlattenedWhitelist
): Whitelist {
  const whitelist: Whitelist = new Map()
  for (const entry of flattenedWhitelist) {
    const address = entry[1] as `0x${string}`
    if (whitelist.has(address)) {
      whitelist.set(address, whitelist.get(address) + 1)
    } else {
      whitelist.set(address, 1)
    }
  }

  return whitelist
}

/**
 * The function `uploadWhitelist` uploads a whitelist to a server using Hasura actions
 * and logs a success message if the upload is successful, otherwise it throws an error
 * with a failure message.
 * @param {Whitelist} whitelist - The `whitelist` parameter is an object that represents the whitelist
 * data to be uploaded. It is of type `Whitelist`.
 */
export async function uploadWhitelist(
  whitelist: Whitelist
): Promise<`0x${string}`> {
  const { data } = await gqlClient.mutation(Mu_CreateWhitelist, {
    whitelist: flattenWhitelist(whitelist),
  })
  if (data.set_whitelist.success) {
    console.log("Whitelist uploaded successfully")
  } else {
    throw new Error("Failed to upload whitelist: " + data.set_whitelist.message)
  }
  return data.set_whitelist.merkleRoot as `0x${string}`
}

/**
 * getProof returns a Merkle proof for a given address for a whitelist.
 * @param tree - The `tree` parameter is a StandardMerkleTree object.
 * @param flattenedWhitelist - The `flattenedWhitelist` parameter is an array of strings, where each
 * string represents an Ethereum address.
 * @param address - The `address` parameter is a string that represents an Ethereum address.
 * @returns an array of strings with a single value, which is a Merkle proof hex string
 */
export function getProof(
  tree: StandardMerkleTree<string[]>,
  flattenedWhitelist: FlattenedWhitelist,
  address: string
): string[] {
  const index = getUserWhitelistIndex(flattenedWhitelist, address)
  return tree.getProof(index)
}

/**
 * The function `getUserWhitelistIndex` returns the index of a user's address in a flattened whitelist
 * array.
 * @param {FlattenedWhitelist} flattenedWhitelist - An array of entries in the whitelist. Each entry is
 * an array with two elements: the first element is the index of the user in the original whitelist,
 * and the second element is the user's address.
 * @param {string} address - The `address` parameter is a string representing the address of a user.
 * @returns the index of the entry in the flattened whitelist that matches the given address.
 */
export function getUserWhitelistIndex(
  flattenedWhitelist: FlattenedWhitelist,
  address: string
): number {
  return flattenedWhitelist.findIndex(
    entry => entry[1].toLowerCase() === address.toLowerCase()
  )
}

/**
 * The function `getWhitelist` retrieves a whitelist from the auth db based on a given merkle root and
 * returns it as an array of objects.
 * @param {string} merkleRoot - The `merkleRoot` parameter is a string that represents the Merkle root
 * value. It is used to query the whitelist entries associated with that specific Merkle root value.
 * @returns The function `getWhitelist` returns a Promise that resolves to an array of
 * `MerkleTreeWhitelist` objects.
 */
export async function getWhitelist(
  merkleRoot: string
): Promise<MerkleTreeWhitelist[]> {
  const { data } = await gqlClient.query(Qu_GetWhitelists, {
    where: {
      merkleRoot: {
        _eq: merkleRoot,
      },
    },
  })
  if (data.offchain.Whitelist.length === 0) {
    return undefined
  } else {
    const whitelists = data.offchain.Whitelist.map(whitelist => {
      let whitelistIndex = 0
      return {
        merkleRoot: whitelist.merkleRoot as `0x${string}`,
        whitelist: whitelist.entries.map(entry => {
          const flattenedEntry = [
            whitelistIndex.toString(),
            entry.walletAddress,
          ]
          whitelistIndex++
          return flattenedEntry
        }),
      }
    })
    return whitelists
  }
}

/**
 * The function `getMerkleRootForToken` retrieves the merkle root for a given token from Hasura.
 * @param {string} token - The `token` parameter is a string that represents the ID of a generative
 * token (its address).
 * @returns The function `getMerkleRootForToken` returns a `Promise` that resolves to a string (the merkle root) or
 * `undefined`.
 */
export async function getMerkleRootForToken(
  token: string
): Promise<string | undefined> {
  const { data: results } = await gqlClient.query(Qu_GetReserves, {
    where: {
      token_id: {
        _eq: token,
      },
    },
  })
  if (results?.onchain?.reserve.length === 0) {
    return undefined
  } else {
    const data = results?.onchain.reserve[0].data as WhitelistReserveData
    return data.merkleRoot
  }
}
