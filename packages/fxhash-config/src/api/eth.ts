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
