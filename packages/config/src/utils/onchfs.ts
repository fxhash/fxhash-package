export const onchfsRegex: RegExp = new RegExp("^onchfs://")

/**
 * Returns the CID or a resource, whether it's already a CID or an onchfs://<CID> resource
 * @param resource either a CID or a onchfs://<CID> string
 */
export function onchfsCidFromUriOrCid(resource: string): string {
  if (!onchfsRegex.test(resource)) return resource
  return resource.slice(9)
}
