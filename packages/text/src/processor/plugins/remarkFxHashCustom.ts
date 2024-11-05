import { h } from "hastscript"
import { visit } from "unist-util-visit"
import { CustomNode } from "./_interfaces"
import { Transformer } from "unified"
import { audioProcessor } from "../audio.js"
import { embedProcessor } from "../embed.js"
import { tezosStorageProcessor } from "../tezosStorage.js"
import { videoProcessor } from "../video.js"
import { CustomArticleElementsByType } from "./_interfaces.js"

export const customElements: CustomArticleElementsByType = {
  leafDirective: {
    "tezos-storage-pointer": tezosStorageProcessor,
    "embed-media": embedProcessor,
    video: videoProcessor,
    audio: audioProcessor,
  },
  textDirective: {},
  containerDirective: {},
}

export function remarkFxHashCustom(): Transformer<CustomNode, CustomNode> {
  return (tree: any) => {
    visit(tree, node => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        // @ts-ignore
        const component = customElements[node.type]?.[node.name]
        if (component?.transformMdhastToComponent) {
          const hast: any = h(
            node.name as string,
            node.attributes as Record<string, string>
          )
          const props = component.transformMdhastToComponent(
            node,
            hast.properties
          )
          if (props) {
            const data = node.data || (node.data = {})
            data.hName = component.htmlTagName || hast.tagName
            data.hProperties = props
          }
        }
      }
    })
  }
}
