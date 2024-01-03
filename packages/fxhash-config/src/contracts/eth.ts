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
  project_factory_v1: "0xd91CFb045109F0F9e094e867e190310a63F5aC22",
  mint_ticket_factory_v1: "0x697b9069b369D67F2cDaC6C4c419bC0dB5d900fF",
  dutch_auction_minter_v1: "0x3e443943fE6DF7D6D140D79c908E9ccBB77a6AD3",
  fixed_price_minter_v1: "0xC6f811f76dD18Eb968c955974942804eeA3C04C6",
  ticket_redeemer_v1: "0x9A8d58fD793AD83c30846EA9651899BC5d600Cb1",
  ipfs_renderer_v1: "0xac1a63987cee6e969Dd4799584f06bB0a58CeDF9",
  onchfs_renderer_v1: "0xb2Fd70B5F3f824aa47f4A42CEB02aB92b93D9356",
  randomizer_v1: "0xdF3dd1A89e655cdA181C681D37FDaC279988064B",
  role_registry_v1: "0x448001C76aAf9EA84dD4BE90b6051E1047c6dECF",
  contract_registry_v1: "0x132608131865770eb00761d082fC4C99078be3F9",
  gen_art_token_impl_v1: "0xE10C37b189951F23Ef36813096617adc17aabA3B",
  mint_ticket_impl_v1: "0xb3C4254Fc3466fFD8f6C481C1C6eBa8513C843C9",
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
  project_factory_v1: "0x442295de8A31d65026dBc09c29d469F6854f188a",
  mint_ticket_factory_v1: "0xDB92ed0e6265d042F05E5C2f6D2F99496e87D706",
  dutch_auction_minter_v1: "0x1bC736a2b144096a4752534C557D7E6C311CcAF1",
  fixed_price_minter_v1: "0xB645cFfD9bFB93c2c181d5Be0D6a8C1d81C2aEf3",
  ticket_redeemer_v1: "0x3D72011b1bB52e33f9D81Fc5553FF4765e3f32c1",
  ipfs_renderer_v1: "0x48F00F8314920ca0cd763D74acFe8cFE4024a274",
  onchfs_renderer_v1: "0xe9fE6b2e494E40404AcB2b8B0a0Bc7b79FD03c83",
  randomizer_v1: "0xED32Ed47A75e298433cF822E10645C04a0B95075",
  role_registry_v1: "0x22b9Dd17BA1132C027d780bC0A784f08f244022B",
  contract_registry_v1: "0x4DAc308c686D747A804B7E95db606695a529A750",
  gen_art_token_impl_v1: "0x429AC1aA66220573Da6928bcce7384fe50e1284f",
  mint_ticket_impl_v1: "0xc2743B0B901eDAA8ccd1A09914449A797e1079F1",
  onchfs_file_system: "0x9e0f2864c6f125bbf599df6ca6e6c3774c5b2e04",
  onchfs_content_store: "0xC6806fd75745bB5F5B32ADa19963898155f9DB91",
  seaport: "0x00cA04c45da318d5b7E7B14D5381Ca59F09C73f0",
}
