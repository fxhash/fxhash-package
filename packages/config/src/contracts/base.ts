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
  farcaster_frame_fixed_price_minter_v1: `0x${string}`
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
  project_factory_v1: "0x6BfdA670A73f54463a670d57D57DAC1A5c940844",
  mint_ticket_factory_v1: "0x8D100e257CC60eAb6E3D3c50294bC95Eb6a3dee8",
  dutch_auction_minter_v1: "0x98040A3EaBf7582AA04d8c52528c17386B6eA67E",
  fixed_price_minter_v1: "0x437AeDEC32794aB1E774D5A9a3Ad68F21095Ad4E",
  ticket_redeemer_v1: "0xB223bBdB5d8b9f20E19811677AFc30975fC94219",
  ipfs_renderer_v1: "0x031b8f5cB44B8Fee470c8Ec4734FCEeEef6dc0ef",
  onchfs_renderer_v1: "0xC27b701e2990214F43a129f1638b3111C69Ca574",
  randomizer_v1: "0x177e285fADEbfD1B001B974Ed716360eF672e8f8",
  role_registry_v1: "0x04eE16C868931422231C82025485E0Fe66dE2f55",
  contract_registry_v1: "0x1025c33Eb9A3B7e3A2D90f2F1dA120fAA88cF284",
  gen_art_token_impl_v1: "0x4437652CA5A197238b5cdc5E2dB301E157939f00",
  mint_ticket_impl_v1: "0x4756267c9B1Fe011cA828110F48F21E28b4eC451",
  onchfs_file_system: "0x3fb48e03291b2490f939c961a1ad088437129f71",
  onchfs_content_store: "0x48AC7370df2d5982852172A4D857c29608AFa774",
  seaport: "0x00cA04c45da318d5b7E7B14D5381Ca59F09C73f0",
  // !TODO: update those addresses
  fxhashTeamSafeAddress: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  signerSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  moderationSafe: "0xd0f5a4bD9964056311fC97A38070D073443f3718",
  farcaster_frame_fixed_price_minter_v1:
    "0x6991F279DD4b37d0bC961E829875f01Ab9B11597",
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
  // FIXME: Replace with mainnet address.
  farcaster_frame_fixed_price_minter_v1:
    "0x6991F279DD4b37d0bC961E829875f01Ab9B11597",
}
