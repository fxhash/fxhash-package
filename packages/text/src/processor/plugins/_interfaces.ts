import { type Root } from "mdast"
import { IArticleElementProcessor } from "../_interfaces.js"

export interface CustomArticleElementsByType {
  leafDirective: Record<string, IArticleElementProcessor>
  textDirective: Record<string, IArticleElementProcessor>
  containerDirective: Record<string, IArticleElementProcessor>
}

// Define a custom Node interface that satisfies the constraints expected by unist-util-visit
export interface CustomNode extends Root {
  data: {
    [key: string]: unknown
    hName?: string
    hProperties?: {
      [key: string]: unknown
      class?: string
    }
  }
}
