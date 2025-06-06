export const ONCHFS_FILE_SYSTEM_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_contentStore", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "ChunkNotFound", type: "error" },
  { inputs: [], name: "DirectoryNotFound", type: "error" },
  { inputs: [], name: "FileNotFound", type: "error" },
  { inputs: [], name: "InodeNotFound", type: "error" },
  { inputs: [], name: "InvalidCharacter", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "_size", type: "uint256" },
      { internalType: "uint256", name: "_start", type: "uint256" },
      { internalType: "uint256", name: "_end", type: "uint256" },
    ],
    name: "InvalidCodeAtRange",
    type: "error",
  },
  { inputs: [], name: "InvalidFileName", type: "error" },
  { inputs: [], name: "LengthMismatch", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_checksum",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "_inodeChecksums",
        type: "bytes32[]",
      },
    ],
    name: "DirectoryCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_checksum",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "metadata",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "_chunkPointers",
        type: "bytes32[]",
      },
    ],
    name: "FileCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "CONTENT_STORE",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32[]", name: "_pointers", type: "bytes32[]" },
    ],
    name: "concatenateChunks",
    outputs: [{ internalType: "bytes", name: "fileContent", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string[]", name: "_fileNames", type: "string[]" },
      { internalType: "bytes32[]", name: "_filePointers", type: "bytes32[]" },
    ],
    name: "concatenateFiles",
    outputs: [
      { internalType: "bytes", name: "concatenatedFiles", type: "bytes" },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string[]", name: "_fileNames", type: "string[]" },
      { internalType: "bytes32[]", name: "_inodeChecksums", type: "bytes32[]" },
    ],
    name: "createDirectory",
    outputs: [
      { internalType: "bytes32", name: "directoryChecksum", type: "bytes32" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "_metadata", type: "bytes" },
      { internalType: "bytes32[]", name: "_chunkPointers", type: "bytes32[]" },
    ],
    name: "createFile",
    outputs: [
      { internalType: "bytes32", name: "fileChecksum", type: "bytes32" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_inodeChecksum", type: "bytes32" },
      { internalType: "string[]", name: "_pathSegments", type: "string[]" },
    ],
    name: "getInodeAt",
    outputs: [
      { internalType: "bytes32", name: "", type: "bytes32" },
      {
        components: [
          { internalType: "enum InodeType", name: "inodeType", type: "uint8" },
          {
            components: [
              { internalType: "bytes", name: "metadata", type: "bytes" },
              {
                internalType: "bytes32[]",
                name: "chunkChecksums",
                type: "bytes32[]",
              },
            ],
            internalType: "struct File",
            name: "file",
            type: "tuple",
          },
          {
            components: [
              { internalType: "string[]", name: "filenames", type: "string[]" },
              {
                internalType: "bytes32[]",
                name: "fileChecksums",
                type: "bytes32[]",
              },
            ],
            internalType: "struct Directory",
            name: "directory",
            type: "tuple",
          },
        ],
        internalType: "struct Inode",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_checksum", type: "bytes32" }],
    name: "inodeExists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "checksum", type: "bytes32" }],
    name: "inodes",
    outputs: [
      { internalType: "enum InodeType", name: "inodeType", type: "uint8" },
      {
        components: [
          { internalType: "bytes", name: "metadata", type: "bytes" },
          {
            internalType: "bytes32[]",
            name: "chunkChecksums",
            type: "bytes32[]",
          },
        ],
        internalType: "struct File",
        name: "file",
        type: "tuple",
      },
      {
        components: [
          { internalType: "string[]", name: "filenames", type: "string[]" },
          {
            internalType: "bytes32[]",
            name: "fileChecksums",
            type: "bytes32[]",
          },
        ],
        internalType: "struct Directory",
        name: "directory",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_checksum", type: "bytes32" }],
    name: "readDirectory",
    outputs: [
      { internalType: "string[]", name: "", type: "string[]" },
      { internalType: "bytes32[]", name: "", type: "bytes32[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_checksum", type: "bytes32" }],
    name: "readFile",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
] as const
