export interface IEthApis {
  rpcs: string[]
  reservoir: string
  safe: string
  whitelist: string
}

export const ethTestnetApis: IEthApis = {
  rpcs: ["https://ethereum-goerli-rpc.allthatnode.com"],
  reservoir: "https://api-goerli.reservoir.tools",
  safe: "https://safe-transaction-goerli.safe.global",
  whitelist: "http://localhost:9999/whitelist/new",
}

export const ethMainnetApis: IEthApis = {
  rpcs: ["https://ethereum-mainnet-rpc.allthatnode.com"],
  reservoir: "https://api.reservoir.tools",
  safe: "https://safe-transaction-mainnet.safe.global/",
  whitelist: "https://api.v2.dev.fxhash-dev.xyz/whitelist/new",
}
