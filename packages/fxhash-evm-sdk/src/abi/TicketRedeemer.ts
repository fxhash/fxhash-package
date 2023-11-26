export const ABI = [
  {
    inputs: [],
    name: "AlreadySet",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidToken",
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
        name: "_ticket",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "MintDetailsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_ticket",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "Redeemed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ticket",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_fxParams",
        type: "bytes",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
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
        name: "",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "_mintData",
        type: "bytes",
      },
    ],
    name: "setMintDetails",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "tokens",
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
]
