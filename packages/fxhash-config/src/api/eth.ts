export interface IEthApis {
  rpcs: string[],
  reservoir: string,
}

export const ethTestnetApis: IEthApis = {
  rpcs: ["https://rpc-sepolia.fxhash-dev.xyz"],
  reservoir: "https://api-sepolia.reservoir.tools",
}

