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
  project_factory_v1: "0xF79d860D299Be1C29893541C025a82531F249293",
  mint_ticket_factory_v1: "0x83cCba598aA7eFe0B32388a04AD25D8e259D92e8",
  dutch_auction_minter_v1: "0x754058c47072fEDaAad15FA2D859F8F136070325",
  fixed_price_minter_v1: "0xCd7955db7052B4B73787f0293Eca51c09D047707",
  ticket_redeemer_v1: "0x640DfDF1ab29E44FD240483820640114d523FBf7",
  ipfs_renderer_v1: "0xb95dB924976a0AB5A27Fcf98c2357Abe2e6944b5",
  onchfs_renderer_v1: "0xC0C99a5a3018471556c6bb39a632600695Ab668d",
  randomizer_v1: "0x11aa009C3d32e9E246D29f11aB71463dd53dCf53",
  role_registry_v1: "0xa236B87b9377C4829a25fCCC06acfe267780560d",
  contract_registry_v1: "0xE51dF00e24cEF8AC11B6B488E1fabE3638740408",
  gen_art_token_impl_v1: "0xEfB6b214f9053177a9ea57494BBC78040ECaF764",
  mint_ticket_impl_v1: "0x0C3f68027F926CA0DACA98c1B64702e21444CF5b",
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
  project_factory_v1: "0x4AC44296a7925A271A0aCD70132315a58040D36b",
  mint_ticket_factory_v1: "0x9Fa936C00B1c422a7ac47E0276Dd2a49041E746A",
  dutch_auction_minter_v1: "0xFa960Dd526701e7A23FCCAe3B27e2BD6D6dA1736",
  fixed_price_minter_v1: "0x804b488B3B767f9b3Ee8E8588554711Ae00Bc75B",
  ticket_redeemer_v1: "0x45Be4Ce9419515Cb3Ed899cC7C5628D3235972bd",
  ipfs_renderer_v1: "0xEEA85a74A72653Be8e032266b9C8Fe1446E8e4a6",
  onchfs_renderer_v1: "0x270f7e3A7dA85c957164658C8A731f3ef117bB1B",
  randomizer_v1: "0xE794a645fF99d0840a3Af5F465a8326F9828f2a4",
  role_registry_v1: "0x104a61bA3e9D2b9c417FE1aa1D59f9C5697C16b1",
  contract_registry_v1: "0x99e116ee5C601ABEa1f78361F9b971D55A98854a",
  gen_art_token_impl_v1: "0x44D3f20026E2788e6C4196e7295Dfe45BE486a44",
  mint_ticket_impl_v1: "0x035003FCD3FA20346e024474DDD5D635D7b2Eb2b",
  onchfs_file_system: "0x9e0f2864c6f125bbf599df6ca6e6c3774c5b2e04",
  onchfs_content_store: "0x7c1730B7bE9424D0b983B84aEb254e3a2a105d91",
}
