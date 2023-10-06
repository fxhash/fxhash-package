export const ABI = [
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
        name: "_split",
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
        internalType: "address",
        name: "_controller",
        type: "address",
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
    name: "createSplit",
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
    name: "createVirtualSplit",
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
]
