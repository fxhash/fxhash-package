import { fetchExponentialBackoff } from "@fxhash/utils"
import { FxhashContracts } from ".."
import { config } from "@fxhash/config"

// a simplistic cache to optimize back-and-forth inside the mint flow,
const onchfsTezosFetchCache: Record<string, boolean> = {}

/**
 * Does an inode exists on onchfs
 */
export async function onchfsInodeExistsOnTezos(
  cid: string,
  nodeBaseUrl: string = config.tez.apis.tzkt
) {
  if (onchfsTezosFetchCache[cid]) return onchfsTezosFetchCache[cid]
  const res = await fetchExponentialBackoff(
    `${nodeBaseUrl}contracts/${FxhashContracts.ONCHFS_FILES}/bigmaps/inodes/keys/${cid}`
  )
  return (onchfsTezosFetchCache[cid] = res.status === 200)
}

/**
 * Does a chunk exists on onchfs
 */
export async function onchfsChunkExistsOnTezos(
  contentStoreInodesBigmap: string,
  cid: string,
  nodeBaseUrl: string = config.tez.apis.tzkt
) {
  if (onchfsTezosFetchCache[cid]) return onchfsTezosFetchCache[cid]
  const res = await fetchExponentialBackoff(
    `${nodeBaseUrl}bigmaps/${contentStoreInodesBigmap}/keys/${cid}`
  )
  return (onchfsTezosFetchCache[cid] = res.status === 200)
}
