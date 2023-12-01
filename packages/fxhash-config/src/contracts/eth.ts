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
  onchfs_renderer_v1: `0x${string}`
  randomizer_v1: `0x${string}`
  role_registry_v1: `0x${string}`
  contract_registry_v1: `0x${string}`
  gen_art_token_impl_v1: `0x${string}`
  mint_ticket_impl_v1: `0x${string}`
  onchfs_file_system: `0x${string}`
  onchfs_content_store: `0x${string}`
}

export const ethTestnetContracts: IEthContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  project_factory_v1: "0x795d36a8a8792493897Ac3cAa0761d07e7192cA6",
  mint_ticket_factory_v1: "0xb0DBf9Ce2525C1FA4800C94E8e3e47Ae1E19844F",
  dutch_auction_minter_v1: "0x0046Be0E67F2a3cD7C15bD968B786a7BfcF0a82f",
  fixed_price_minter_v1: "0xa50AA65773295161B348E7af7D26f7D6554D1644",
  ticket_redeemer_v1: "0x1840Ed34Da5a4C6989E5F8803c91bFc65D4CbB58",
  ipfs_renderer_v1: "0xE2802c2E5f6BB774475e198F4262A61f1574015c",
  onchfs_renderer_v1: "0xDA8eb51e05CD0ffb9dC08E0415c7d4b83431D6F0",
  randomizer_v1: "0x69F4cC5C20332A8d93e77D85691C0623FFEA9a57",
  role_registry_v1: "0x40DDD7CB93B4B217C79c872e93FB08E04C195859",
  contract_registry_v1: "0x032ebBBb95A2B17266b24aE8De0726c5C12FCB36",
  gen_art_token_impl_v1: "0xA7D790154B28abdF47Aa2dd8E812eA6523D7B172",
  mint_ticket_impl_v1: "0x2305827f79c743e2CA113E4013BE8F6E62c13722",
  onchfs_file_system: "0xc3f5ef1a0256b9ceb1452650db72344809bb3a85",
  onchfs_content_store: "0x7c1730B7bE9424D0b983B84aEb254e3a2a105d91",
}

/**
 * TODO
 * -----------------------------------------------------------------------------
 * Put the actual addresses.
 */
export const ethMainnetContracts: IEthContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  project_factory_v1: "0x51Cba08611136213F3A3477c266183c8cB0a3202",
  mint_ticket_factory_v1: "0xa3bdfcf5a99B12016f5c467e2b4f32Bc2C50c2E9",
  dutch_auction_minter_v1: "0x0a7F0ABa4633132aeb1B43c8fdA2BACaB35f7000",
  fixed_price_minter_v1: "0x40FB78d318995049DaB0828A303464752Ace39A0",
  ticket_redeemer_v1: "0xecE8440A5162F436F7B4f60B583d2f42edc3B43E",
  ipfs_renderer_v1: "0x8EAE7eeF5a586B67d188DEa3fbB7c6156c90aB4A",
  onchfs_renderer_v1: "0xfc9F89640D25a2e19a0a11C978E0b2F47E087Cb6",
  randomizer_v1: "0xba361aA2aC4da2a7D4E961303D9a4eA756961C52",
  role_registry_v1: "0x9b87dE9261C499E32fa9476a6D706abD3EE2C152",
  contract_registry_v1: "0xCDee09b69D44B93f1Dd28560CE5e800Aefa93Cfa",
  gen_art_token_impl_v1: "0xFeD4c55c532fF206F0359636b82c1153381642d4",
  mint_ticket_impl_v1: "0xa2b00a0c52DAd0f2E3b802bE16d2303fb05b7654",
  onchfs_file_system: "0x9e0f2864c6f125bbf599df6ca6e6c3774c5b2e04",
  onchfs_content_store: "0x7c1730B7bE9424D0b983B84aEb254e3a2a105d91",
}
