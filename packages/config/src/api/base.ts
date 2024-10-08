export interface IBaseApis {
  rpcs: string[]
  reservoir: string
  safe: string
  whitelist: string
  alchemy: {
    rpc: string
  }
}

export const baseTestnetApis: IBaseApis = {
  rpcs: ["https://sepolia.base.org"],
  reservoir: "https://api-base-sepolia.reservoir.tools",
  safe: "https://safe-transaction-base-sepolia.safe.global/",
  whitelist: "http://localhost:9999/whitelist/new",
  alchemy: {
    rpc: "https://base-sepolia.g.alchemy.com/v2/xTtlsglqRKcFwSkg2bilqp7U2smOt3g9",
  },
}

export const baseMainnetApis: IBaseApis = {
  rpcs: ["https://mainnet.base.org"],
  reservoir: "https://api-base.reservoir.tools",
  safe: "https://safe-transaction-base.safe.global/",
  whitelist: "https://api.v2.dev.fxhash-dev.xyz/whitelist/new",
  alchemy: {
    rpc: "https://base-mainnet.g.alchemy.com/v2/xTtlsglqRKcFwSkg2bilqp7U2smOt3g9",
  },
}
