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
  role_registry_v1: string
  contract_registry_v1: string
}

export const ethTestnetContracts: IEthContracts = {
  seaport_zone: "0xaee17a0e6e98e832112fd0a26da22c4e812aa7f5",
  project_factory_v1: "0xdb5256e4e3869c81ea82679562462a483c332b1a",
  mint_ticket_factory_v1: "0x2a1954ad6d4b99490c47f6ddf9652c0058768d5b",
  splits_factory_v1: "0xa5dce4b94ce214e2a0ca6de59d4150ab4c2f15a3",
  splits_main: "0x3e03b08df74146ca4dc1f5f5e884228811b5dd6b",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  dutch_auction_minter_v1: "0xdd9de41fd7de3032be96a938596943d2ac6f57b7",
  fixed_price_minter_v1: "0xcd38bb0b4202a4f65e3d72186bdd31d63998401c",
  ticket_redeemer_v1: "0xd24000cf40fe894e3e2cbb8f7cdc8d7e01f2d63f",
  renderer_v1: "0xf528dd36bfa542de5911bfefe3ec174f8c28402a",
  randomizer_v1: "0xe451664e7e0b73657d797669612626374740e32f",
  mint_ticket_impl_V1: "0x0852988c623ccff9ed4d892e5c7ac617a06b610f",
  role_registry_v1: "0x8ace6af1e084100c66529f8b4dbcb8d94ba0209f",
  contract_registry_v1: "0x846648dd6538f027bc0d0499cab34f9a96beb7b0",
}
