import p5js__1_7_0 from "./libs/p5.js/1.7.0.lib"
import p5js__1_5_0 from "./libs/p5.js/1.5.0.lib"
import fx__4_0_0 from "./libs/fxhash.js/4.0.0.lib"
import threejs__r157 from "./libs/three.js/r157.lib"
import { Library } from "./types"
import { BlockchainIdentifier, BlockchainIdentifiers } from "@fxhash/config"

export * from "./types"

export const fxLibrary: Library = {
  name: "fxhash.js",
  description:
    "The fxhash artist SDK, exposing a set of utilities to interact with fxhash inside an fxhash artwork.",
  authors: "fxhash",
  documentation: "https://fxhash.xyz/doc",
  filenames: ["fxhash.js", "fxhash.min.js", "fx.js", "fx.min.js"],
  versions: [
    {
      version: "4.0.0",
      filename: "fxhash.min.js",
      license: "MIT",
      content: fx__4_0_0,
      availability: [
        BlockchainIdentifiers.TezosGhostnet,
        BlockchainIdentifiers.TezosMainnet,
        BlockchainIdentifiers.EthereumGoerli,
        BlockchainIdentifiers.EthereumMainnet,
      ],
    },
  ],
}

/**
 * The collection of libraries made available by fxhash (or referenced by fxhash
 * if uploaded by community members). Libraries are identified by their
 */
export const libraries: Library[] = [
  fxLibrary,

  {
    name: "p5.js",
    description:
      "p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else! p5.js is free and open-source because we believe software, and the tools to learn it, should be accessible to everyone.",
    documentation: "https://p5js.org/get-started/",
    filenames: ["p5.js", "p5.min.js", "processing.js", "processing.min.js"],
    versions: [
      {
        version: "1.7.0",
        filename: "p5.min.js",
        license: "GNU Lesser General Public License v2.1",
        availability: [
          BlockchainIdentifiers.TezosGhostnet,
          BlockchainIdentifiers.TezosMainnet,
        ],
        content: p5js__1_7_0,
      },
      {
        version: "1.5.0",
        filename: "p5.min.js",
        license: "GNU Lesser General Public License v2.1",
        availability: [
          BlockchainIdentifiers.TezosGhostnet,
          BlockchainIdentifiers.TezosMainnet,
        ],
        content: p5js__1_5_0,
      },
    ],
  },

  {
    name: "three.js",
    description:
      "Threejs aims to be an easy to use, lightweight, cross-browser, general purpose 3D library. The current builds only include a WebGL renderer but WebGPU (experimental), SVG and CSS3D renderers are also available as addons.",
    documentation: "https://threejs.org/docs/",
    filenames: [
      "three.min.js",
      "three.js",
      "three.module.js",
      "three.module.min.js",
      "three.cjs",
    ],
    versions: [
      {
        version: "r157",
        filename: "three.module.min.js",
        license: "MIT",
        availability: [
          BlockchainIdentifiers.TezosGhostnet,
          BlockchainIdentifiers.TezosMainnet,
        ],
        content: threejs__r157,
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
