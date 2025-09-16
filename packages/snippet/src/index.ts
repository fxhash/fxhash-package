import {
  fxhashSnippetNode,
  htmlToNodes,
  replaceNodeContents,
  replaceSnippet,
} from "./utils/html"
import { snippet_v1 } from "./snippets/v1"
import { snippet_v2 } from "./snippets/v2"
import { snippet_v3 } from "./snippets/v3"

const latest = snippet_v3

export type { HTMLElement } from "node-html-parser"
export {
  snippet_v1,
  snippet_v2,
  snippet_v3,
  latest,
  htmlToNodes,
  fxhashSnippetNode,
  replaceNodeContents,
  replaceSnippet,
}
