export interface IEthContracts {
  seaport_zone: string
  splits_controller_v1: string
  splits_main: string
  scripty_storage: string
  scripty_builder: string
  multicall3: string
  project_factory_v1: string
  splits_factory_v1: string
  fixed_price_minter_v1: string
  dutch_auction_minter_v1: string
  mint_ticket_factory_v1: string
  ticket_redeemer_v1: string
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
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  project_factory_v1: "0x52770A0FBd7dcd6991BE4C0def8484DA5dCF71Ff",
  mint_ticket_factory_v1: "0xA07D92912870E3e8a1b95A03c034D64cf291938d",
  splits_factory_v1: "0x7645BC5094Ec0614A383c61CA70d774C9e48BB31",
  splits_controller_v1: "0x5d6accbAf3fD03CC51FA1E12137E67F4FEDFEeEF",
  dutch_auction_minter_v1: "0x05f6d6C7F043452D9Cd1a474e316Bc0190105a88",
  fixed_price_minter_v1: "0x6F9ceeEF6f7743D0cc3017d77d0ecA51bcDa1eeB",
  ticket_redeemer_v1: "0xC02Bc9DA80010583e28Fc5318542aFC483bEb4ef",
  ipfs_renderer_v1: "0x6504D483e4Fe6A60F5d02f395852a2F1C67cD652",
  randomizer_v1: "0x5F488314A5c1B4CDB3aEb5fcd870C40646c71D47",
  role_registry_v1: "0xcfa0a9AA0e4985637455cD6C8C83881f964165B8",
  contract_registry_v1: "0xB703De21785B72f1aa3dE8603f13e1de8821CCf5",
  gen_art_token_impl_v1: "0x3690B8F9629EdB5Be0274584Be49512a3F6c8071",
  mint_ticket_impl_v1: "0x2aA370388b73225CbE38DFdDf1f660E53EaBbbBC",
}
