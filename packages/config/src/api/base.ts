export interface IBaseApis {
  rpcs: string[]
  reservoir: string
  safe: string
  splits: string
  whitelist: string
}

export const baseTestnetApis: IBaseApis = {
  rpcs: ["https://sepolia.base.org"],
  reservoir: "https://api-base-sepolia.reservoir.tools",
  safe: "https://safe-transaction-base-testnet.safe.global/",
  splits: "https://api.splits.org",
  whitelist: "http://localhost:9999/whitelist/new",
}

export const baseMainnetApis: IBaseApis = {
  rpcs: ["https://mainnet.base.org"],
  reservoir: "https://api-base.reservoir.tools",
  safe: "https://safe-transaction-base.safe.global/",
  splits: "https://api.splits.org",
  whitelist: "https://api.v2.dev.fxhash-dev.xyz/whitelist/new",
}
