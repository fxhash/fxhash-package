export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_roleRegistry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AllocationExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseRoyaltiesNotSet",
    type: "error",
  },
  {
    inputs: [],
    name: "BurnInactive",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEndTime",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInputSize",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidRoyaltyConfig",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidStartTime",
    type: "error",
  },
  {
    inputs: [],
    name: "LengthMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "MintActive",
    type: "error",
  },
  {
    inputs: [],
    name: "MintInactive",
    type: "error",
  },
  {
    inputs: [],
    name: "MoreThanOneRoyaltyReceiver",
    type: "error",
  },
  {
    inputs: [],
    name: "NoRoyaltyReceiver",
    type: "error",
  },
  {
    inputs: [],
    name: "NonExistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "OverMaxBasisPointsAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenRoyaltiesNotSet",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedContract",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedMinter",
    type: "error",
  },
  {
    inputs: [],
    name: "UnregisteredMinter",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "BaseURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "ContractURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "ImageURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
    inputs: [],
    name: "ProjectDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_primaryReceiver",
        type: "address",
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
        indexed: false,
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
            components: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "contractAddress",
                    type: "address",
                  },
                  {
                    internalType: "bytes",
                    name: "contractData",
                    type: "bytes",
                  },
                  {
                    internalType: "enum HTMLTagType",
                    name: "tagType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "tagOpen",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagClose",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagContent",
                    type: "bytes",
                  },
                ],
                internalType: "struct HTMLTag[]",
                name: "headTags",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "contractAddress",
                    type: "address",
                  },
                  {
                    internalType: "bytes",
                    name: "contractData",
                    type: "bytes",
                  },
                  {
                    internalType: "enum HTMLTagType",
                    name: "tagType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "tagOpen",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagClose",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagContent",
                    type: "bytes",
                  },
                ],
                internalType: "struct HTMLTag[]",
                name: "bodyTags",
                type: "tuple[]",
              },
            ],
            internalType: "struct HTMLRequest",
            name: "animation",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "contractAddress",
                    type: "address",
                  },
                  {
                    internalType: "bytes",
                    name: "contractData",
                    type: "bytes",
                  },
                  {
                    internalType: "enum HTMLTagType",
                    name: "tagType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "tagOpen",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagClose",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagContent",
                    type: "bytes",
                  },
                ],
                internalType: "struct HTMLTag[]",
                name: "headTags",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "contractAddress",
                    type: "address",
                  },
                  {
                    internalType: "bytes",
                    name: "contractData",
                    type: "bytes",
                  },
                  {
                    internalType: "enum HTMLTagType",
                    name: "tagType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "tagOpen",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagClose",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagContent",
                    type: "bytes",
                  },
                ],
                internalType: "struct HTMLTag[]",
                name: "bodyTags",
                type: "tuple[]",
              },
            ],
            internalType: "struct HTMLRequest",
            name: "attributes",
            type: "tuple",
          },
        ],
        indexed: false,
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
        indexed: false,
        internalType: "struct MintInfo[]",
        name: "_mintInfo",
        type: "tuple[]",
      },
    ],
    name: "ProjectInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256[]",
        name: "_tagIds",
        type: "uint256[]",
      },
    ],
    name: "ProjectTags",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_randomizer",
        type: "address",
      },
    ],
    name: "RandomizerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_renderer",
        type: "address",
      },
    ],
    name: "RendererUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_randomizer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_seed",
        type: "bytes32",
      },
    ],
    name: "SeedFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable[]",
        name: "receivers",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint96[]",
        name: "basisPoint",
        type: "uint96[]",
      },
    ],
    name: "TokenIdRoyaltiesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address payable[]",
        name: "receivers",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint96[]",
        name: "basisPoints",
        type: "uint96[]",
      },
    ],
    name: "TokenRoyaltiesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "baseRoyalties",
    outputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "basisPoints",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_seed",
        type: "bytes32",
      },
    ],
    name: "fulfillSeedRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "genArtInfo",
    outputs: [
      {
        internalType: "bytes32",
        name: "seed",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "fxParams",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getRoyalties",
    outputs: [
      {
        internalType: "address payable[]",
        name: "allReceivers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "allBasisPoints",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "_lockTime",
        type: "uint256",
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
            components: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "contractAddress",
                    type: "address",
                  },
                  {
                    internalType: "bytes",
                    name: "contractData",
                    type: "bytes",
                  },
                  {
                    internalType: "enum HTMLTagType",
                    name: "tagType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "tagOpen",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagClose",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagContent",
                    type: "bytes",
                  },
                ],
                internalType: "struct HTMLTag[]",
                name: "headTags",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "contractAddress",
                    type: "address",
                  },
                  {
                    internalType: "bytes",
                    name: "contractData",
                    type: "bytes",
                  },
                  {
                    internalType: "enum HTMLTagType",
                    name: "tagType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "tagOpen",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagClose",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagContent",
                    type: "bytes",
                  },
                ],
                internalType: "struct HTMLTag[]",
                name: "bodyTags",
                type: "tuple[]",
              },
            ],
            internalType: "struct HTMLRequest",
            name: "animation",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "contractAddress",
                    type: "address",
                  },
                  {
                    internalType: "bytes",
                    name: "contractData",
                    type: "bytes",
                  },
                  {
                    internalType: "enum HTMLTagType",
                    name: "tagType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "tagOpen",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagClose",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagContent",
                    type: "bytes",
                  },
                ],
                internalType: "struct HTMLTag[]",
                name: "headTags",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "contractAddress",
                    type: "address",
                  },
                  {
                    internalType: "bytes",
                    name: "contractData",
                    type: "bytes",
                  },
                  {
                    internalType: "enum HTMLTagType",
                    name: "tagType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "tagOpen",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagClose",
                    type: "bytes",
                  },
                  {
                    internalType: "bytes",
                    name: "tagContent",
                    type: "bytes",
                  },
                ],
                internalType: "struct HTMLTag[]",
                name: "bodyTags",
                type: "tuple[]",
              },
            ],
            internalType: "struct HTMLRequest",
            name: "attributes",
            type: "tuple",
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
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    inputs: [
      {
        internalType: "address",
        name: "_minter",
        type: "address",
      },
    ],
    name: "isMinter",
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
    name: "issuerInfo",
    outputs: [
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
        name: "projectInfo",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "primaryReceiver",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "metadataInfo",
    outputs: [
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
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "headTags",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "bodyTags",
            type: "tuple[]",
          },
        ],
        internalType: "struct HTMLRequest",
        name: "animation",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "headTags",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "bodyTags",
            type: "tuple[]",
          },
        ],
        internalType: "struct HTMLRequest",
        name: "attributes",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_fxParams",
        type: "bytes",
      },
    ],
    name: "mintParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mintRandom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_fxParams",
        type: "bytes",
      },
    ],
    name: "ownerMintParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "ownerMintRandom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
    name: "randomizer",
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
        internalType: "uint120",
        name: "_supply",
        type: "uint120",
      },
    ],
    name: "reduceSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "remainingSupply",
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
    name: "renderer",
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
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable[]",
        name: "_receivers",
        type: "address[]",
      },
      {
        internalType: "uint96[]",
        name: "_basisPoints",
        type: "uint96[]",
      },
    ],
    name: "setBaseRoyalties",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "setContractURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "setImageURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_randomizer",
        type: "address",
      },
    ],
    name: "setRandomizer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_renderer",
        type: "address",
      },
    ],
    name: "setRenderer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tagIds",
        type: "uint256[]",
      },
    ],
    name: "setTags",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address payable[]",
        name: "_receivers",
        type: "address[]",
      },
      {
        internalType: "uint96[]",
        name: "_basisPoints",
        type: "uint96[]",
      },
    ],
    name: "setTokenRoyalties",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenRoyalties",
    outputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "basisPoints",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]