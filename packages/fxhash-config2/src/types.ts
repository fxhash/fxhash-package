export interface ITezosContracts {
  allowed_mint: string
  allowed_mint_issuer: string
  allowed_mint_issuer_v3: string
  allowed_mint_v3: string
  articles: string
  collaboration_factory: string
  consumable_database: string
  cycles: string
  gentk_v1: string
  gentk_v1_data: string
  gentk_v2: string
  gentk_v3: string
  issuer_tickets: string
  issuer_v0: string
  issuer_v1: string
  issuer_v2: string
  issuer_v3: string
  marketplace_v1: string
  marketplace_v2: string
  marketplace_v3: string
  moderation_articles: string
  moderation_team: string
  moderation_token: string
  moderation_token_v3: string
  moderation_user: string
  pricing_dutch_auction: string
  pricing_dutch_auction_v3: string
  pricing_fixed: string
  pricing_fixed_v3: string
  randomizer: string
  token_moderation: string
  treasury: string
  user_moderation: string
  user_register: string
}

export interface ITezosApis {
  tzktWebsite: string
  tzkt: string
  rpcs: string[]
}

export interface IEthContracts {}

export interface IEthApis {}

export interface IFxhashApis {
  website: string
  main: string
  file: string
  extract: string
  media: string
  ipfsGateway: string
  ipfsGatewaySafe: string
  authority: {
    api: string
  }
  capture: {
    lambdas: {
      small: string
      medium: string
      large: string
    }
  }
  dashboard: {
    backend: string
    aggregator: string
  }
}

export interface IFxhashNetworkConfig {
  network: string
}

export interface IFxhashEnvConfig {
  envName: string
}

// the variations supported by the config
export type TBlockchain = "tez" | "eth"
export type TBlockchainNetwork = "testnet" | "mainnet"
export type TEnv = "dev" | "prd"

type TBlockchainContacts = {
  [B in TBlockchain]: {
    tez: ITezosContracts
    eth: IEthContracts | null
  }[B]
}

type TBlockchainApis = {
  [B in TBlockchain]: {
    tez: ITezosApis
    eth: IEthApis | null
  }[B]
}

type TNetworkBlockchainConfig = {
  [B in TBlockchain]: {
    tez: IFxhashNetworkConfig
    eth: IFxhashNetworkConfig
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
