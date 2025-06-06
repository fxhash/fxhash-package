export const RESERVOIR_ABI = [
  { inputs: [], name: "UnsuccessfulExecution", type: "error" },
  { inputs: [], name: "UnsuccessfulPayment", type: "error" },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "module", type: "address" },
          { internalType: "bytes", name: "data", type: "bytes" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        internalType: "struct ReservoirV6_0_1.ExecutionInfo[]",
        name: "executionInfos",
        type: "tuple[]",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "module", type: "address" },
          { internalType: "bytes", name: "data", type: "bytes" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        internalType: "struct ReservoirV6_0_1.ExecutionInfo[]",
        name: "executionInfos",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "bytes", name: "data", type: "bytes" },
          { internalType: "uint256", name: "threshold", type: "uint256" },
        ],
        internalType: "struct ReservoirV6_0_1.AmountCheckInfo",
        name: "amountCheckInfo",
        type: "tuple",
      },
    ],
    name: "executeWithAmountCheck",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
] as const
