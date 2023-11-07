export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "_roleRegistry",
        type: "address",
      },
      {
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidInputSize",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPrimaryReceiver",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    name: "ImplementationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint96",
        name: "_projectId",
        type: "uint96",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_genArtToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "ProjectCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "address",
            name: "primaryReceiver",
            type: "address",
          },
          {
            internalType: "address",
            name: "randomizer",
            type: "address",
          },
          {
            internalType: "address",
            name: "renderer",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "tagIds",
            type: "uint256[]",
          },
        ],
        internalType: "struct InitInfo",
        name: "_initInfo",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "onchain",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "mintEnabled",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "burnEnabled",
            type: "bool",
          },
          {
            internalType: "uint120",
            name: "maxSupply",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "inputSize",
            type: "uint120",
          },
          {
            internalType: "string",
            name: "contractURI",
            type: "string",
          },
        ],
        internalType: "struct ProjectInfo",
        name: "_projectInfo",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "baseURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "onchainData",
            type: "bytes",
          },
        ],
        internalType: "struct MetadataInfo",
        name: "_metadataInfo",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "minter",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint64",
                name: "startTime",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "endTime",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "allocation",
                type: "uint128",
              },
            ],
            internalType: "struct ReserveInfo",
            name: "reserveInfo",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "params",
            type: "bytes",
          },
        ],
        internalType: "struct MintInfo[]",
        name: "_mintInfo",
        type: "tuple[]",
      },
      {
        internalType: "address payable[]",
        name: "_royaltyReceivers",
        type: "address[]",
      },
      {
        internalType: "uint96[]",
        name: "_basisPoints",
        type: "uint96[]",
      },
    ],
    name: "createProject",
    outputs: [
      {
        internalType: "address",
        name: "genArtToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "projectId",
    outputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    name: "projects",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "roleRegistry",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    name: "setImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]
