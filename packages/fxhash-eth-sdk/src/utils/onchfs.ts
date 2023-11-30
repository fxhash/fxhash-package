import { config } from "@fxhash/config"
import { PublicClient, hexToBytes } from "viem"
import { ONCHFS_CONTENT_STORE, ONCHFS_FILE_SYSTEM_ABI } from ".."

/**
 * Checks if an inode exists by querying the ONCHFS File System contract.
 * @param client Public client from which the request can be made
 * @param cid The Inode cid which should be checked
 * @returns true if inode exists, false otherwise
 */
export async function onchfsInodeExists(
  client: PublicClient,
  cid: string
): Promise<boolean> {
  return !!(await client.readContract({
    address: config.eth.contracts.onchfs_file_system,
    abi: ONCHFS_FILE_SYSTEM_ABI,
    functionName: "inodeExists",
    args: [`0x${cid}`],
  }))
}

/**
 * Checks if a chunk has been written onchain already by querying the ONCHFS
 * Content Store.
 * @param client Public client from which a request to blockchain can be made
 * @param cid The chunk cid (checksum) which should be checked
 * @returns true if chunk exists, false otherwise
 */
export async function onchfsChunkExists(
  client: PublicClient,
  cid: string
): Promise<boolean> {
  return !!(await client.readContract({
    address: config.eth.contracts.onchfs_content_store,
    abi: ONCHFS_CONTENT_STORE,
    functionName: "checksumExists",
    args: [`0x${cid}`],
  }))
}

export async function onchfsGetInodeAtPath(
  client: PublicClient,
  cid: string,
  path: string
) {
  throw new Error("todo")
}

export async function readFile(client: PublicClient, cid: string) {
  const hexByteString = await client.readContract({
    address: config.eth.contracts.onchfs_file_system,
    abi: ONCHFS_FILE_SYSTEM_ABI,
    functionName: "readFile",
    args: [`0x${cid}`],
  })
  return hexToBytes(hexByteString as any)
}
