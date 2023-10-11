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
}

export const ethTestnetContracts: IEthContracts = {
  seaport_zone: "0xaee17a0e6e98e832112fd0a26da22c4e812aa7f5",
  project_factory_v1: "0xa5f0fe6533de82a1a0bb687ce509901969303ef1",
  splits_factory_v1: "0x3612d75987866faa6dc37824a1d414d658f922d3",
  splits_main: "0xb7f8bc63bbcad18155201308c8f3540b07f84f5e",
  scripty_storage: "0x13153f99bdc7b87531e52d8f310aea5e9468ceb5",
  scripty_builder: "0x18eef3cc32083396853eb46a89123b7a5da71d16",
  fixed_price_minter_v1: "0x4df76325d22c17ab84ddc4ad65fced7f4c06bb50",
  dutch_auction_minter_v1: "0xf59fb4570b3c412e3d5526b72a03489759ff92e0",
  mint_ticket_factory_v1: "0x80fee32f8bdda62bb67e883691c3c94c6ed4c525",
}
