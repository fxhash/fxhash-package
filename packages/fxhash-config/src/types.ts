/**
 * A mapping of blockchains in their "human-readable" format with their proper
 * blockchain identifier.
 */
export const BlockchainIdentifiers = {
  TezosGhostnet: "tezos:NetXnHfVqm9iesp",
  TezosMainnet: "tezos:NetXdQprcVkpaWU",
  EthereumMainnet: "eip155:1",
  EthereumSepolia: "eip155:11155111",
} as const

/**
 * An union of all the blockchains supported by fxhash, defined by their chain
 * identifier. Can be used to facilitate typescript auto-completion with string
 * when enums aren't as good.
 */
export type BlockchainIdentifier =
  (typeof BlockchainIdentifiers)[keyof typeof BlockchainIdentifiers]
