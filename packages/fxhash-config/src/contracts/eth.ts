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
  mint_ticket_impl_v1: string
  gen_art_token_impl_v1: string
  role_registry_v1: string
  contract_registry_v1: string
}

export const ethTestnetContracts: IEthContracts = {
  seaport_zone: "0xaee17a0e6e98e832112fd0a26da22c4e812aa7f5",
  project_factory_v1: "0xd91b2de608ec91d69479385315fd8e34ef9d0077",
  mint_ticket_factory_v1: "0x10162bf9748e25c8bbe78b878001e687be53ebd6",
  splits_factory_v1: "0x6d09df011283221a11c718509fee07695c4b899f",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  dutch_auction_minter_v1: "0xf14fe711cc83d7481d30a82c9131a23b75c73fe9",
  fixed_price_minter_v1: "0x45ca73c7b3c7e95ac4e40610d1ce809a2b399d8a",
  ticket_redeemer_v1: "0x674cb3c1395f629a932f247a362b52f5a67ae920",
  renderer_v1: "0x4d375ea45694a87474ba17e5e12990d7ecc6870c",
  randomizer_v1: "0x89ac2744e0c5ce4a9ab30dc8ace1b471df53d32f",
  mint_ticket_impl_v1: "0xc06612cdaacf5de7edbf4054f1e80a4997ae9ca6",
  role_registry_v1: "0xe695c8ec76a8ab66c68fb161dca186d4a8dea4f9",
  contract_registry_v1: "0x240c0c6fd4d75638acb98f25d90f9b90a13eaed0",
  gen_art_token_impl_v1: "0xaf4f60ee6692043598678f2f3b0cc3fadbdc43a6",
}
