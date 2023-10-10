export interface IEthContracts {
  project_factory: string
  splits_factory: string
  splits_main: string
  scripty_storage: string
  scripty_builder: string
  seaport_zone: string
  fixed_price_minter_v1: string
}

export const ethTestnetContracts: IEthContracts = {
  project_factory: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
  splits_factory: "0x76AEd96a5eEe904cA5a79e151ff3B08573725108",
  splits_main: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
  scripty_storage: "0x13153F99bDc7b87531E52D8F310AeA5E9468ceB5",
  scripty_builder: "0x18EEF3cC32083396853Eb46a89123B7A5da71d16",
  seaport_zone: "0xAee17A0E6e98e832112fD0A26dA22C4e812AA7F5",
  fixed_price_minter_v1: "0xD935876c9E718992BCB56937f43429DCC9ba8f89",
  dutch_auction_v1: "0x137c874829d31ffc8497a2762ee4cdc01848d941",
  mint_ticket_factory_v1: "0x1c2eeeb924982d592de2d53291c1bba14ed9db9d",
}
