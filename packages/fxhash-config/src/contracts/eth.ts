export interface IEthContracts {
  multicall3: `0x${string}`
  seaport_zone: `0x${string}`
  splits_controller_v1: `0x${string}`
  splits_main: `0x${string}`
  scripty_storage: `0x${string}`
  scripty_builder: `0x${string}`
  project_factory_v1: `0x${string}`
  splits_factory_v1: `0x${string}`
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
  seaport_zone: "0xaee17a0e6e98e832112fd0a26da22c4e812aa7f5",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  project_factory_v1: "0xaAac8b3C065824871c65d5F40C2efE95bFa8D1af",
  mint_ticket_factory_v1: "0x0414421AC7aFB9B1b9ec5232Bb9FEEE0072Ae21A",
  splits_factory_v1: "0x09bb4FF8e3309A11e20b354e1Eeeb02170C6bb64",
  splits_controller_v1: "0x447851a0033f4669E01dF608424c24C34128B040",
  dutch_auction_minter_v1: "0x8FD24a7002Eb40d60Ee403518c9F80EED0424cbF",
  fixed_price_minter_v1: "0x00b6BB7C1A08bF0278Ec462E05218109eeC87274",
  ticket_redeemer_v1: "0xA88773F85c6Fd31FDd0F283eD851E9C966B7D569",
  ipfs_renderer_v1: "0x74Fed617fD8a59CBf4e3386B0192c02E377Bc535",
  randomizer_v1: "0x4cbe2BF84874bC626a373A1C57C6641191e57383",
  role_registry_v1: "0x7287BEABe00A4AaE2d93907D5f24046D98e164d2",
  contract_registry_v1: "0x91E96491f1638b100280F651Ce7D07f805D2A841",
  gen_art_token_impl_v1: "0xdA2C0B9EC1CfC2e82dB8DeA56215a318837CD22a",
  mint_ticket_impl_v1: "0xB290A25113414576776C15f52901c2b068389d20",
}
