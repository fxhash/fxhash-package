export const SCRIPTY_BUILDER_ABI = [
  {
    inputs: [],
    name: "BODY_OPEN_RAW",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BODY_OPEN_URL_SAFE",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BODY_RAW_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BODY_SAFE_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DATA_HTML_BASE64_URI_RAW",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DATA_HTML_URL_SAFE",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HEAD_CLOSE_RAW",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HEAD_CLOSE_URL_SAFE",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HEAD_OPEN_RAW",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HEAD_OPEN_URL_SAFE",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HEAD_RAW_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HEAD_URL_SAFE_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HTML_BASE64_DATA_URI_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HTML_BODY_CLOSED_RAW",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HTML_BODY_CLOSED_URL_SAFE",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HTML_OPEN_RAW",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HTML_OPEN_URL_SAFE",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HTML_RAW_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HTML_URL_SAFE_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RAW_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "URLS_RAW_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "URLS_SAFE_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "URL_SAFE_BYTES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "contractData",
            type: "bytes",
          },
          {
            internalType: "enum HTMLTagType",
            name: "tagType",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "tagOpen",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "tagClose",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "tagContent",
            type: "bytes",
          },
        ],
        internalType: "struct HTMLTag",
        name: "htmlTag",
        type: "tuple",
      },
    ],
    name: "fetchTagContent",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "headTags",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "bodyTags",
            type: "tuple[]",
          },
        ],
        internalType: "struct HTMLRequest",
        name: "htmlRequest",
        type: "tuple",
      },
    ],
    name: "getEncodedHTML",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "headTags",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "bodyTags",
            type: "tuple[]",
          },
        ],
        internalType: "struct HTMLRequest",
        name: "htmlRequest",
        type: "tuple",
      },
    ],
    name: "getEncodedHTMLString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "headTags",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "bodyTags",
            type: "tuple[]",
          },
        ],
        internalType: "struct HTMLRequest",
        name: "htmlRequest",
        type: "tuple",
      },
    ],
    name: "getHTML",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "headTags",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "bodyTags",
            type: "tuple[]",
          },
        ],
        internalType: "struct HTMLRequest",
        name: "htmlRequest",
        type: "tuple",
      },
    ],
    name: "getHTMLString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "headTags",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "bodyTags",
            type: "tuple[]",
          },
        ],
        internalType: "struct HTMLRequest",
        name: "htmlRequest",
        type: "tuple",
      },
    ],
    name: "getHTMLURLSafe",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "headTags",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "contractData",
                type: "bytes",
              },
              {
                internalType: "enum HTMLTagType",
                name: "tagType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "tagOpen",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagClose",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "tagContent",
                type: "bytes",
              },
            ],
            internalType: "struct HTMLTag[]",
            name: "bodyTags",
            type: "tuple[]",
          },
        ],
        internalType: "struct HTMLRequest",
        name: "htmlRequest",
        type: "tuple",
      },
    ],
    name: "getHTMLURLSafeString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "sizeForBase64Encoding",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "contractData",
            type: "bytes",
          },
          {
            internalType: "enum HTMLTagType",
            name: "tagType",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "tagOpen",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "tagClose",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "tagContent",
            type: "bytes",
          },
        ],
        internalType: "struct HTMLTag",
        name: "htmlTag",
        type: "tuple",
      },
    ],
    name: "tagOpenCloseForHTMLTag",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "contractData",
            type: "bytes",
          },
          {
            internalType: "enum HTMLTagType",
            name: "tagType",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "tagOpen",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "tagClose",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "tagContent",
            type: "bytes",
          },
        ],
        internalType: "struct HTMLTag",
        name: "htmlTag",
        type: "tuple",
      },
    ],
    name: "tagOpenCloseForHTMLTagURLSafe",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const
