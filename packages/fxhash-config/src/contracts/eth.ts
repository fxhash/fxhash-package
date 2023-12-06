export interface IEthContracts {
  multicall3: `0x${string}`
  seaport_zone: `0x${string}`
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
  project_factory_v1: "0x6713Cb075B4c2B7fC32F4EaD500Ced9923264B43",
  mint_ticket_factory_v1: "0x563f50254963cB0D78B812726cC118682CdbfBF3",
  dutch_auction_minter_v1: "0x9Ae58126e70b5c1e178DF7fdc5ED5cB2Dc69F12A",
  fixed_price_minter_v1: "0xdD0086fF7d37770Ac20F71Fab1b480115D966079",
  ticket_redeemer_v1: "0x550beC6192c900A954b6ac262Ff98f8a7b52B2b4",
  ipfs_renderer_v1: "0xBBC088BB5656F0b137b136D95c6d5aFA5c511fA5",
  onchfs_renderer_v1: "0x2C95913B47838D71660935BB584492A1B4270b3C",
  randomizer_v1: "0x8E9C3Eba95617d7437FB0FB9C4c9563986B6f97b",
  role_registry_v1: "0xFa785867968CD490869f9Eb9b89e1fe49d13E7Af",
  contract_registry_v1: "0x442e299fC763967374902d195Eb5d16370F3F5BD",
  gen_art_token_impl_v1: "0x63CB478974Bb887222aACC64AA1Ed8FEBc7aBfa6",
  mint_ticket_impl_v1: "0xABd653aF007Adb2115E52b8b71C0046A1C481c93",
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
  onchfs_content_store: "0xC6806fd75745bB5F5B32ADa19963898155f9DB91",
}
