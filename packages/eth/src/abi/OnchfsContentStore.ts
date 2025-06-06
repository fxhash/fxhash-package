export const ONCHFS_CONTENT_STORE = [
  {
    inputs: [{ internalType: "bytes32", name: "checksum", type: "bytes32" }],
    name: "ChecksumExists",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "checksum", type: "bytes32" }],
    name: "ChecksumNotFound",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "checksum",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "contentSize",
        type: "uint256",
      },
    ],
    name: "NewChecksum",
    type: "event",
  },
  {
    inputs: [{ internalType: "bytes", name: "content", type: "bytes" }],
    name: "addContent",
    outputs: [
      { internalType: "bytes32", name: "checksum", type: "bytes32" },
      { internalType: "address", name: "pointer", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "pointer", type: "address" }],
    name: "addPointer",
    outputs: [{ internalType: "bytes32", name: "checksum", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "checksum", type: "bytes32" }],
    name: "checksumExists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "checksum", type: "bytes32" }],
    name: "contentLength",
    outputs: [{ internalType: "uint256", name: "size", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "checksum", type: "bytes32" }],
    name: "getPointer",
    outputs: [{ internalType: "address", name: "pointer", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "pointers",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const
