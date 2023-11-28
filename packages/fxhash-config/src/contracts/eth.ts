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
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  splits_main: "0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  project_factory_v1: "0xBd823e08A8bE3e1F705B96ad362d5563bc944266",
  mint_ticket_factory_v1: "0x4f76C619ce80E2bE860B420AF1cC05CA11A8C597",
  dutch_auction_minter_v1: "0x33c1C1ca0A0BC279B5d60E72B566d69430c261ea",
  fixed_price_minter_v1: "0x270351dC73dC2bb1EFA40cCFb4B0ca30dCcB8e2C",
  ticket_redeemer_v1: "0x157E32374C3AF4F7335281b4177404849cEd72cA",
  ipfs_renderer_v1: "0x0261e62B5e5Fc25595C8E03808143E78f0954144",
  randomizer_v1: "0xd90D0D7dBCA06418ee90A9634259130626B259c6",
  role_registry_v1: "0x26C853772509B3006fa0139BAdC274677C458A3C",
  contract_registry_v1: "0x05245FF8D03E88B2354dCEb6158b2EE965753e47",
  gen_art_token_impl_v1: "0xa965Bb875DA39ed97576B1B1aCf50B274E028619",
  mint_ticket_impl_v1: "0x08Ae49fcd3abc85E60cf6C846328678E7C9e8F65",
}
