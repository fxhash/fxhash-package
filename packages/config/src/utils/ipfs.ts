import { config, fxhashConfig } from "../config.js"

export enum EGatewayIpfs {
  FXHASH = "FXHASH",
  FXHASH_SAFE = "FXHASH_SAFE",
  IPFSIO = "IPFSIO",
}

const ipfsRegex = new RegExp("^ipfs://")

/**
 * Given a gateway enum, outputs the http url root of the gateway
 */
export function ipfsGatewayRoot(gateway: EGatewayIpfs): string {
  switch (gateway) {
    case EGatewayIpfs.FXHASH:
      return fxhashConfig.envs.dev.apis.ipfsGateway
    case EGatewayIpfs.FXHASH_SAFE:
      return fxhashConfig.envs.dev.apis.ipfsGatewaySafe
    case EGatewayIpfs.IPFSIO:
    default:
      return "https://ipfs.io"
  }
}

/**
 * Returns the CID or a resource, whether it's already a CID or an ipfs://<CID> resource
 * @param resource either a CID or a ipfs://<CID> string
 */
export function ipfsCidFromUriOrCid(resource: string): string {
  if (!ipfsRegex.test(resource)) return resource
  return resource.slice(7)
}

/**
 * Given a CID or ipfs://<CID>, returns an URL to a gateway pointing to the resource
 * @param resource the resource input, either a CID or ipfs://<CID>
 * @param gateway the gateway URL to use for the resource
 */
export function ipfsGatewayUrl(
  resource: string | null | undefined,
  gateway: EGatewayIpfs = EGatewayIpfs.FXHASH_SAFE
): string {
  if (!resource) return ""
  const cid = ipfsCidFromUriOrCid(resource)
  return `${ipfsGatewayRoot(gateway)}/ipfs/${cid}`
}

/**
 * given a URI (either ipfs://<CID>, onchfs://<CID> or temp://<CID>),
 * returns the URL to the resource
 */
export function proxyUrl(uri: string): string {
  // let blobs be blobs
  if (uri.startsWith("blob:") || uri.startsWith("data:")) return uri

  const [protocol, cid] = uri.split("://")
  switch (protocol) {
    case "https":
      return uri
    case "temp":
      return `${fxhashConfig.envs.dev.apis.fsEmulator}/resolve/${cid}`
    case "onchfs":
      return `${fxhashConfig.envs.dev.apis.onchfsProxy}/${cid}`
    default:
      return ipfsGatewayUrl(uri)
  }
}
