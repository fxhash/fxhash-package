import { IBaseApis } from "./api/base.js"
import { IEthApis } from "./api/eth.js"
import { ITezosApis } from "./api/tezos.js"
import { AlgoliaConfig } from "./config/algolia.js"
import { GPURenderingConfig } from "./config/gpu.js"
import { IBaseContracts } from "./contracts/base.js"
import { IEthContracts } from "./contracts/eth.js"
import { ITezosContracts } from "./contracts/tezos.js"

export interface IFxhashApis {
  website: string
  docs: string
  main: string
  hasura: string
  hasuraGql: string
  file: string
  fileInternal: string
  walletInternal: string
  fsEmulator: string
  extract: string
  extractInternal: string
  media: string
  ethMetadata: string
  ipfsInternal: string
  ipfsGateway: string
  ipfsGatewaySafe: string
  ipfsGatewayInternal: string
  onchfsProxy: string
  opensea: string
  authority: {
    api: string
  }
  capture: {
    lambdas: {
      small: string
      medium: string
      large: string
    }
    proxy: {
      ipfs: string
      onchfs: string
    }
  }
  events: {
    liveBackend: string
  }
  indexer: {
    tez: string
    eth: string
    base: string
  }
}

/**
 * A mapping of blockchains in their "human-readable" format with their proper
 * blockchain identifier.
 */
export const BlockchainIdentifiers = {
  TezosGhostnet: "tezos:NetXnHfVqm9iesp",
  TezosMainnet: "tezos:NetXdQprcVkpaWU",
  EthereumMainnet: "eip155:1",
  EthereumGoerli: "eip155:5",
  EthereumSepolia: "eip155:11155111",
  BaseSepolia: "eip155:84532",
  BaseMainnet: "eip155:8453",
} as const

/**
 * An union of all the blockchains supported by fxhash, defined by their chain
 * identifier. Can be used to facilitate typescript auto-completion with string
 * when enums aren't as good.
 */
export type BlockchainIdentifier =
  (typeof BlockchainIdentifiers)[keyof typeof BlockchainIdentifiers]

// the variations supported by the config
export type TBlockchain = "tez" | "eth" | "base"
export type TBlockchainNetwork = "testnet" | "mainnet"
export type TEnv = "dev" | "prd" | "local" | "localDocker"
export type TEnvName = "development" | "production" | "local" | "localDocker"

export interface IFxhashNetworkConfig {
  network: string
  chainId: BlockchainIdentifier
  ethFeeReceiver: `0x${string}`
  wertRelayer: string
  fxhashFees: {
    primary: number
    secondary: number
  }
  royaltyBasisPoint: number
  splitBasisPoint: number
}

/**
 * Meta info about the application. Can be used by wallets to scope the
 * application making requests for instance.
 */
export interface IAppMetadata {
  /**
   * Application name. Will be displayed by wallets when a request is made
   * (signing a message, sending a transaction)
   */
  name: string

  /**
   * A short sentence (<25 words) describing the app. Might be used by wallets
   * to display extra info about your app.
   */
  description: string

  /**
   * **IMPORTANT**: This should match the URL in which the JS context making
   * requests to wallets will be executed. **If doesn't match execution
   * context domain, wallets may display a red warning.
   */
  url: string

  /**
   * URL to your application icon. Recommended: PNG 256x256
   * May be used by wallet apps in their UI when users interact with your app.
   */
  icon?: string
}

export interface IFxhashEnvConfig {
  envName: TEnvName
  metadata: IAppMetadata
  gtMinPrice: string
  walletConnectId: string
  splitsApiKey: string
  projectLockTime: number
  referrerShare: number
  cloudflareTurnstileSiteKey: string
  cloudflareTurnstileSiteKeyV2: string
  syndicateProjectId: string
  awsS3Bucket: string
  awsS3Region: string
  openTelemetryTarget: string
  algolia: AlgoliaConfig
  gpu: GPURenderingConfig
}

type TBlockchainContacts = {
  [B in TBlockchain]: {
    tez: ITezosContracts
    eth: IEthContracts
    base: IBaseContracts
  }[B]
}

type TBlockchainApis = {
  [B in TBlockchain]: {
    tez: ITezosApis
    eth: IEthApis
    base: IBaseApis
  }[B]
}

type TNetworkBlockchainConfig = {
  [B in TBlockchain]: {
    tez: IFxhashNetworkConfig
    eth: IFxhashNetworkConfig
    base: IFxhashNetworkConfig
  }[B]
}

export type IFxhashConfig = {
  networks: {
    [N in TBlockchainNetwork]: {
      [B in TBlockchain]: {
        contracts: TBlockchainContacts[B]
        config: TNetworkBlockchainConfig[B]
        apis: TBlockchainApis[B]
      }
    }
  }
  envs: {
    [K in TEnv]: {
      apis: IFxhashApis
      config: IFxhashEnvConfig
    }
  }
}

export type IFxhashConfigSingleEnv = {
  [B in TBlockchain]: {
    contracts: TBlockchainContacts[B]
    config: TNetworkBlockchainConfig[B]
    apis: TBlockchainApis[B]
  }
} & {
  apis: IFxhashApis
  config: IFxhashEnvConfig
}
