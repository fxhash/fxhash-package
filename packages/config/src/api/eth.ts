export interface IEthApis {
  rpcs: string[]
  reservoir: string
  safe: string
  whitelist: string
  alchemy: {
    rpc: string
  }
}

export const ethTestnetApis: IEthApis = {
  rpcs: [
    "https://eth-sepolia.g.alchemy.com/v2/fATxHNjMh0rR9DnHCtZKDpPPxkEY48Qb",
  ],
  reservoir: "https://api-sepolia.reservoir.tools",
  safe: "https://safe-transaction-sepolia.safe.global",
  whitelist: "http://localhost:9999/whitelist/new",
  alchemy: {
    rpc: "https://eth-sepolia.g.alchemy.com/v2/xTtlsglqRKcFwSkg2bilqp7U2smOt3g9",
  },
}

export const ethMainnetApis: IEthApis = {
  rpcs: [
    "https://base-sepolia.g.alchemy.com/v2/xTtlsglqRKcFwSkg2bilqp7U2smOt3g9",
  ],
  reservoir: "https://api.reservoir.tools",
  safe: "https://safe-transaction-mainnet.safe.global/",
  whitelist: "https://api.v2.dev.fxhash-dev.xyz/whitelist/new",
  alchemy: {
    rpc: "https://eth-mainnet.g.alchemy.com/v2/xTtlsglqRKcFwSkg2bilqp7U2smOt3g9",
  },
}
