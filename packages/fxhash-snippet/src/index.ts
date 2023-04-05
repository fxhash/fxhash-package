import { fxhashSnippetNode, htmlToNodes, replaceNodeContents, replaceSnippet } from "utils/html";
import { snippet_v1 } from "./snippets/v1";
import { snippet_v2 } from "./snippets/v2";

const latest = snippet_v2

export {
  snippet_v1,
  snippet_v2,
  latest,
  htmlToNodes,
  fxhashSnippetNode,
  replaceNodeContents,
  replaceSnippet
}