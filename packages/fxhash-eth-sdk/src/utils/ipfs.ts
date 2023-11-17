import { CID } from "multiformats"
import { toBytes, toHex } from "viem"
import { sha256 } from "multiformats/hashes/sha2"
import { create } from "multiformats/hashes/digest"

export function getHashFromIPFSCID(cid: string): string {
  return toHex(CID.parse(cid).multihash.digest)
}

export function getCIDFromV0Digest(digest: string): string {
  return CID.createV0(create(sha256.code, toBytes(digest))).toString()
}
