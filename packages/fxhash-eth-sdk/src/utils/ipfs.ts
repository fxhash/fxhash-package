import { CID } from "multiformats/cid"

export function getHashFromIPFSCID(cid: string): Uint8Array {
  return CID.parse(cid).multihash.digest
}
