import { config } from "@fxhash/config"
import { PublicClient, bytesToHex, encodeFunctionData, hexToBytes } from "viem"
import {
  EthereumWalletManager,
  ONCHFS_CONTENT_STORE,
  ONCHFS_FILE_SYSTEM_ABI,
} from ".."
import { Inscription } from "onchfs"
import { CallData } from "@0xsplits/splits-sdk"
import { MULTICALL3_ABI } from "@/abi/Multicall3"

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

export function ethOnchfsInscriptionCallData(ins: Inscription): CallData {
  switch (ins.type) {
    case "chunk":
      return {
        address: config.eth.contracts.onchfs_content_store,
        data: encodeFunctionData({
          abi: ONCHFS_CONTENT_STORE,
          functionName: "addContent",
          args: [bytesToHex(ins.content)],
        }),
      }
    case "file":
      return {
        address: config.eth.contracts.onchfs_file_system,
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
      console.log(
        Object.keys(ins.files)
          .sort()
          .map(key => [key, ins.files[key]])
          .reduce(
            (acc, [name, content]) => [
              [...acc[0], name],
              [...acc[1], bytesToHex(content as any)],
            ],
            [[], []]
          )
      )
      return {
        address: config.eth.contracts.onchfs_file_system,
        data: encodeFunctionData({
          abi: ONCHFS_FILE_SYSTEM_ABI,
          functionName: "createDirectory",
          args: Object.keys(ins.files)
            .sort()
            .map(key => [key, ins.files[key]])
            .reduce(
              (acc, [name, content]) => [
                [...acc[0], name],
                [...acc[1], bytesToHex(content as any)],
              ],
              [[], []]
            ),
        }),
      }
  }
}

/**
 * Estimate the cost of simulating a onchfs inscriptions
 * @param inscriptions A list of inscriptions to estimate cost
 * @param client Public client
 * @param gasPrice The gas price (in _wei_)
 * @returns
 */
export async function simulateOnchfsInscriptions(
  inscriptions: Inscription[],
  walletManager: EthereumWalletManager,
  gasPrice?: bigint
) {
  const calldatas = inscriptions.map(ins => ethOnchfsInscriptionCallData(ins))
  const callRequests = calldatas.map(call => ({
    target: call.address,
    callData: call.data,
  }))
  const estimate = await walletManager.publicClient.estimateContractGas({
    address: config.eth.contracts.multicall3,
    abi: MULTICALL3_ABI,
    functionName: "aggregate",
    args: [callRequests],
    account: walletManager.walletClient.account,
    gasPrice: gasPrice,
  })
  return estimate
}
