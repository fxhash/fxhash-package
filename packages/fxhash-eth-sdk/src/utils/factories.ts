import { encodeAbiParameters } from "viem"
import { InitInfo, MetadataInfo, MintInfo, ProjectInfo } from ".."

export function encodeProjectFactoryArgs(
  initInfo: InitInfo,
  projectInfo: ProjectInfo,
  metadataInfo: MetadataInfo,
  mintInfos: MintInfo[],
  royaltyReceivers: `0x${string}`[],
  basisPoints: bigint[]
) {
  return encodeAbiParameters(
    [
      {
        name: "initInfo",
        type: "tuple",
        components: [
          { name: "name", type: "string" },
          { name: "symbol", type: "string" },
          { name: "primaryReceiver", type: "address" },
          { name: "randomizer", type: "address" },
          { name: "renderer", type: "address" },
          { name: "tagIds", type: "uint32[]" },
        ],
      },
      {
        name: "projectInfo",
        type: "tuple",
        components: [
          { name: "mintEnabled", type: "bool" },
          { name: "burnEnabled", type: "bool" },
          { name: "maxSupply", type: "uint120" },
          { name: "inputSize", type: "uint120" },
        ],
      },
      {
        name: "metadataInfo",
        type: "tuple",
        components: [
          { name: "baseURI", type: "string" },
          { name: "onchainPointer", type: "address" },
        ],
      },
      {
        name: "mintInfos",
        type: "tuple[]",
        components: [
          { name: "minter", type: "address" },
          {
            name: "reserveInfo",
            type: "tuple",
            components: [
              { name: "startTime", type: "uint64" },
              { name: "endTime", type: "uint64" },
              { name: "allocation", type: "uint128" },
            ],
          },
          { name: "params", type: "bytes" },
        ],
      },
      {
        name: "royaltiesReceivers",
        type: "address[]",
      },
      {
        name: "basisPoints",
        type: "uint96[]",
      },
    ],
    [
      initInfo,
      projectInfo,
      metadataInfo,
      mintInfos,
      royaltyReceivers,
      basisPoints,
    ]
  )
}

export function encodeTicketFactoryArgs(
  owner: `0x${string}`,
  genArtToken: `0x${string}`,
  redeemer: `0x${string}`,
  renderer: `0x${string}`,
  gracePeriod: number,
  mintInfos: MintInfo[]
) {
  return encodeAbiParameters(
    [
      { name: "owner", type: "address" },
      { name: "genArtToken", type: "address" },
      { name: "redeemer", type: "address" },
      { name: "renderer", type: "address" },
      { name: "gracePeriod", type: "uint48" },
      {
        name: "mintInfos",
        type: "tuple[]",
        components: [
          { name: "minter", type: "address" },
          {
            name: "reserveInfo",
            type: "tuple",
            components: [
              { name: "startTime", type: "uint64" },
              { name: "endTime", type: "uint64" },
              { name: "allocation", type: "uint128" },
            ],
          },
          { name: "params", type: "bytes" },
        ],
      },
    ],
    [owner, genArtToken, redeemer, renderer, gracePeriod, mintInfos]
  )
}
