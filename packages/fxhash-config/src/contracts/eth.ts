export interface IEthContracts {
  seaport_zone: string
  project_factory_v1: string
  splits_factory_v1: string
  splits_main: string
  scripty_storage: string
  scripty_builder: string
  fixed_price_minter_v1: string
  dutch_auction_minter_v1: string
  mint_ticket_factory_v1: string
  ticket_redeemer_v1: string
  renderer_v1: string
  randomizer_v1: string
  mint_ticket_impl_V1: string
  gen_art_token_impl_v1: string
  role_registry_v1: string
  contract_registry_v1: string
}

export const ethTestnetContracts: IEthContracts = {
  seaport_zone: "0xaee17a0e6e98e832112fd0a26da22c4e812aa7f5",
  project_factory_v1: "0x4d3e755960758d521a879d4aecaabd41b38ad3f3",
  mint_ticket_factory_v1: "0xcdd5096bc3e97818aefc3f620ed9421eddaef9d2",
  splits_factory_v1: "0x13a09244a0b1e4ddf07c79d09bf235a53f4e76ea",
  splits_main: "0x3e03b08df74146ca4dc1f5f5e884228811b5dd6b",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  dutch_auction_minter_v1: "0x268b33440bacbda504d6878875126bb75842e97e",
  fixed_price_minter_v1: "0xb9e1fef6fc704cce6c9595af8e570ddaad5ddbb2",
  ticket_redeemer_v1: "0xdaba915fb482c8ed9aeab10dddcdc934988f4738",
  renderer_v1: "0xaecca2cca794faedc6bdd58aa1129a80a9aa8640",
  randomizer_v1: "0x01b144554d8082ca826a7c2639b90b9ca3319928",
  mint_ticket_impl_V1: "0xe6b04b25956356a01d155459b128e9f915887d28",
  gen_art_token_impl_v1: "0xb029e4af984e31058a9bfec08bf82e92f11fcfd1",
  role_registry_v1: "0x74a631fb1af9592bd5acebf28c9738d5f4c71b84",
  contract_registry_v1: "0xbe8110a0ac21ef28679af2319580dd30e13fd2b5",
}
