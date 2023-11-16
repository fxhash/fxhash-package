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
  project_factory_v1: "0x2e08b8ef9ad052565096cff894e02e7498d048ad",
  mint_ticket_factory_v1: "0x9028a8deb74b45ad09203e7935c09011e1ee5093",
  splits_factory_v1: "0x7479da6de044ca9ca4ecebb5a4cb2736d6a18239",
  splits_controller_v1: "0x538c82454bceef0d97036ddc4574e29661a9a162",
  dutch_auction_minter_v1: "0x6b36ac030c1a9f5cdd745a95feea7373a1f51c52",
  fixed_price_minter_v1: "0x4d759ff02cf0f55b37ef87d221f71982cba6c896",
  ticket_redeemer_v1: "0x4390699959b7e0264124306c1d4e96f566bbe8d1",
  scripty_renderer_v1: "0xe2d369901b54186cd62a976b524cafaab8ee327c",
  ipfs_renderer_v1: "0x615185cbf459aadd23d81ff7d661c249992a2075",
  randomizer_v1: "0x973b14ac0a65c19e748cac0b243fbdb202d2cb94",
  role_registry_v1: "0x661141f0106f421cf99916c0ce4fa223b8f3157f",
  contract_registry_v1: "0x900ad2a266105731494c210bd54ebd68d327b7ac",
  gen_art_token_impl_v1: "0x2dc0cc69bfa21484c591babd4430a31b8686ef12",
  mint_ticket_impl_v1: "0xcccf9ba8061a26e48b6179a60c634881ba865594",
}
