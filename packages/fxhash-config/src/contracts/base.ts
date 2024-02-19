export interface IBaseContracts {
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
  seaport: `0x${string}`
  fxhashTeamSafeAddress: `0x${string}`
  signerSafe: `0x${string}`
  moderationSafe: `0x${string}`
}

/**
 * ! TODO
 * -----------------------------------------------------------------------------
 * Put the actual addresses for the testnet and mainnet contracts.
 * NEED TO DEPLOY:
 * - onchfs
 */

export const baseTestnetContracts: IBaseContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  project_factory_v1: "0xBFc7C4627054Daf3fbeC5b772A5218321950B55F",
  mint_ticket_factory_v1: "0xD7A0FD7Ec343e11577145f4b87289126Ecebc580",
  dutch_auction_minter_v1: "0x3CeBD2f3C0BB9436257f3126556e273eeE601D9C",
  fixed_price_minter_v1: "0x6E3A60C5f740875c8Fe483895520069BBf39dE1C",
  ticket_redeemer_v1: "0x9cBd118a6c8f23245330b5FD2A819feFfd77Ba75",
  ipfs_renderer_v1: "0xce2dD5ceA326bE986327811C1f226d5c40AB2bF8",
  onchfs_renderer_v1: "0xeD61933bEb28c6E0CC73FFC520FBA5511C7D1eDa",
  randomizer_v1: "0xE89C72379eD94F97EbFDDC40603f68972AB171DB",
  role_registry_v1: "0xB809Cd1675bb6a200128661C5A8e342a64a01748",
  contract_registry_v1: "0x58acdAaab9119e82c179Fa63FB1B4295e2dc127a",
  gen_art_token_impl_v1: "0x7F9d75b45DeBe787edE3e1828D8E4B3D51Bd6Fb9",
  mint_ticket_impl_v1: "0x4D8CFF9A6bA5255508f2b82abb4b97b17ED8bC4d",
  onchfs_file_system: "0x3fb48e03291b2490f939c961a1ad088437129f71",
  onchfs_content_store: "0x48AC7370df2d5982852172A4D857c29608AFa774",
  seaport: "0x00cA04c45da318d5b7E7B14D5381Ca59F09C73f0",
  // !TODO: update those addresses
  fxhashTeamSafeAddress: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  signerSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  moderationSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
}

/**
 * TODO
 * -----------------------------------------------------------------------------
 * Put the actual addresses.
 */
export const baseMainnetContracts: IBaseContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  project_factory_v1: "0xf05636d65c7a10dF989eC2411D4F3230d3A02f3D",
  mint_ticket_factory_v1: "0xe5832D3a3da179e818e9E3bFF7b96A928b29Eda2",
  dutch_auction_minter_v1: "0x9667a1Cf26223c9de22207DD93cfEEc9237b8f4E",
  fixed_price_minter_v1: "0x4bDcaC532143d8d35ed759189EE22E3704580b9D",
  ticket_redeemer_v1: "0x972502Bc75A780D76495Ffa84Cf8DA301F162Df6",
  ipfs_renderer_v1: "0x9c4cC8403bE33B89a46794Ae409ce634ca567956",
  onchfs_renderer_v1: "0x4180D747e984C9CFEEfaF23944AE0C20c0742341",
  randomizer_v1: "0x6754E97b8eaeC13Fa24480E9d1240176Dd0f2911",
  role_registry_v1: "0x8d3C748e99066e15425BA1620cdD066d85D6d918",
  contract_registry_v1: "0xCa6e30B1C7cBE7cF605cE30B334f968C5E2EA016",
  gen_art_token_impl_v1: "0xC5769428823C9a0393DC66855DD3817b2A85BEFD",
  mint_ticket_impl_v1: "0x3e9754Da0fb002Fa13D69B2f313d5CB441fC8ef5",
  onchfs_file_system: "0x2983008f292a43f208bba0275afd7e9b3d39af3b",
  onchfs_content_store: "0x070e5A608705aC4954eec054f9074eEe49bDcbfF",
  seaport: "0x00cA04c45da318d5b7E7B14D5381Ca59F09C73f0",
  fxhashTeamSafeAddress: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  signerSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  moderationSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
}
