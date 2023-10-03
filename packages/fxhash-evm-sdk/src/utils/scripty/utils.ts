import { ethers } from "ethers"

export function stringToBytes(str: string): string {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(str))
}

export function chunkSubstr(str: string, size: number): string[] {
  const chunks: string[] = []
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size))
  }
  return chunks
}
