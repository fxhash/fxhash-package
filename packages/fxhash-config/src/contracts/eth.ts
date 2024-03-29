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
  project_factory_v1: "0x4e9ef916F55B5d4a27E6406C7Ce8bcd29c2693d6",
  mint_ticket_factory_v1: "0xbaed21d8C57caf71578b9aE1E09a68721d0Dd02d",
  dutch_auction_minter_v1: "0x2F8ea350E7F29BCaC2AEE5889d64df07EE3Fa98d",
  fixed_price_minter_v1: "0xa6c9c758e80ec18e1a28d485b97400B11dCFCD64",
  ticket_redeemer_v1: "0xdd29eA613e0553fc03f5762Bf643710a7987A216",
  ipfs_renderer_v1: "0x17b9c8a7C6F9D3768D4DA75EBB6abDe9FBe900cf",
  onchfs_renderer_v1: "0x25B087D2c87a0b34188a530dC9cCfDa30822AA8e",
  randomizer_v1: "0x5962e4dEeDe2DB4A83259255D30c19F4397FD5A6",
  role_registry_v1: "0x92B70c5C6E676BdC395DfD911c07392fc7C36E4F",
  contract_registry_v1: "0xb7CFDcDb2c6a1D05D7b85FB4ae7B7bccd028010F",
  gen_art_token_impl_v1: "0x1feeb359e96E6Dd6F19F1FC98e8FffDdf5AeaD58",
  mint_ticket_impl_v1: "0x0303e3a5be6e9Fa21E72cE446a402a6AEec13c60",
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
