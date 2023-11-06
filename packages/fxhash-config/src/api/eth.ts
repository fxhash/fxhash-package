export interface IEthApis {
  rpcs: string[]
  reservoir: string
  whitelist: string
}

export const ethTestnetApis: IEthApis = {
  rpcs: ["https://ethereum-sepolia-rpc.allthatnode.com"],
  reservoir: "https://api-sepolia.reservoir.tools",
  whitelist: "http://localhost:9999/whitelist/new",
}
