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
  randomizer_v1: `0x${string}`
  role_registry_v1: `0x${string}`
  contract_registry_v1: `0x${string}`
  gen_art_token_impl_v1: `0x${string}`
  mint_ticket_impl_v1: `0x${string}`
}

export const ethTestnetContracts: IEthContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0xaee17a0e6e98e832112fd0a26da22c4e812aa7f5",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  project_factory_v1: "0xee005c99566a3AcC6D8FDEd22EbC73D39aa07606",
  mint_ticket_factory_v1: "0xe986d9a6E1A5AcBc673D899DD3d0e4020975F2dc",
  dutch_auction_minter_v1: "0x8b3aCfD7E068D22E8020A9c90970C9a3Ca1367ab",
  fixed_price_minter_v1: "0x2278Ae9Ae2d21e1f081F35aB065faaEf9baE07a4",
  ticket_redeemer_v1: "0x5E3ff4182A75e91B60232033Bfbe73C4DE3Fc1dc",
  ipfs_renderer_v1: "0x1c9c4E5B607AaAbc4eC8aeA8737E6918a863b843",
  randomizer_v1: "0xb95183c79beb01b6cb992fC32a11596e2838198E",
  role_registry_v1: "0x3f859cfF0e7f56583A0Dcd318646410B302e294B",
  contract_registry_v1: "0x1880c6CEED031d901c1da85eB8c051AD76642359",
  gen_art_token_impl_v1: "0x6c562D9ebfaA863074968D049782eeD79aC429D4",
  mint_ticket_impl_v1: "0xEE48764cf857Bc71375adb4ADAdF789d9F684912",
}
