export interface IEthContracts {
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
}

export const ethTestnetContracts: IEthContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  project_factory_v1: "0x9048D751F4D9Def5F2397a1065eF561FD1038fb2",
  mint_ticket_factory_v1: "0x2460E42942e67eb9d02a33Af740013fE8A036bC0",
  dutch_auction_minter_v1: "0x1bB523d9F73023a6e80F7Cc9670C9c1D9d5092a4",
  fixed_price_minter_v1: "0x745728E4D5814A680F3e9261D91319252dC625eE",
  ticket_redeemer_v1: "0x3589016c93C4CbfBfD21247116109600cAE4BDfe",
  ipfs_renderer_v1: "0x7b2992d0fb92E0d39Db30b56ff20c3C7EB5c7f44",
  onchfs_renderer_v1: "0x6Fb83cCA7ce63b982bE2bed272cBF57E6CABB2a6",
  randomizer_v1: "0x82f2f3558afAE1603ea739E710E3921A96Ba370A",
  role_registry_v1: "0xB4835adfb6145051E878812F1a324F55B53B1A53",
  contract_registry_v1: "0x6e1F61Ef9351C906A762CD8D9C424fFb0b52a949",
  gen_art_token_impl_v1: "0x0107AE1581C39738eCf6Ed6e27cE64f7Aa2D692C",
  mint_ticket_impl_v1: "0xC2eb064668397442C416a66499e64A04b9d6B396",
  onchfs_file_system: "0xc3f5ef1a0256b9ceb1452650db72344809bb3a85",
  onchfs_content_store: "0x7c1730B7bE9424D0b983B84aEb254e3a2a105d91",
}

/**
 * TODO
 * -----------------------------------------------------------------------------
 * Put the actual addresses.
 */
export const ethMainnetContracts: IEthContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  project_factory_v1: "0x51Cba08611136213F3A3477c266183c8cB0a3202",
  mint_ticket_factory_v1: "0xa3bdfcf5a99B12016f5c467e2b4f32Bc2C50c2E9",
  dutch_auction_minter_v1: "0x0a7F0ABa4633132aeb1B43c8fdA2BACaB35f7000",
  fixed_price_minter_v1: "0x40FB78d318995049DaB0828A303464752Ace39A0",
  ticket_redeemer_v1: "0xecE8440A5162F436F7B4f60B583d2f42edc3B43E",
  ipfs_renderer_v1: "0x8EAE7eeF5a586B67d188DEa3fbB7c6156c90aB4A",
  onchfs_renderer_v1: "0xfc9F89640D25a2e19a0a11C978E0b2F47E087Cb6",
  randomizer_v1: "0xba361aA2aC4da2a7D4E961303D9a4eA756961C52",
  role_registry_v1: "0x9b87dE9261C499E32fa9476a6D706abD3EE2C152",
  contract_registry_v1: "0xCDee09b69D44B93f1Dd28560CE5e800Aefa93Cfa",
  gen_art_token_impl_v1: "0xFeD4c55c532fF206F0359636b82c1153381642d4",
  mint_ticket_impl_v1: "0xa2b00a0c52DAd0f2E3b802bE16d2303fb05b7654",
  onchfs_file_system: "0x9e0f2864c6f125bbf599df6ca6e6c3774c5b2e04",
  onchfs_content_store: "0xC6806fd75745bB5F5B32ADa19963898155f9DB91",
}
