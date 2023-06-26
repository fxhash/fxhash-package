import { HTMLElement, parse } from 'node-html-parser'

export function htmlToNodes(html: string): HTMLElement {
  return parse(html)
}

export function fxhashSnippetNode(html: HTMLElement): HTMLElement|null {
  return html.querySelector("#fxhash-snippet")
}

export function replaceNodeContents(node: HTMLElement, content: string): HTMLElement {
  node.set_content(content)
  return node
}

/**
 * Takes a HTML string and a new snippet, and replace the snippet in the HTML with the new
 * one, returning a new string of the updated HTML
 */
export function replaceSnippet(html: string, newSnippet: string): string {
  const root = htmlToNodes(html)
  const snippetNode = fxhashSnippetNode(root)

  if (!snippetNode) {
    throw new Error("The html file does not contain the fxhash-snippet")
  }

  // replace the snippet with the new one
  replaceNodeContents(snippetNode, newSnippet)
  return root.toString()
}