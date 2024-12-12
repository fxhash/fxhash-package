export const FX_TICKETS_FACTORY_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_admin",
        type: "address",
        internalType: "address",
      },
      {
        name: "_implementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "_gracePeriod",
        type: "uint48",
        internalType: "uint48",
      },
    ],
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
    name: "createTicket",
    inputs: [
      {
        name: "_creationInfo",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "mintTicket",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createTicket",
    inputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_genArt721",
        type: "address",
        internalType: "address",
      },
      {
        name: "_redeemer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_renderer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_gracePeriod",
        type: "uint48",
        internalType: "uint48",
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
    ],
    outputs: [
      {
        name: "mintTicket",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getTicketAddress",
    inputs: [
      {
        name: "_sender",
        type: "address",
        internalType: "address",
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
    name: "implementation",
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
    name: "minGracePeriod",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nonces",
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
    name: "setImplementation",
    inputs: [
      {
        name: "_implementation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMinGracePeriod",
    inputs: [
      {
        name: "_gracePeriod",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ticketId",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tickets",
    inputs: [
      {
        name: "",
        type: "uint48",
        internalType: "uint48",
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
    type: "event",
    name: "GracePeriodUpdated",
    inputs: [
      {
        name: "_owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_gracePeriod",
        type: "uint48",
        indexed: true,
        internalType: "uint48",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ImplementationUpdated",
    inputs: [
      {
        name: "_owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_implementation",
        type: "address",
        indexed: true,
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
    name: "TicketCreated",
    inputs: [
      {
        name: "_ticketId",
        type: "uint96",
        indexed: true,
        internalType: "uint96",
      },
      {
        name: "_mintTicket",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "InvalidGracePeriod",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidOwner",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidRedeemer",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidRenderer",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidToken",
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
    name: "Unauthorized",
    inputs: [],
  },
] as const
