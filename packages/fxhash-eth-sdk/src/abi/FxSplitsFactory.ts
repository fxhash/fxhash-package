export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidSplit",
    type: "error",
  },
  {
    inputs: [],
    name: "SplitsExists",
    type: "error",
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
        internalType: "address",
        name: "_split",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_controller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint32[]",
        name: "_allocations",
        type: "uint32[]",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "_distributorFee",
        type: "uint32",
      },
    ],
    name: "SplitsInfo",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_oldController",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_newController",
        type: "address",
      },
    ],
    name: "UpdateController",
    type: "event",
  },
  {
    inputs: [],
    name: "controller",
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
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "_allocations",
        type: "uint32[]",
      },
    ],
    name: "createImmutableSplit",
    outputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "_allocations",
        type: "uint32[]",
      },
    ],
    name: "createMutableSplit",
    outputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "_allocations",
        type: "uint32[]",
      },
    ],
    name: "emitVirtualSplit",
    outputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "renounceOwnership",
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
    inputs: [
      {
        internalType: "address",
        name: "_newController",
        type: "address",
      },
    ],
    name: "updateController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]
