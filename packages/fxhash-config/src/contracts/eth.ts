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
  seaport: `0x${string}`
}

export const ethTestnetContracts: IEthContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  project_factory_v1: "0xbCcE7Acf5d80a12ee5591D1C890A7b6A2B8c78db",
  mint_ticket_factory_v1: "0x13650Bf049D0a587a16c6f934d7099B2F64678cb",
  dutch_auction_minter_v1: "0xB551458E7FE76441d838cfcc5F42F7D053E49C2c",
  fixed_price_minter_v1: "0x30d6dCa7e27254245e21885f8A34eD05cb8832e5",
  ticket_redeemer_v1: "0x6Ca726a24272fB0666211676fd53357de0C823b5",
  ipfs_renderer_v1: "0x3611a8E2A888284410C2C8faE0832ff0f13D0101",
  onchfs_renderer_v1: "0x9e2a51d8f36c371c047f8B0343E806d9243aeCA8",
  randomizer_v1: "0x46C7B3D711c329f8B12fcE14B6aa2C11B59965F0",
  role_registry_v1: "0x036B7CE1C2e505b688f30B6da6cA95E657Dd0c89",
  contract_registry_v1: "0xe1Bb06bDc6F2AE23F2F6F9e00156e693954FE356",
  gen_art_token_impl_v1: "0x9Ad770c804CF9b0DBc10ad28cd218cf3C493f289",
  mint_ticket_impl_v1: "0xD315426062aC7647CE07EaB541DCc4BBD8E53F67",
  onchfs_file_system: "0xc3f5ef1a0256b9ceb1452650db72344809bb3a85",
  onchfs_content_store: "0x7c1730B7bE9424D0b983B84aEb254e3a2a105d91",
  seaport: "0x00cA04c45da318d5b7E7B14D5381Ca59F09C73f0",
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
  seaport: "0x00cA04c45da318d5b7E7B14D5381Ca59F09C73f0",
}
