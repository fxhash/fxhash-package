export const RESERVOIR_SEAPORT_MODULE_ABI = [
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "router", type: "address" },
      { internalType: "address", name: "exchange", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "InvalidParams", type: "error" },
  { inputs: [], name: "Unauthorized", type: "error" },
  { inputs: [], name: "UnsuccessfulCall", type: "error" },
  { inputs: [], name: "UnsuccessfulFill", type: "error" },
  { inputs: [], name: "UnsuccessfulPayment", type: "error" },
  { inputs: [], name: "WrongParams", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "CallExecuted",
    type: "event",
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
    inputs: [],
    name: "EXCHANGE",
    outputs: [{ internalType: "contract ISeaport", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ISeaport.OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ISeaport.ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum ISeaport.OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct ISeaport.OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          { internalType: "uint120", name: "denominator", type: "uint120" },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" },
        ],
        internalType: "struct ISeaport.AdvancedOrder",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "orderIndex", type: "uint256" },
          { internalType: "enum ISeaport.Side", name: "side", type: "uint8" },
          { internalType: "uint256", name: "index", type: "uint256" },
          { internalType: "uint256", name: "identifier", type: "uint256" },
          {
            internalType: "bytes32[]",
            name: "criteriaProof",
            type: "bytes32[]",
          },
        ],
        internalType: "struct ISeaport.CriteriaResolver[]",
        name: "criteriaResolvers",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "address", name: "fillTo", type: "address" },
          { internalType: "address", name: "refundTo", type: "address" },
          { internalType: "bool", name: "revertIfIncomplete", type: "bool" },
        ],
        internalType: "struct BaseExchangeModule.OfferParams",
        name: "params",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.Fee[]",
        name: "fees",
        type: "tuple[]",
      },
    ],
    name: "acceptERC1155Offer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ISeaport.OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ISeaport.ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum ISeaport.OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct ISeaport.OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          { internalType: "uint120", name: "denominator", type: "uint120" },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" },
        ],
        internalType: "struct ISeaport.AdvancedOrder",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "fillTo", type: "address" },
          { internalType: "address", name: "refundTo", type: "address" },
          { internalType: "bool", name: "revertIfIncomplete", type: "bool" },
          { internalType: "contract IERC20", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.ERC20ListingParams",
        name: "params",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.Fee[]",
        name: "fees",
        type: "tuple[]",
      },
    ],
    name: "acceptERC20Listing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ISeaport.OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ISeaport.ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum ISeaport.OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct ISeaport.OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          { internalType: "uint120", name: "denominator", type: "uint120" },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" },
        ],
        internalType: "struct ISeaport.AdvancedOrder[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "address", name: "fillTo", type: "address" },
          { internalType: "address", name: "refundTo", type: "address" },
          { internalType: "bool", name: "revertIfIncomplete", type: "bool" },
          { internalType: "contract IERC20", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.ERC20ListingParams",
        name: "params",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.Fee[]",
        name: "fees",
        type: "tuple[]",
      },
    ],
    name: "acceptERC20Listings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ISeaport.OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ISeaport.ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum ISeaport.OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct ISeaport.OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          { internalType: "uint120", name: "denominator", type: "uint120" },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" },
        ],
        internalType: "struct ISeaport.AdvancedOrder",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "orderIndex", type: "uint256" },
          { internalType: "enum ISeaport.Side", name: "side", type: "uint8" },
          { internalType: "uint256", name: "index", type: "uint256" },
          { internalType: "uint256", name: "identifier", type: "uint256" },
          {
            internalType: "bytes32[]",
            name: "criteriaProof",
            type: "bytes32[]",
          },
        ],
        internalType: "struct ISeaport.CriteriaResolver[]",
        name: "criteriaResolvers",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "address", name: "fillTo", type: "address" },
          { internalType: "address", name: "refundTo", type: "address" },
          { internalType: "bool", name: "revertIfIncomplete", type: "bool" },
        ],
        internalType: "struct BaseExchangeModule.OfferParams",
        name: "params",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.Fee[]",
        name: "fees",
        type: "tuple[]",
      },
    ],
    name: "acceptERC721Offer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ISeaport.OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ISeaport.ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum ISeaport.OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct ISeaport.OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          { internalType: "uint120", name: "denominator", type: "uint120" },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" },
        ],
        internalType: "struct ISeaport.AdvancedOrder",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "fillTo", type: "address" },
          { internalType: "address", name: "refundTo", type: "address" },
          { internalType: "bool", name: "revertIfIncomplete", type: "bool" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.ETHListingParams",
        name: "params",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.Fee[]",
        name: "fees",
        type: "tuple[]",
      },
    ],
    name: "acceptETHListing",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                components: [
                  { internalType: "address", name: "offerer", type: "address" },
                  { internalType: "address", name: "zone", type: "address" },
                  {
                    components: [
                      {
                        internalType: "enum ISeaport.ItemType",
                        name: "itemType",
                        type: "uint8",
                      },
                      {
                        internalType: "address",
                        name: "token",
                        type: "address",
                      },
                      {
                        internalType: "uint256",
                        name: "identifierOrCriteria",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "startAmount",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "endAmount",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct ISeaport.OfferItem[]",
                    name: "offer",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "enum ISeaport.ItemType",
                        name: "itemType",
                        type: "uint8",
                      },
                      {
                        internalType: "address",
                        name: "token",
                        type: "address",
                      },
                      {
                        internalType: "uint256",
                        name: "identifierOrCriteria",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "startAmount",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "endAmount",
                        type: "uint256",
                      },
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                    ],
                    internalType: "struct ISeaport.ConsiderationItem[]",
                    name: "consideration",
                    type: "tuple[]",
                  },
                  {
                    internalType: "enum ISeaport.OrderType",
                    name: "orderType",
                    type: "uint8",
                  },
                  {
                    internalType: "uint256",
                    name: "startTime",
                    type: "uint256",
                  },
                  { internalType: "uint256", name: "endTime", type: "uint256" },
                  {
                    internalType: "bytes32",
                    name: "zoneHash",
                    type: "bytes32",
                  },
                  { internalType: "uint256", name: "salt", type: "uint256" },
                  {
                    internalType: "bytes32",
                    name: "conduitKey",
                    type: "bytes32",
                  },
                  {
                    internalType: "uint256",
                    name: "totalOriginalConsiderationItems",
                    type: "uint256",
                  },
                ],
                internalType: "struct ISeaport.OrderParameters",
                name: "parameters",
                type: "tuple",
              },
              { internalType: "uint120", name: "numerator", type: "uint120" },
              { internalType: "uint120", name: "denominator", type: "uint120" },
              { internalType: "bytes", name: "signature", type: "bytes" },
              { internalType: "bytes", name: "extraData", type: "bytes" },
            ],
            internalType: "struct ISeaport.AdvancedOrder",
            name: "order",
            type: "tuple",
          },
          { internalType: "uint256", name: "price", type: "uint256" },
        ],
        internalType: "struct SeaportV15Module.SeaportETHListingWithPrice[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        components: [
          { internalType: "address", name: "fillTo", type: "address" },
          { internalType: "address", name: "refundTo", type: "address" },
          { internalType: "bool", name: "revertIfIncomplete", type: "bool" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.ETHListingParams",
        name: "params",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct BaseExchangeModule.Fee[]",
        name: "fees",
        type: "tuple[]",
      },
    ],
    name: "acceptETHListings",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "targets", type: "address[]" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" },
      { internalType: "uint256[]", name: "values", type: "uint256[]" },
    ],
    name: "makeCalls",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "offerer", type: "address" },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                ],
                internalType: "struct ISeaport.OfferItem[]",
                name: "offer",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "enum ISeaport.ItemType",
                    name: "itemType",
                    type: "uint8",
                  },
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                ],
                internalType: "struct ISeaport.ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]",
              },
              {
                internalType: "enum ISeaport.OrderType",
                name: "orderType",
                type: "uint8",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "endTime", type: "uint256" },
              { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
              { internalType: "uint256", name: "salt", type: "uint256" },
              { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256",
              },
            ],
            internalType: "struct ISeaport.OrderParameters",
            name: "parameters",
            type: "tuple",
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct ISeaport.Order[]",
        name: "orders",
        type: "tuple[]",
      },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "orderIndex", type: "uint256" },
              { internalType: "uint256", name: "itemIndex", type: "uint256" },
            ],
            internalType: "struct ISeaport.FulfillmentComponent[]",
            name: "offerComponents",
            type: "tuple[]",
          },
          {
            components: [
              { internalType: "uint256", name: "orderIndex", type: "uint256" },
              { internalType: "uint256", name: "itemIndex", type: "uint256" },
            ],
            internalType: "struct ISeaport.FulfillmentComponent[]",
            name: "considerationComponents",
            type: "tuple[]",
          },
        ],
        internalType: "struct ISeaport.Fulfillment[]",
        name: "fulfillments",
        type: "tuple[]",
      },
    ],
    name: "matchOrders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "router",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
] as const
