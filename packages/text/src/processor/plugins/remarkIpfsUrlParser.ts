import { ipfsGatewayUrl } from "@fxhash/config"
import { Transformer } from "unified"
import { visit } from "unist-util-visit"
import { CustomNode } from "./_interfaces.js"

interface RemarkIpfsUrlParserOptions {
  nodeTypes?: string[]
}

export function remarkIpfsUrlParser(
  options?: RemarkIpfsUrlParserOptions
): Transformer<CustomNode, CustomNode> {
  const nodeTypes = options?.nodeTypes || ["image", "video"]
  return (tree: any) => {
    visit(tree, node => {
      if (nodeTypes.includes(node.type) && node.url.startsWith("ipfs://")) {
        node.url = ipfsGatewayUrl(node.url)
        node.ipfsUrl = node.url
      }
      if (nodeTypes.includes(node.name)) {
        if (
          node.data.hProperties.src &&
          node.data.hProperties.src.startsWith("ipfs://")
        ) {
          node.data.hProperties.src = ipfsGatewayUrl(node.data.hProperties.src)
          node.data.hProperties.ipfsUrl = node.data.hProperties.src
        }
      }
    })
  }
}
