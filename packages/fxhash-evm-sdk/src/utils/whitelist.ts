import { StandardMerkleTree } from "@openzeppelin/merkle-tree"

/**
 * The function `getWhitelistTree` takes an array of whitelisted addresses, formats them, and returns a
 * Merkle tree of the formatted whitelist entries.
 * @param {`0x`[]} whitelist - The `whitelist` parameter is an array of strings, where each
 * string represents an Ethereum address.
 * @returns a StandardMerkleTree object.
 */
export function getWhitelistTree(
  whitelist: `0x${string}`[]
): StandardMerkleTree<string[]> {
  const formattedWhitelist: string[][] = []
  for (let i = 0; i < whitelist.length; i++) {
    formattedWhitelist[i] = [i.toString(), whitelist[i]]
  }

  const tree = StandardMerkleTree.of(formattedWhitelist, ["uint256", "address"])

  return tree
}

/**
 * The function `getProof` takes in a Merkle tree, a whitelist, and an address, and returns a proof for
 * the given address in the Merkle tree.
 * @param tree - A StandardMerkleTree object representing the Merkle tree data structure. It is
 * initialized with an array of strings.
 * @param {WhitelistEntry[]} whitelist - The `whitelist` parameter is an array of `WhitelistEntry`
 * objects. Each `WhitelistEntry` object represents an entry in the whitelist and contains information
 * such as the address and associated data.
 * @param {string} address - The `address` parameter is a string representing the address for which we
 * want to retrieve the proof.
 * @returns the proof for the specified address in the whitelist from the given Merkle tree.
 */
export function getProof(
  tree: StandardMerkleTree<string[]>,
  whitelist: string[],
  address: string
): string[] {
  const index = getUserWhitelistIndex(whitelist, address)
  return tree.getProof(index)
}

/**
 * The function `getWhitelistIndex` returns the index of a given address in a whitelist array.
 * @param {string[]} whitelist - An array of objects representing whitelist entries. Each entry
 * has a property called "address" which is a string representing an address.
 * @param {string} address - A string representing an address.
 * @returns the index of the entry in the whitelist array that matches the given address.
 */
export function getUserWhitelistIndex(
  whitelist: string[],
  address: string
): number {
  return whitelist.findIndex(
    entry => entry.toLowerCase() === address.toLowerCase()
  )
}

/**
 * The function `getWhitelistForToken` returns an array of objects containing addresses and amounts for
 * a given token.
 * @param {string} token - The `token` parameter is a string that represents the token for which you
 * want to get the whitelist.
 * @returns An array of objects represis being returned. Each object in the array has two properties:
 * "address" and "amount".
 */
export function getWhitelistForToken(token: string): `0x${string}`[] {
  //TODO: replace with an actual way to store and fetch whitelists
  return [
    "0xBF0BbF31149e8FA7183Cb6eD96a1D2Ab947B8368",
    "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42",
  ]
}
