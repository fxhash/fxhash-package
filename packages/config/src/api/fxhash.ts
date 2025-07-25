import { getDockerInternalUrl } from "../helpers.js"
import { IFxhashApis, TEnv } from "../types.js"

// list of APIs dev leverages
export const fxhashDevApis: IFxhashApis = {
  website: "https://beta.fxhash-dev.xyz",
  docs: "https://docs.fxhash.xyz",
  main: "https://api.v2-temp.dev.fxhash-dev.xyz/graphql",
  hasura: "https://api.v2.dev.fxhash-dev.xyz",
  hasuraGql: "https://api.v2.dev.fxhash-dev.xyz/v1/graphql",
  file: "https://file-api.fxhash-dev.xyz",
  fileInternal:
    "http://fxhash-multichain-dev-testnet-file-api.fxhash-multichain-dev-testnet.svc.cluster.local:4004",
  baseIndexerInternal:
    "http://fxhash-multichain-dev-testnet-base-indexer.fxhash-multichain-dev-testnet.svc.cluster.local:3000",
  walletInternal:
    "http://fxhash-multichain-dev-testnet-wallet-api.fxhash-multichain-dev-testnet.svc.cluster.local:3208",
  fsEmulator: "https://file-api.fxhash-dev.xyz/fs",
  extract: "https://extract.fxhash-dev.xyz",
  extractInternal:
    "http://fxhash-dev-testnet-extract-balancer.fxhash-dev-testnet.svc.cluster.local:4017",
  media: "https://media.dev.fxhash-dev.xyz",
  ethMetadata: "https://media.dev.fxhash-dev.xyz/metadata/ethereum/",
  ipfsInternal:
    "http://fxhash-dev-testnet-ipfs-cluster-api.fxhash-dev-testnet.svc.cluster.local:9094",
  ipfsGateway: "https://gateway.fxhash-dev.xyz",
  ipfsGatewaySafe: "https://gateway.fxhash-dev2.xyz",
  ipfsGatewayInternal:
    "http://fxhash-dev-testnet-ipfs-cluster-gateway.fxhash-dev-testnet.svc.cluster.local:8080",
  onchfsProxy: "https://onchfs.fxhash-dev2.xyz",
  opensea: "https://testnets-api.opensea.io/api/v2",
  authority: {
    api: "NONE",
  },
  capture: {
    lambdas: {
      small:
        "https://u5not5l323zczuwnrzxwkt34ra0eyidj.lambda-url.us-east-1.on.aws/",
      medium:
        "https://jgfz7a6km7fsqonej2sp3lqwvu0utnyy.lambda-url.us-east-1.on.aws/",
      large:
        "https://fzezvbp2f74yturkj4akjyrq3e0zswhb.lambda-url.us-east-1.on.aws/",
    },
    proxy: {
      ipfs: "ipfs://Qme6E5z1GDqrHyPomGEw5LChxmE9pdEYGWjwxrv6ZgwZRo",
      onchfs:
        "onchfs://4287364ed3219d3f2f77302a71eff0db49e971058ef87f163981ef89a445b143",
    },
  },
  events: {
    liveBackend: "_NONE",
  },
  indexer: {
    tez: "http://fxhash-multichain-dev-testnet-indexer-v2.fxhash-multichain-dev-testnet.svc.cluster.local:4001",
    eth: "http://fxhash-multichain-dev-testnet-eth-indexer.fxhash-multichain-dev-testnet.svc.cluster.local:3000",
    base: "http://fxhash-multichain-dev-testnet-base-indexer.fxhash-multichain-dev-testnet.svc.cluster.local:3000",
  },
}

// list of APIs for when fxhash is ran locally
// The ports must correspond to the ports the services are running on
// defined in the root docker compose file of the monorepo
export const fxhashLocalApis: IFxhashApis = {
  ...fxhashDevApis,
  website: "http://localhost:3200",
  hasura: "http://localhost:8888",
  hasuraGql: "http://localhost:8888/v1/graphql",
  fileInternal: fxhashDevApis.file,
  ipfsGatewayInternal: fxhashDevApis.ipfsGateway,
  walletInternal: "http://host.docker.internal:3208",
}

export const fxhashLocalDockerApis: IFxhashApis = {
  ...fxhashLocalApis,
  hasura: getDockerInternalUrl(fxhashLocalApis.hasura),
  hasuraGql: getDockerInternalUrl(fxhashLocalApis.hasuraGql),
}

// list of APIs prod leverages
export const fxhashPrdApis: IFxhashApis = {
  website: "https://www.fxhash.xyz",
  docs: "https://docs.fxhash.xyz",
  main: "https://api.v2-temp.fxhash.xyz/graphql",
  hasura: "https://api.v2.fxhash.xyz",
  hasuraGql: "https://api.v2.fxhash.xyz/v1/graphql",
  file: "https://file-api.fxhash.xyz",
  fileInternal:
    "http://fxhash-multichain-prd-file-api.fxhash-multichain-prd.svc.cluster.local:4004",
  baseIndexerInternal:
    "http://fxhash-multichain-prd-base-indexer.fxhash-multichain-prd.svc.cluster.local:3000",
  walletInternal:
    "http://fxhash-multichain-prd-wallet-api.fxhash-multichain-prd.svc.cluster.local:3208",
  fsEmulator: "https://file-api.fxhash.xyz/fs",
  extract: "https://extract.fxhash.xyz",
  extractInternal:
    "http://fxhash-prd-extract-balancer.fxhash-prd.svc.cluster.local:4017",
  media: "https://media.fxhash.xyz",
  ethMetadata: "https://media.fxhash.xyz/metadata/ethereum/",
  ipfsInternal:
    "http://fxhash-prd-ipfs-cluster-api.fxhash-prd.svc.cluster.local:9094",
  ipfsGateway: "https://gateway.fxhash.xyz",
  ipfsGatewaySafe: "https://gateway.fxhash2.xyz",
  ipfsGatewayInternal:
    "http://fxhash-prd-ipfs-cluster-gateway.fxhash-prd.svc.cluster.local:8080",
  onchfsProxy: "https://onchfs.fxhash2.xyz",
  opensea: "https://api.opensea.io/api/v2",
  authority: {
    api: "NONE",
  },
  capture: {
    lambdas: {
      small:
        "https://7sz7knaaw3obgqxjyv3m4e5myu0lsbdp.lambda-url.us-east-1.on.aws/",
      medium:
        "https://tuupcq6eesbfk4veuzdfrhu7zm0zwuqy.lambda-url.us-east-1.on.aws/",
      large:
        "https://bojj24y6ucxmsyfi4uccdmiliy0dzhji.lambda-url.us-east-1.on.aws/",
    },
    proxy: {
      ipfs: "ipfs://Qme6E5z1GDqrHyPomGEw5LChxmE9pdEYGWjwxrv6ZgwZRo",
      onchfs:
        "onchfs://4287364ed3219d3f2f77302a71eff0db49e971058ef87f163981ef89a445b143",
    },
  },
  events: {
    liveBackend: "_NONE",
  },
  indexer: {
    tez: "http://fxhash-multichain-prd-indexer-v2.fxhash-multichain-prd.svc.cluster.local:4001",
    eth: "http://fxhash-multichain-prd-eth-indexer.fxhash-multichain-prd.svc.cluster.local:3000",
    base: "http://fxhash-multichain-prd-base-indexer.fxhash-multichain-prd.svc.cluster.local:3000",
  },
}

const fxEnvToApisMap: Record<TEnv, IFxhashApis> = {
  local: fxhashLocalApis,
  localDocker: fxhashLocalDockerApis,
  dev: fxhashDevApis,
  prd: fxhashPrdApis,
}

/**
 * Given some env, returns the associated APIs config.
 */
export function fxApisByEnv(env: TEnv): IFxhashApis {
  return fxEnvToApisMap[env]
}
