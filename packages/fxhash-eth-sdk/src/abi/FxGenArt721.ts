export const FX_GEN_ART_721_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_contractRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "_roleRegistry",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "activeMinters",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "baseRoyalties",
    inputs: [],
    outputs: [
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "basisPoints",
        type: "uint96",
        internalType: "uint96",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "_tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelOwnershipHandover",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "completeOwnershipHandover",
    inputs: [
      {
        name: "pendingOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "contractRegistry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "contractURI",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "eip712Domain",
    inputs: [],
    outputs: [
      {
        name: "fields",
        type: "bytes1",
        internalType: "bytes1",
      },
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "version",
        type: "string",
        internalType: "string",
      },
      {
        name: "chainId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "verifyingContract",
        type: "address",
        internalType: "address",
      },
      {
        name: "salt",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "extensions",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "fulfillSeedRequest",
    inputs: [
      {
        name: "_tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_seed",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "genArtInfo",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "minter",
        type: "address",
        internalType: "address",
      },
      {
        name: "seed",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "fxParams",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "generateOnchainPointerHash",
    inputs: [
      {
        name: "_data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "generateRendererHash",
    inputs: [
      {
        name: "_renderer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getApproved",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoyalties",
    inputs: [
      {
        name: "_tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "receivers",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "basisPoints",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_initInfo",
        type: "tuple",
        internalType: "struct InitInfo",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "symbol",
            type: "string",
            internalType: "string",
          },
          {
            name: "primaryReceivers",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "allocations",
            type: "uint32[]",
            internalType: "uint32[]",
          },
          {
            name: "randomizer",
            type: "address",
            internalType: "address",
          },
          {
            name: "renderer",
            type: "address",
            internalType: "address",
          },
          {
            name: "tagIds",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "onchainData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "_projectInfo",
        type: "tuple",
        internalType: "struct ProjectInfo",
        components: [
          {
            name: "mintEnabled",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "burnEnabled",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "maxSupply",
            type: "uint120",
            internalType: "uint120",
          },
          {
            name: "inputSize",
            type: "uint88",
            internalType: "uint88",
          },
          {
            name: "earliestStartTime",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
      {
        name: "_metadataInfo",
        type: "tuple",
        internalType: "struct MetadataInfo",
        components: [
          {
            name: "baseURI",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "onchainPointer",
            type: "address",
            internalType: "address",
          },
        ],
      },
      {
        name: "_mintInfo",
        type: "tuple[]",
        internalType: "struct MintInfo[]",
        components: [
          {
            name: "minter",
            type: "address",
            internalType: "address",
          },
          {
            name: "reserveInfo",
            type: "tuple",
            internalType: "struct ReserveInfo",
            components: [
              {
                name: "startTime",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "endTime",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "allocation",
                type: "uint128",
                internalType: "uint128",
              },
            ],
          },
          {
            name: "params",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "_royaltyReceivers",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_allocations",
        type: "uint32[]",
        internalType: "uint32[]",
      },
      {
        name: "_basisPoints",
        type: "uint96",
        internalType: "uint96",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isMinter",
    inputs: [
      {
        name: "_minter",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "issuerInfo",
    inputs: [],
    outputs: [
      {
        name: "primaryReceiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "projectInfo",
        type: "tuple",
        internalType: "struct ProjectInfo",
        components: [
          {
            name: "mintEnabled",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "burnEnabled",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "maxSupply",
            type: "uint120",
            internalType: "uint120",
          },
          {
            name: "inputSize",
            type: "uint88",
            internalType: "uint88",
          },
          {
            name: "earliestStartTime",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "metadataInfo",
    inputs: [],
    outputs: [
      {
        name: "baseURI",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "onchainPointer",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mintParams",
    inputs: [
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fxParams",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nonce",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint96",
        internalType: "uint96",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "result",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownerMint",
    inputs: [
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ownerMintParams",
    inputs: [
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fxParams",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ownerOf",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownershipHandoverExpiresAt",
    inputs: [
      {
        name: "pendingOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "result",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "primaryReceiver",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "randomizer",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "reduceSupply",
    inputs: [
      {
        name: "_supply",
        type: "uint120",
        internalType: "uint120",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registerMinters",
    inputs: [
      {
        name: "_mintInfo",
        type: "tuple[]",
        internalType: "struct MintInfo[]",
        components: [
          {
            name: "minter",
            type: "address",
            internalType: "address",
          },
          {
            name: "reserveInfo",
            type: "tuple",
            internalType: "struct ReserveInfo",
            components: [
              {
                name: "startTime",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "endTime",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "allocation",
                type: "uint128",
                internalType: "uint128",
              },
            ],
          },
          {
            name: "params",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "remainingSupply",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renderer",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "requestOwnershipHandover",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "roleRegistry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "royaltyInfo",
    inputs: [
      {
        name: "_tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_salePrice",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBaseRoyalties",
    inputs: [
      {
        name: "_receivers",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_allocations",
        type: "uint32[]",
        internalType: "uint32[]",
      },
      {
        name: "_basisPoints",
        type: "uint96",
        internalType: "uint96",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBaseURI",
    inputs: [
      {
        name: "_uri",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBurnEnabled",
    inputs: [
      {
        name: "_flag",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMintEnabled",
    inputs: [
      {
        name: "_flag",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setOnchainPointer",
    inputs: [
      {
        name: "_onchainData",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_signature",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPrimaryReceivers",
    inputs: [
      {
        name: "_receivers",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_allocations",
        type: "uint32[]",
        internalType: "uint32[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRandomizer",
    inputs: [
      {
        name: "_randomizer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRenderer",
    inputs: [
      {
        name: "_renderer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_signature",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTags",
    inputs: [
      {
        name: "_tagIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenRoyalties",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "basisPoints",
        type: "uint96",
        internalType: "uint96",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenURI",
    inputs: [
      {
        name: "_tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint96",
        internalType: "uint96",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "unpause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BaseURIUpdated",
    inputs: [
      {
        name: "_uri",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BatchMetadataUpdate",
    inputs: [
      {
        name: "_fromTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_toTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BurnEnabled",
    inputs: [
      {
        name: "_flag",
        type: "bool",
        indexed: true,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EIP712DomainChanged",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MetadataUpdate",
    inputs: [
      {
        name: "_tokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MintEnabled",
    inputs: [
      {
        name: "_flag",
        type: "bool",
        indexed: true,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OnchainPointerUpdated",
    inputs: [
      {
        name: "_pointer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipHandoverCanceled",
    inputs: [
      {
        name: "pendingOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipHandoverRequested",
    inputs: [
      {
        name: "pendingOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "oldOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PrimaryReceiverUpdated",
    inputs: [
      {
        name: "_receiver",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_receivers",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "_allocations",
        type: "uint32[]",
        indexed: false,
        internalType: "uint32[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProjectDeleted",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProjectInitialized",
    inputs: [
      {
        name: "_primaryReceiver",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_projectInfo",
        type: "tuple",
        indexed: false,
        internalType: "struct ProjectInfo",
        components: [
          {
            name: "mintEnabled",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "burnEnabled",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "maxSupply",
            type: "uint120",
            internalType: "uint120",
          },
          {
            name: "inputSize",
            type: "uint88",
            internalType: "uint88",
          },
          {
            name: "earliestStartTime",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
      {
        name: "_metadataInfo",
        type: "tuple",
        indexed: false,
        internalType: "struct MetadataInfo",
        components: [
          {
            name: "baseURI",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "onchainPointer",
            type: "address",
            internalType: "address",
          },
        ],
      },
      {
        name: "_mintInfo",
        type: "tuple[]",
        indexed: false,
        internalType: "struct MintInfo[]",
        components: [
          {
            name: "minter",
            type: "address",
            internalType: "address",
          },
          {
            name: "reserveInfo",
            type: "tuple",
            internalType: "struct ReserveInfo",
            components: [
              {
                name: "startTime",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "endTime",
                type: "uint64",
                internalType: "uint64",
              },
              {
                name: "allocation",
                type: "uint128",
                internalType: "uint128",
              },
            ],
          },
          {
            name: "params",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProjectTags",
    inputs: [
      {
        name: "_tagIds",
        type: "uint256[]",
        indexed: true,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RandomizerUpdated",
    inputs: [
      {
        name: "_randomizer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RendererUpdated",
    inputs: [
      {
        name: "_renderer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SeedFulfilled",
    inputs: [
      {
        name: "_randomizer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "_seed",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SupplyReduced",
    inputs: [
      {
        name: "_prevSupply",
        type: "uint120",
        indexed: true,
        internalType: "uint120",
      },
      {
        name: "_newSupply",
        type: "uint120",
        indexed: true,
        internalType: "uint120",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenIdRoyaltiesUpdated",
    inputs: [
      {
        name: "_tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "_receiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "_basisPoints",
        type: "uint96",
        indexed: false,
        internalType: "uint96",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenRoyaltiesUpdated",
    inputs: [
      {
        name: "_receiver",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_receivers",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "_allocations",
        type: "uint32[]",
        indexed: false,
        internalType: "uint32[]",
      },
      {
        name: "_basisPoints",
        type: "uint96",
        indexed: false,
        internalType: "uint96",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AllocationExceeded",
    inputs: [],
  },
  {
    type: "error",
    name: "BaseRoyaltiesNotSet",
    inputs: [],
  },
  {
    type: "error",
    name: "BurnInactive",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeReceiverMissing",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientSupply",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidAmount",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidEndTime",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidFeeReceiver",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInputSize",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidRoyaltyConfig",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidShortString",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidStartTime",
    inputs: [],
  },
  {
    type: "error",
    name: "LengthMismatch",
    inputs: [],
  },
  {
    type: "error",
    name: "MintActive",
    inputs: [],
  },
  {
    type: "error",
    name: "MintInactive",
    inputs: [],
  },
  {
    type: "error",
    name: "MoreThanOneRoyaltyReceiver",
    inputs: [],
  },
  {
    type: "error",
    name: "NewOwnerIsZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "NoHandoverRequest",
    inputs: [],
  },
  {
    type: "error",
    name: "NoRoyaltyReceiver",
    inputs: [],
  },
  {
    type: "error",
    name: "NonExistentToken",
    inputs: [],
  },
  {
    type: "error",
    name: "NotAuthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "NotOwner",
    inputs: [],
  },
  {
    type: "error",
    name: "OverMaxBasisPointsAllowed",
    inputs: [],
  },
  {
    type: "error",
    name: "StringTooLong",
    inputs: [
      {
        name: "str",
        type: "string",
        internalType: "string",
      },
    ],
  },
  {
    type: "error",
    name: "SupplyRemaining",
    inputs: [],
  },
  {
    type: "error",
    name: "TokenRoyaltiesNotSet",
    inputs: [],
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "UnauthorizedAccount",
    inputs: [],
  },
  {
    type: "error",
    name: "UnauthorizedMinter",
    inputs: [],
  },
  {
    type: "error",
    name: "UnregisteredMinter",
    inputs: [],
  },
  {
    type: "error",
    name: "WriteError",
    inputs: [],
  },
]
