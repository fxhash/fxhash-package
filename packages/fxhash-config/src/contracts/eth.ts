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
  project_factory_v1: "0x1427b6e43ace150742be768bc3b3331937fbde43",
  mint_ticket_factory_v1: "0xaaaf94419dae0de513d45c9738554eb2a2605d67",
  splits_factory_v1: "0x2cdb55a138707eab74f19d8ab98027bcbb312a00",
  splits_controller_v1: "0xe4ee176b355d6a4e678845fceccd017d6c35dfc0",
  dutch_auction_minter_v1: "0x9b8b4896be261a152483ab0019a6c4781ff26c3e",
  fixed_price_minter_v1: "0x2953d0f0f2fd47968face28bd8e1f7627cdf7302",
  ticket_redeemer_v1: "0xa9ac8bb4ae6d920dff302eb3a7f44d1535d724c4",
  renderer_v1: "0x292a765f28e175093618a8145054c9549ca0823e",
  randomizer_v1: "0xab3308addd36f129abe2eeba5cf1e8137d7f94b2",
  role_registry_v1: "0xd43bfc805915f8a4b20e0ddb3aa0dd93289793e9",
  contract_registry_v1: "0x3cbf91b608a2e85a3a95a6012a80e1427ef8ab63",
  gen_art_token_impl_v1: "0x1c3066fac73173328f8f5990f3a58b215295fc89",
  mint_ticket_impl_v1: "0xd412b9ce9fae7d5a5492bf3687d1007c2d31f269",
}
