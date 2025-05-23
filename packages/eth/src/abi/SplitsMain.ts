export const SPLITS_MAIN_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    name: "CancelControlTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "split",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "previousController",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newController",
        type: "address",
      },
    ],
    name: "ControlTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    name: "CreateSplit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "split",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "DistributeERC20",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "split",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "DistributeETH",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "split",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newPotentialController",
        type: "address",
      },
    ],
    name: "InitiateControlTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    name: "UpdateSplit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "contract ERC20[]",
        name: "tokens",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenAmounts",
        type: "uint256[]",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    name: "acceptControl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    name: "cancelControlTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "percentAllocations",
        type: "uint32[]",
      },
      {
        internalType: "uint32",
        name: "distributorFee",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "controller",
        type: "address",
      },
    ],
    name: "createSplit",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        name: "split",
        type: "address",
      },
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "percentAllocations",
        type: "uint32[]",
      },
      {
        internalType: "uint32",
        name: "distributorFee",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "distributeERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "percentAllocations",
        type: "uint32[]",
      },
      {
        internalType: "uint32",
        name: "distributorFee",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "distributeETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
    ],
    name: "makeSplitImmutable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "percentAllocations",
        type: "uint32[]",
      },
      {
        internalType: "uint32",
        name: "distributorFee",
        type: "uint32",
      },
    ],
    name: "predictImmutableSplitAddress",
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
        name: "split",
        type: "address",
      },
      {
        internalType: "address",
        name: "newController",
        type: "address",
      },
    ],
    name: "transferControl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "percentAllocations",
        type: "uint32[]",
      },
      {
        internalType: "uint32",
        name: "distributorFee",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "updateAndDistributeERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "percentAllocations",
        type: "uint32[]",
      },
      {
        internalType: "uint32",
        name: "distributorFee",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "distributorAddress",
        type: "address",
      },
    ],
    name: "updateAndDistributeETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "split",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "percentAllocations",
        type: "uint32[]",
      },
      {
        internalType: "uint32",
        name: "distributorFee",
        type: "uint32",
      },
    ],
    name: "updateSplit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "walletImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "withdrawETH",
        type: "uint256",
      },
      {
        internalType: "contract ERC20[]",
        name: "tokens",
        type: "address[]",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const
