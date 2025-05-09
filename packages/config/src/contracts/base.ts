export interface IBaseContracts {
  multicall3: `0x${string}`
  seaport_zone: `0x${string}`
  issuer_factory_v1: `0x${string}`
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
  fx_token: `0x${string}`
  fx_airdrop: `0x${string}`
  fx_tez_airdrop: `0x${string}`
  fx_token_launchpad: `0x${string}`
  fx_project_factory: `0x${string}`
}

export const baseTestnetContracts: IBaseContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  issuer_factory_v1: "0x60cFDE3aaf6E938535767794088cf15EaaC50019",
  mint_ticket_factory_v1: "0x8A7e5eE0CeA42DBE1d2aAC4501262B0edC5B518B",
  dutch_auction_minter_v1: "0xeb5Cee0eD6A47BE2A463A0C9e83dA5DE6149d375",
  fixed_price_minter_v1: "0x29159d2DFbF93E991d39Dc080a5f8dcc5C90ebb8",
  ticket_redeemer_v1: "0xFfbC4F51AB33E14380893213d7C969e0626c4C43",
  ipfs_renderer_v1: "0x7657C31078d8bfB8d1BC127fC04dAd23B3f451ed",
  onchfs_renderer_v1: "0xf23C64BA846557c24E6F5086376047b0CE70d1cC",
  randomizer_v1: "0xCA6323f03B5113471BA3b7B2F4Ba0AA2D45aE257",
  role_registry_v1: "0x179f5B8FE1c270D7fC1807355F3fd981A30e21A6",
  contract_registry_v1: "0xd44B3b2Ee596613c1aFcF85c9b0E41A0ec8B79E2",
  gen_art_token_impl_v1: "0x06976f5C039497d8a79Cc0dCE7A95B3E9748164A",
  mint_ticket_impl_v1: "0xa71b5935366BA29332033217a9E83698acadfd2f",
  onchfs_file_system: "0x3fb48e03291b2490f939c961a1ad088437129f71",
  onchfs_content_store: "0x48AC7370df2d5982852172A4D857c29608AFa774",
  seaport: "0x00cA04c45da318d5b7E7B14D5381Ca59F09C73f0",
  fxhashTeamSafeAddress: "0x8a4f6e1ae6Bb77EFE7646f9649Bfd519fA638871",
  signerSafe: "0x8a4f6e1ae6Bb77EFE7646f9649Bfd519fA638871",
  moderationSafe: "0x8a4f6e1ae6Bb77EFE7646f9649Bfd519fA638871",
  farcaster_frame_fixed_price_minter_v1:
    "0xB0905f81167bD90ABD5a583E029D27DA77568084",
  fx_token: "0xd89fdcB6c8D107f27CEe4452Ccfb70Dc4F9768a7",
  fx_airdrop: "0x3be624a86987e70fbf21bd4618e6c06cee0131f1",
  fx_tez_airdrop: "0x3b4c8052ff6092ba86b0a2983e1aeefbe98d3efb",
  fx_token_launchpad: "0xC8b352C819B57F0991fAFcEDFdEf241A1950d0E4",
  fx_project_factory: "0x7e535239AcE186c0d95e89F0c64f57481A987cE5",
}

export const baseMainnetContracts: IBaseContracts = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  seaport_zone: "0x0000000006B429721d1F4c4cD256BF3A38c09Ac6",
  issuer_factory_v1: "0xf05636d65c7a10dF989eC2411D4F3230d3A02f3D",
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
  fxhashTeamSafeAddress: "0x38D3a2F9c63D4a580f100B051ba137fa6d8e2560",
  signerSafe: "0x38D3a2F9c63D4a580f100B051ba137fa6d8e2560",
  moderationSafe: "0x38D3a2F9c63D4a580f100B051ba137fa6d8e2560",
  farcaster_frame_fixed_price_minter_v1:
    "0x6e625892C739bFD960671Db5544E260757480725",
  fx_token: "0xTODO",
  fx_airdrop: "0xTODO",
  fx_tez_airdrop: "0xTODO",
  fx_token_launchpad: "0xTODO",
  fx_project_factory: "0xTODO",
}
