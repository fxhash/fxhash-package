import { CID } from "multiformats"
import { toHex } from "viem"

export function getHashFromIPFSCID(cid: string): string {
  return toHex(CID.parse(cid).multihash.digest)
}
