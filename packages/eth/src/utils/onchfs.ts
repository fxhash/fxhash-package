import { PublicClient, bytesToHex, encodeFunctionData, hexToBytes } from "viem"
import {
  ONCHFS_CONTENT_STORE,
  ONCHFS_FILE_SYSTEM_ABI,
  getConfigForChain,
} from ".."
import { Inscription } from "onchfs"
import { CallData } from "@0xsplits/splits-sdk"
import { BlockchainType } from "@fxhash/shared"

/**
 * Checks if an inode exists by querying the ONCHFS File System contract.
 * @param client Public client from which the request can be made
 * @param cid The Inode cid which should be checked
 * @returns true if inode exists, false otherwise
 */
export async function onchfsInodeExists(
  client: PublicClient,
  cid: string,
  chain: BlockchainType
): Promise<boolean> {
  const config = getConfigForChain(chain).contracts
  return !!(await client.readContract({
    address: config.onchfs_file_system,
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
  cid: string,
  chain: BlockchainType
): Promise<boolean> {
  const config = getConfigForChain(chain).contracts
  return !!(await client.readContract({
    address: config.onchfs_content_store,
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

export function ethOnchfsInscriptionCallData(
  ins: Inscription,
  chain: BlockchainType
): CallData {
  const config = getConfigForChain(chain).contracts
  switch (ins.type) {
    case "chunk":
      return {
        address: config.onchfs_content_store,
        data: encodeFunctionData({
          abi: ONCHFS_CONTENT_STORE,
          functionName: "addContent",
          args: [bytesToHex(ins.content)],
        }),
      }
    case "file":
      return {
        address: config.onchfs_file_system,
        data: encodeFunctionData({
          abi: ONCHFS_FILE_SYSTEM_ABI,
          functionName: "createFile",
          args: [
            bytesToHex(ins.metadata),
            ins.chunks.map(chunk => bytesToHex(chunk)),
          ],
        }),
      }
    case "directory":
      return {
        address: config.onchfs_file_system,
        data: encodeFunctionData({
          abi: ONCHFS_FILE_SYSTEM_ABI,
          functionName: "createDirectory",
          args: Object.keys(ins.files)
            .sort()
            .map(key => [key, ins.files[key]])
            .reduce<[string[], string[]]>(
              (acc, [name, content]) => [
                [...acc[0], name as string],
                [...acc[1], bytesToHex(content as Uint8Array)],
              ],
              [[], []]
            ),
        }),
      }

    default:
      throw new Error("wrong inode type")
  }
}
