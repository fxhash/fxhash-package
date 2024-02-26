export interface IBaseApis {
  rpcs: string[]
  reservoir: string
  safe: string
  whitelist: string
}

export const baseTestnetApis: IBaseApis = {
  rpcs: ["https://sepolia.base.org"],
  reservoir: "https://api-base-sepolia.reservoir.tools",
  safe: "https://safe-transaction-base-testnet.safe.global/",
  whitelist: "http://localhost:9999/whitelist/new",
}

export const baseMainnetApis: IBaseApis = {
  rpcs: ["https://mainnet.base.org"],
  reservoir: "https://api-base.reservoir.tools",
  safe: "https://safe-transaction-base.safe.global/",
  whitelist: "https://api.v2.dev.fxhash-dev.xyz/whitelist/new",
}
