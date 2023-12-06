import p5js__1_7_0 from "./libs/p5.js/1.7.0.lib"
import p5js__1_5_0 from "./libs/p5.js/1.5.0.lib"
import { Library } from "./types"
import { BlockchainIdentifier, BlockchainIdentifiers } from "@fxhash/config"

export * from "./types"

/**
 * The collection of libraries made available by fxhash (or referenced by fxhash
 * if uploaded by community members). Libraries are identified by their
 */
export const libraries: Library[] = [
  {
    name: "p5.js",
    description:
      "p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else! p5.js is free and open-source because we believe software, and the tools to learn it, should be accessible to everyone.",
    documentation: "https://p5js.org/get-started/",
    filenames: ["p5.js", "p5.min.js", "processing.js", "processing.min.js"],
    versions: [
      {
        version: "1.7.0",
        license: "GNU Lesser General Public License v2.1",
        availability: [
          BlockchainIdentifiers.TezosGhostnet,
          BlockchainIdentifiers.TezosMainnet,
        ],
        content: p5js__1_7_0,
      },
      {
        version: "1.5.0",
        license: "GNU Lesser General Public License v2.1",
        availability: [
          BlockchainIdentifiers.TezosGhostnet,
          BlockchainIdentifiers.TezosMainnet,
        ],
        content: p5js__1_5_0,
      },
    ],
  },
]

// a map to speed up access to libraries available if often requested
const _available: Partial<Record<BlockchainIdentifier, Library[]>> = {}

/**
 * Given a chain identifier, outputs the list of libraries which have at least
 * one version uploaded to such blockchain.
 * @param chainId
 * @returns A list of libraries where at least one version is uploaded on the
 * given chain
 */
export function librariesAvailable(chainId: BlockchainIdentifier): Library[] {
  if (_available[chainId]) return _available[chainId]
  const out: Library[] = []
  for (const lib of libraries) {
    const cop = { ...lib }
    cop.versions = []
    for (const ver of lib.versions) {
      if (ver.availability.includes(chainId)) {
        cop.versions.push(ver)
      }
    }
    if (cop.versions.length > 0) {
      out.push(cop)
    }
  }
  _available[chainId] = out
  return out
}

export default libraries
