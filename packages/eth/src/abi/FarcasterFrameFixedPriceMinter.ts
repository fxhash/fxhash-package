export const FARCASTER_FRAME_FIXED_PRICE_MINTER = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_admin",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "admin",
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
    name: "buy",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_reserveId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "payable",
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
    name: "getFirstValidReserve",
    inputs: [
      {
        name: "_token",
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
    name: "getLatestUpdate",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint40",
        internalType: "uint40",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSaleProceed",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint128",
        internalType: "uint128",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "maxAmountPerFid",
    inputs: [
      {
        name: "",
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
    name: "mint",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_reserveId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_fid",
        type: "uint256",
        internalType: "uint256",
      },
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
    name: "mintedByFid",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
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
    name: "prices",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
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
    name: "reserves",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
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
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setAdmin",
    inputs: [
      {
        name: "_admin",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMintDetails",
    inputs: [
      {
        name: "_reserve",
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
        name: "_mintDetails",
        type: "bytes",
        internalType: "bytes",
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
    type: "function",
    name: "withdraw",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "FrameMinted",
    inputs: [
      {
        name: "_token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_fid",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MintDetailsSet",
    inputs: [
      {
        name: "_token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_reserveId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "_price",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_reserveInfo",
        type: "tuple",
        indexed: false,
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
        name: "_openEdition",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "_timeUnlimited",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "_maxAmountPerFid",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
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
    name: "Purchase",
    inputs: [
      {
        name: "_token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_reserveId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "_buyer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_to",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "_price",
        type: "uint256",
        indexed: false,
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
    type: "event",
    name: "Withdrawn",
    inputs: [
      {
        name: "_token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_proceeds",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressZero",
    inputs: [],
  },
  {
    type: "error",
    name: "Ended",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientFunds",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidAllocation",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidPayment",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidReserve",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidTimes",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidToken",
    inputs: [],
  },
  {
    type: "error",
    name: "MaxAmountExceeded",
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
    name: "NotStarted",
    inputs: [],
  },
  {
    type: "error",
    name: "TooMany",
    inputs: [],
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "ZeroAddress",
    inputs: [],
  },
]
