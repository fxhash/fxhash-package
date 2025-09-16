import { config } from "@fxhash/config";
import { ImageLoaderProps } from "next/image";

export const OG_IMAGE_SIZE = 1200;

export enum EGatewayIpfs {
  FXHASH = "FXHASH",
  FXHASH_SAFE = "FXHASH_SAFE",
  IPFSIO = "IPFSIO",
}

const ipfsRegex = new RegExp("^ipfs://");

/**
 * Given a gateway enum, outputs the http url root of the gateway
 */
export function ipfsGatewayRoot(gateway: EGatewayIpfs): string {
  switch (gateway) {
    case EGatewayIpfs.FXHASH:
      return config.apis.ipfsGateway;
    case EGatewayIpfs.FXHASH_SAFE:
      return config.apis.ipfsGatewaySafe;
    case EGatewayIpfs.IPFSIO:
    default:
      return "https://ipfs.io";
  }
}

/**
 * Returns true if the resource is an IPFS resource
 * @param resource the resource/uri to check
 */
export function isIpfs(resource: string): boolean {
  return ipfsRegex.test(resource);
}

/**
 * Returns the CID or a resource, whether it's already a CID or an ipfs://<CID> resource
 * @param resource either a CID or a ipfs://<CID> string
 */
export function ipfsCidFromUriOrCid(resource: string): string {
  if (!ipfsRegex.test(resource)) return resource;
  return resource.slice(7);
}

/**
 * Given a CID or ipfs://<CID>, returns an URL to a gateway pointing to the resource
 * @param resource the resource input, either a CID or ipfs://<CID>
 * @param gateway the gateway URL to use for the resource
 */
export function ipfsGatewayUrl(
  resource: string | null | undefined,
  gateway: EGatewayIpfs = EGatewayIpfs.FXHASH_SAFE,
): string {
  if (!resource) return "";
  const cid = ipfsCidFromUriOrCid(resource);
  return `${ipfsGatewayRoot(gateway)}/ipfs/${cid}`;
}

export const getImageApiUrl = (cid: string, width: number) =>
  `${config.apis.media}/w_${width}/${cid}`;

// a list of common sizes which will be used to fetch the resource, ensuring
// we hit the cache as often as possible
const sizes = [8, 16, 32, 64, 128, 256, 512, 768, 1024, 1200];

/**
 * Next.js Image component loader function for IPFS resources
 */
export const ipfsImageLoader = ({ src, width }: ImageLoaderProps) => {
  const closestSize = sizes.find((s) => s >= width) || sizes[sizes.length - 1];
  return getImageApiUrl(ipfsCidFromUriOrCid(src), closestSize);
};
