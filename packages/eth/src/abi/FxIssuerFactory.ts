export const FX_ISSUER_FACTORY_ABI = [
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
    name: "NewOwnerIsZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NoHandoverRequest",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
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
        name: "pendingOwner",
        type: "address",
      },
    ],
    name: "OwnershipHandoverCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pendingOwner",
        type: "address",
      },
    ],
    name: "OwnershipHandoverRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldOwner",
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
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "cancelOwnershipHandover",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pendingOwner",
        type: "address",
      },
    ],
    name: "completeOwnershipHandover",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_creationInfo",
        type: "bytes",
      },
    ],
    name: "createProject",
    outputs: [
      {
        internalType: "address",
        name: "genArt721",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
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
            internalType: "address[]",
            name: "primaryReceivers",
            type: "address[]",
          },
          {
            internalType: "uint32[]",
            name: "allocations",
            type: "uint32[]",
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
          {
            internalType: "bytes",
            name: "onchainData",
            type: "bytes",
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
            internalType: "uint88",
            name: "inputSize",
            type: "uint88",
          },
          {
            internalType: "uint32",
            name: "earliestStartTime",
            type: "uint32",
          },
        ],
        internalType: "struct ProjectInfo",
        name: "_projectInfo",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "baseURI",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "onchainPointer",
            type: "address",
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
        internalType: "address[]",
        name: "_royaltyReceivers",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "_allocations",
        type: "uint32[]",
      },
      {
        internalType: "uint96",
        name: "_basisPoints",
        type: "uint96",
      },
    ],
    name: "createProjectWithParams",
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
    inputs: [
      {
        internalType: "bytes",
        name: "_projectCreationInfo",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_ticketCreationInfo",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_ticketFactory",
        type: "address",
      },
    ],
    name: "createProjectWithTicket",
    outputs: [
      {
        internalType: "address",
        name: "genArtToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "mintTicket",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "getTokenAddress",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        name: "result",
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
        name: "pendingOwner",
        type: "address",
      },
    ],
    name: "ownershipHandoverExpiresAt",
    outputs: [
      {
        internalType: "uint256",
        name: "result",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestOwnershipHandover",
    outputs: [],
    stateMutability: "payable",
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
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const
