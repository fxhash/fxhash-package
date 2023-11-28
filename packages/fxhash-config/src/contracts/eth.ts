export interface IEthContracts {
  multicall3: `0x${string}`
  seaport_zone: `0x${string}`
  splits_main: `0x${string}`
  scripty_storage: `0x${string}`
  scripty_builder: `0x${string}`
  project_factory_v1: `0x${string}`
  fixed_price_minter_v1: `0x${string}`
  dutch_auction_minter_v1: `0x${string}`
  mint_ticket_factory_v1: `0x${string}`
  ticket_redeemer_v1: `0x${string}`
  ipfs_renderer_v1: `0x${string}`
  randomizer_v1: `0x${string}`
  role_registry_v1: `0x${string}`
  contract_registry_v1: `0x${string}`
  gen_art_token_impl_v1: `0x${string}`
  mint_ticket_impl_v1: `0x${string}`
}

export const ethTestnetContracts: IEthContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  project_factory_v1: "0xc644F95d098DF51dbda99052476D3CF046Bcf290",
  mint_ticket_factory_v1: "0x76c3a37bFCc1DEBdA0CA5f7D4D4e6DFC368b058c",
  dutch_auction_minter_v1: "0x7dE5dF448E789fC0fad8a5f86718c4563849fbCe",
  fixed_price_minter_v1: "0x9CACE52f348F06f4F2B37F830c38E688090BdabC",
  ticket_redeemer_v1: "0xF1924BAcB40Ca650b1BAEFE4026a8FcfE90D6790",
  ipfs_renderer_v1: "0xeD572212aA6468D5Ca3dbAdB2B3d5494B1CF8202",
  randomizer_v1: "0x035560645E9F4828ca1438441d3D7BB6687ed3a4",
  role_registry_v1: "0x447b27Fcce04828b39C192ABD1E68bc33d0a4729",
  contract_registry_v1: "0x09790a484A849e3240b596243DA0925D7177FD6b",
  gen_art_token_impl_v1: "0x15E1f635F7f34c2C732146eEA80AB4C891A09798",
  mint_ticket_impl_v1: "0x82D1F531425294C3deE2D694c99F852174207f04",
}
