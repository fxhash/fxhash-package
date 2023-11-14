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
  project_factory_v1: "0xeb87b3939c143ddcbba46cca03a27c4db21ef0d1",
  mint_ticket_factory_v1: "0x54636385dbad48519d3b22c9524d59e8c2d4ed66",
  splits_factory_v1: "0x9eb58785919c7b0aad07cd12c4c4ce35658124d5",
  splits_controller_v1: "0xcfff7dd1a1e68a2a8dfde1bfde9083cd9c843ba3",
  dutch_auction_minter_v1: "0x078966656e0fd357e323330520f468a4854a78b9",
  fixed_price_minter_v1: "0x5c43220b5c18125a9e49e23883dac30f1165744a",
  ticket_redeemer_v1: "0xc8157ab0148d1f2d15847f8f991fd7939b27f60f",
  scripty_renderer_v1: "0x39f91b12ba02df390dfb6dc6495cae83a6aa4c0a",
  ipfs_renderer_v1: "0x3c0c9898f93d21bd97351e8146ca061faacc9b0d",
  randomizer_v1: "0x2f518384704d84a71388787a478e512394877597",
  role_registry_v1: "0xa88271742c73a0892b9148c38641be2423c137bb",
  contract_registry_v1: "0x8b1c23ee5bb2a51b9204c51cc61878af022e15d5",
  gen_art_token_impl_v1: "0x65d3822d799d8fd922538a02ce6dc5169b4b8993",
  mint_ticket_impl_v1: "0x5f5328f5e930052027fafe4043bb78df4e6af77b",
}
