export interface IEthContracts {
  seaport_zone: string
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
  mint_ticket_impl_v1: string
  gen_art_token_impl_v1: string
  role_registry_v1: string
  contract_registry_v1: string
  splits_controller_v1: string
}

export const ethTestnetContracts: IEthContracts = {
  seaport_zone: "0xaee17a0e6e98e832112fd0a26da22c4e812aa7f5",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  project_factory_v1: "0x3e7cf2fcf73bf51c48accfed536910466524ef98",
  mint_ticket_factory_v1: "0x20a87415d09823315dc6accb078b2492ffe9426d",
  splits_factory_v1: "0x771e409b32dd47e50b3d1010a1a314a3aaab5029",
  splits_controller_v1: "0x43f9a4235f5647459d26693ac4562dc5de5c1cf8",
  dutch_auction_minter_v1: "0x0bfe80dcf64b0a2b4e69bf1ad9370596e6fc86fb",
  fixed_price_minter_v1: "0x2cdaa5f62cdbf0d9be671e00ec5610c82df48231",
  ticket_redeemer_v1: "0x1d8f2a9fb696dc8d60b0dc087ec837c36076e1f8",
  renderer_v1: "0xc7554860bd2dcc42d84205e661eb23699a4c695e",
  randomizer_v1: "0x2aaf91e225ec21c8c1f2e4238b67d919b63b51fd",
  role_registry_v1: "0x11e1ed2f4750c90dbb8d6669b4647a5b6ccef7ee",
  contract_registry_v1: "0xb25b547491b1c89a2b896c7fee475466efab9edc",
  gen_art_token_impl_v1: "0x4a1a9fc599f373328ca60b437713380b6caa1a81",
  mint_ticket_impl_v1: "0x2a4dfd69d9915dfe223ad14b919eebe3fa2b542f",
}
