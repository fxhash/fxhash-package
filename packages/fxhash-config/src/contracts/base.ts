export interface IBaseContracts {
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
  fxhashTeamSafeAddress: `0x${string}`
  signerSafe: `0x${string}`
  moderationSafe: `0x${string}`
}

/**
 * ! TODO
 * -----------------------------------------------------------------------------
 * Put the actual addresses for the testnet and mainnet contracts.
 * NEED TO DEPLOY:
 * - onchfs
 */

export const baseTestnetContracts: IBaseContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  project_factory_v1: "0xBFc7C4627054Daf3fbeC5b772A5218321950B55F",
  mint_ticket_factory_v1: "0xD7A0FD7Ec343e11577145f4b87289126Ecebc580",
  dutch_auction_minter_v1: "0x3CeBD2f3C0BB9436257f3126556e273eeE601D9C",
  fixed_price_minter_v1: "0x6E3A60C5f740875c8Fe483895520069BBf39dE1C",
  ticket_redeemer_v1: "0x9cBd118a6c8f23245330b5FD2A819feFfd77Ba75",
  ipfs_renderer_v1: "0xce2dD5ceA326bE986327811C1f226d5c40AB2bF8",
  onchfs_renderer_v1: "0xeD61933bEb28c6E0CC73FFC520FBA5511C7D1eDa",
  randomizer_v1: "0xE89C72379eD94F97EbFDDC40603f68972AB171DB",
  role_registry_v1: "0xB809Cd1675bb6a200128661C5A8e342a64a01748",
  contract_registry_v1: "0x58acdAaab9119e82c179Fa63FB1B4295e2dc127a",
  gen_art_token_impl_v1: "0x7F9d75b45DeBe787edE3e1828D8E4B3D51Bd6Fb9",
  mint_ticket_impl_v1: "0x4D8CFF9A6bA5255508f2b82abb4b97b17ED8bC4d",
  onchfs_file_system: "0xc3f5ef1a0256b9ceb1452650db72344809bb3a85",
  onchfs_content_store: "0x7c1730B7bE9424D0b983B84aEb254e3a2a105d91",
  seaport: "0x00cA04c45da318d5b7E7B14D5381Ca59F09C73f0",
  // !TODO: update those addresses
  fxhashTeamSafeAddress: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  signerSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  moderationSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
}

/**
 * TODO
 * -----------------------------------------------------------------------------
 * Put the actual addresses.
 */
export const baseMainnetContracts: IBaseContracts = {
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
  fxhashTeamSafeAddress: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  signerSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  moderationSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
}
