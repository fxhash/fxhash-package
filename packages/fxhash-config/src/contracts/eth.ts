export interface IEthContracts {
  seaport_zone: string
  splits_controller_v1: string
  splits_main: string
  scripty_storage: string
  scripty_builder: string
  project_factory_v1: string
  splits_factory_v1: string
  fixed_price_minter_v1: string
  dutch_auction_minter_v1: string
  mint_ticket_factory_v1: string
  ticket_redeemer_v1: string
  renderer_v1: string
  randomizer_v1: string
  role_registry_v1: string
  contract_registry_v1: string
  gen_art_token_impl_v1: string
  mint_ticket_impl_v1: string
}

export const ethTestnetContracts: IEthContracts = {
  seaport_zone: "0xaee17a0e6e98e832112fd0a26da22c4e812aa7f5",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  project_factory_v1: "0xb0b37d96ebf981a64162b761cfb964083a64a117",
  mint_ticket_factory_v1: "0x5c193df5927a8eddf8d0eeddec8dbe0f493d639c",
  splits_factory_v1: "0xdaf147bd7349d3556f9cfc02952d03436c9a54c3",
  splits_controller_v1: "0x1b7f787676fdb45f5f3b1a72ff0d6c38624bf3de",
  dutch_auction_minter_v1: "0xe58b662c429463bec581e3a5f443bda1e33a9362",
  fixed_price_minter_v1: "0x04e733e94b8b288e91f11afd156e3ce49bf8a66a",
  ticket_redeemer_v1: "0xbf20c79c6c7d14e6dda31c96712111a323a7266f",
  renderer_v1: "0xb39c1a96825d53d8cba14e725310306d30949bbc",
  randomizer_v1: "0x31db8101814036c1bd43be023629812f76216f3f",
  role_registry_v1: "0xc1c111a9ff84af5d89d8c1c7a24891283f41bf76",
  contract_registry_v1: "0x13c9186c86ff13efcb8da6463080127fde0f5536",
  gen_art_token_impl_v1: "0x8b8e3c6fab2b9f1258d5351ce2eb8051df3e3011",
  mint_ticket_impl_v1: "0xcda633cf837550deaceb7a4f64b2665312f1f079",
}
