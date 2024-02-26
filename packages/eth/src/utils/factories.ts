import { encodeAbiParameters } from "viem"
import { InitInfo, MetadataInfo, MintInfo, ProjectInfo } from ".."

export function encodeCreateImmutableSplitsParametersArgs(
  accounts: `0x${string}`[],
  percentAllocations: number[],
  distributorFee: number,
  controller: `0x${string}`
) {
  return encodeAbiParameters(
    [
      { name: "accounts", type: "address[]" },
      { name: "percentAllocations", type: "uint32[]" },
      { name: "distributorFee", type: "uint32" },
      { name: "controller", type: "address" },
    ],
    [accounts, percentAllocations, distributorFee, controller]
  )
}

export function encodeProjectFactoryArgs(
  owner: `0x${string}`,
  initInfo: InitInfo,
  projectInfo: ProjectInfo,
  metadataInfo: MetadataInfo,
  mintInfos: MintInfo[],
  royaltyReceivers: `0x${string}`[],
  allocations: number[],
  basisPoints: bigint
) {
  return encodeAbiParameters(
    [
      { name: "owner", type: "address" },
      {
        name: "initInfo",
        type: "tuple",
        components: [
          { name: "name", type: "string" },
          { name: "symbol", type: "string" },
          { name: "primaryReceivers", type: "address[]" },
          { name: "allocations", type: "uint32[]" },
          { name: "randomizer", type: "address" },
          { name: "renderer", type: "address" },
          { name: "tagIds", type: "uint256[]" },
          { name: "onchainData", type: "bytes" },
        ],
      },
      {
        name: "projectInfo",
        type: "tuple",
        components: [
          { name: "mintEnabled", type: "bool" },
          { name: "burnEnabled", type: "bool" },
          { name: "maxSupply", type: "uint120" },
          { name: "inputSize", type: "uint88" },
          { name: "earliestStartTime", type: "uint32" },
        ],
      },
      {
        name: "metadataInfo",
        type: "tuple",
        components: [
          { name: "baseURI", type: "bytes" },
          { name: "onchainPointer", type: "address" },
        ],
      },
      {
        components: [
          {
            name: "minter",
            type: "address",
          },
          {
            components: [
              {
                name: "startTime",
                type: "uint64",
              },
              {
                name: "endTime",
                type: "uint64",
              },
              {
                name: "allocation",
                type: "uint128",
              },
            ],
            name: "reserveInfo",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        name: "mintInfo",
        type: "tuple[]",
      },
      {
        name: "royaltiesReceivers",
        type: "address[]",
      },
      {
        name: "allocations",
        type: "uint32[]",
      },
      {
        name: "basisPoints",
        type: "uint96",
      },
    ],
    [
      owner,
      initInfo,
      projectInfo,
      metadataInfo,
      mintInfos,
      royaltyReceivers,
      allocations,
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
