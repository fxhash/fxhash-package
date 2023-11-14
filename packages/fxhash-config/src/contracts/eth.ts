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
  scripty_renderer_v1: string
  ipfs_renderer_v1: string
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
  project_factory_v1: "0xaa6f834aa2afe36e4882b764999d69ceea3784a6",
  mint_ticket_factory_v1: "0xe72f6d19824ea592a20df424d222caabf8ca766b",
  splits_factory_v1: "0xccbf82c1578f9dcf3f9f1e1bcc1186a34d02e97d",
  splits_controller_v1: "0xee6638713b79e1250f3adb457a4bd6e43b2a2453",
  dutch_auction_minter_v1: "0x0f9be3acd642e294d23e707090d8763eeefd9de8",
  fixed_price_minter_v1: "0x28408287ebca509ac5c75f9e9b0417927ec9dc64",
  ticket_redeemer_v1: "0xb2c90eb2ced506ba51d22e8cc5f5e1a71156a84a",
  scripty_renderer_v1: "0xd84526376dbe0bdf28e47081bab8f6ada407d99e",
  ipfs_renderer_v1: "0xb8abf58e30e5b317162184bf8a028005b0a9ae28",
  randomizer_v1: "0xa0cc13c370c5fe3f59c5066112989f93853dd2dd",
  role_registry_v1: "0x10123cb737961a83da6aa8034c9fad5950f4ee13",
  contract_registry_v1: "0x302f975fbb5d744c8c841dc52d623c111d386b16",
  gen_art_token_impl_v1: "0xbf734428b161c0619e133550a14d146aa2a6b62d",
  mint_ticket_impl_v1: "0x9a73c1a32aa8236e7eb465987763e6ee1664387b",
}
