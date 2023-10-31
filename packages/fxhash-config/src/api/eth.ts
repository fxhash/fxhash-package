export interface IEthApis {
  rpcs: string[]
  reservoir: string
  whitelist: string
}

export const ethTestnetApis: IEthApis = {
  rpcs: ["https://rpc-sepolia.fxhash-dev.xyz"],
  reservoir: "https://api-sepolia.reservoir.tools",
  whitelist: "http://localhost:9999/whitelist/new",
}
