export interface IEthContracts {
  multicall3: `0x${string}`
  seaport_zone: `0x${string}`
  splits_main: `0x${string}`
  scripty_storage: `0x${string}`
  scripty_builder: `0x${string}`
  project_factory_v1: `0x${string}`
  splits_factory_v1: `0x${string}`
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
  project_factory_v1: "0x17Dc532646DC56c7e8fE10d464F314EeE852B054",
  mint_ticket_factory_v1: "0x0A0817fC59a194fa54C84EFbfDa5d445c27ba0f5",
  splits_factory_v1: "0xfdED3152A2eD1A307C63A02c40C6Dc59f8f7c6A4",
  dutch_auction_minter_v1: "0xCE2580FBcc529e7c46BE92D37f94ff0cD10cC219",
  fixed_price_minter_v1: "0x6368b18C6a9CCA24Ca93c6e189F53061fA058DB4",
  ticket_redeemer_v1: "0xF18510B54E7F08B0F1B0538D46d4Ca1C62ff2374",
  ipfs_renderer_v1: "0xe384589079e1061b72B8B0385a876A42aC68f018",
  randomizer_v1: "0x94a3cC3dd2da9dc2C877Dd95154c3f4f25Bf753D",
  role_registry_v1: "0x6007402a64BE3b40101254F492C110d354E276A1",
  contract_registry_v1: "0x098F32260eB2Ba2ca5d611aEac35B746589622c9",
  gen_art_token_impl_v1: "0x968F38612D315562dCA582c01c83B1Ca8b55cb13",
  mint_ticket_impl_v1: "0xcFFb01732603F89cbc34a53B98daE8F8Cd3CBfcF",
}
