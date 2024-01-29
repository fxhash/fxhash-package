export const CONTRACT_REGISTRY_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "feeReceiver",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "primaryFeeAllocation",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "secondaryFeeAllocation",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "lockTime",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "referrerShare",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "defaultMetadataURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "externalURI",
            type: "string",
          },
        ],
        internalType: "struct ConfigInfo",
        name: "_configInfo",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "LengthMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "LengthZero",
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
        components: [
          {
            internalType: "address",
            name: "feeReceiver",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "primaryFeeAllocation",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "secondaryFeeAllocation",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "lockTime",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "referrerShare",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "defaultMetadataURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "externalURI",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct ConfigInfo",
        name: "_configInfo",
        type: "tuple",
      },
    ],
    name: "ConfigUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "_contractName",
        type: "string",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "_hashedName",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_contractAddr",
        type: "address",
      },
    ],
    name: "ContractRegistered",
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
    inputs: [],
    name: "configInfo",
    outputs: [
      {
        internalType: "address",
        name: "feeReceiver",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "primaryFeeAllocation",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "secondaryFeeAllocation",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "lockTime",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "referrerShare",
        type: "uint64",
      },
      {
        internalType: "string",
        name: "defaultMetadataURI",
        type: "string",
      },
      {
        internalType: "string",
        name: "externalURI",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "contracts",
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
    inputs: [
      {
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
      {
        internalType: "address[]",
        name: "_contracts",
        type: "address[]",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "feeReceiver",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "primaryFeeAllocation",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "secondaryFeeAllocation",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "lockTime",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "referrerShare",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "defaultMetadataURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "externalURI",
            type: "string",
          },
        ],
        internalType: "struct ConfigInfo",
        name: "_configInfo",
        type: "tuple",
      },
    ],
    name: "setConfig",
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
]
