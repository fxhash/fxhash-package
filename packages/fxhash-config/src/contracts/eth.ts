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
}

export const ethTestnetContracts: IEthContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  project_factory_v1: "0x13BE4bEd3B0f7C18D60019030efB8E5E955D0398",
  mint_ticket_factory_v1: "0xFDE1840166e395D584AA4a068Ca7f023B2BDA0Cb",
  dutch_auction_minter_v1: "0xec8585c28c8A88FFB54667110E4B6886c63a6f48",
  fixed_price_minter_v1: "0xdD97b013146B185EbE5F6D199e253A76d8E54cBD",
  ticket_redeemer_v1: "0x38ab9c6728e9703c74820990028Bd740AcBeCC0E",
  ipfs_renderer_v1: "0x02d435D0efF1C2aA5c064bA1D203825e6da52F42",
  onchfs_renderer_v1: "0x0B7cd8d8952B2F1c1E9e096FC37a2E5B25C573D8",
  randomizer_v1: "0xC360fa9723842135DFC6e33FEA9225ae893B6B4d",
  role_registry_v1: "0xA6B59786F0640903e3C9d473B7e59DA55f0c964E",
  contract_registry_v1: "0xe1EA7023dC625D02f3c28e0bb58ba8A024896dC6",
  gen_art_token_impl_v1: "0x379F32b5A694422eDf6286CcC2A5c9410B1C59eD",
  mint_ticket_impl_v1: "0x99b95Af45244669D643d8DeDBD28Dbf3ff23f396",
}
