import { onchfsCidFromUriOrCid, onchfsRegex } from "./onchfs"
import { ipfsCidFromUriOrCid, ipfsRegex } from "./ipfs"

/**
 * Returns the CID or a resource, whether it's already a CID or an ipfs://<CID> or onchfs://<CID> resource
 * @param resource either a CID or an ipfs://<CID> or onchfs://<CID> string
 */
export function cidFromUriOrCid(resource: string): string {
  if (ipfsRegex.test(resource)) {
    return ipfsCidFromUriOrCid(resource)
  } else if (onchfsRegex.test(resource)) {
    return onchfsCidFromUriOrCid(resource)
  }
  return resource
}
