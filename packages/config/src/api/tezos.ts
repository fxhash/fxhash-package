export interface ITezosApis {
  tzktWebsite: string
  tzkt: string
  rpcs: string[]
}

export const tezosTestnetApis: ITezosApis = {
  tzkt: "https://api.ghostnet.tzkt.io/v1/",
  tzktWebsite: "https://ghostnet.tzkt.io/",
  rpcs: [
    "https://ghostnet.ecadinfra.com",
    "https://ghostnet.smartpy.io",
    "https://ghostnet.tezos.marigold.dev/",
  ],
}

export const tezosMainnetApis: ITezosApis = {
  tzkt: "https://api.tzkt.io/v1/",
  tzktWebsite: "https://tzkt.io/",
  rpcs: [
    "https://rpc1.fxhash.xyz",
    "https://mainnet.smartpy.io",
    "https://mainnet.api.tez.ie",
    "https://teznode.letzbake.com",
    "https://rpc.tzbeta.net",
  ],
}
