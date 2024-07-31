import { supportedEvmChains } from "@/index.js"
import { type Chain, type Hex, extractChain, hexToNumber } from "viem"

export function getChainFromHex(chainId: Hex): Chain | undefined {
  return extractChain({
    chains: supportedEvmChains,
    id: hexToNumber(chainId),
  })
}
