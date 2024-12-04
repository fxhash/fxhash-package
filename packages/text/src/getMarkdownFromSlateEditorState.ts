import { Descendant } from "slate"
import remarkDirective from "remark-directive"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { slateToRemark, SlateToRemarkOptions } from "remark-slate-transformer"
import remarkStringify from "remark-stringify"
import { unified } from "unified"
import {
  mathProcessor,
  mentionProcessor,
  remarkFxHashCustom,
} from "./processor/_index"
import { figureProcessor } from "./processor/figure"
import { listItemProcessor } from "./processor/list-item"

export function convertSlateLeafDirectiveToMarkdown(node: any): object {
  const { children, type, ...attributes } = node

  return {
    type: "leafDirective",
    name: type,
    children: [
      {
        type: "text",
        value: children[0].text,
      },
    ],
    attributes,
  }
}

const slateToRemarkTransformerOverrides: SlateToRemarkOptions["overrides"] = {
  "tezos-storage-pointer": convertSlateLeafDirectiveToMarkdown,
  "embed-media": convertSlateLeafDirectiveToMarkdown,
  figure: figureProcessor.transformSlateToMarkdownMdhast!,
  inlineMath: mathProcessor.transformSlateToMarkdownMdhast!,
  math: mathProcessor.transformSlateToMarkdownMdhast!,
  mention: mentionProcessor.transformSlateToMarkdownMdhast!,
  listItem: listItemProcessor.transformSlateToMarkdownMdhast!,
}
export async function getMarkdownFromSlateEditorState(slate: Descendant[]) {
  try {
    const processor = unified()
      .use(remarkMath)
      .use(remarkGfm)
      .use(remarkDirective)
      //      .use(remarkUnwrapImages)
      .use(remarkFxHashCustom)
      .use(remarkStringify, {
        bullet: "-",
        bulletOther: "+",
        listItemIndent: "tab",
      })

    const vla = slateToRemark(slate, {
      overrides: slateToRemarkTransformerOverrides,
    })

    const ast = processor.runSync(vla)

    const text = processor.stringify(ast)

    // with the current implementation, the remarkDirective middleware is not
    // properly transforming the empty string attribute value
    // in: { "contract": "erhrthrthrth", "wrong": "" }
    // out: ::dir{contract="erhrthrthrth" wrong}
    // expected: ::dir{contract="erhrthrthrth" wrong=""}
    // one fix would be to fork the remarkDirective plugin (and eventually the
    // mdast-util-directive library) to update this behavior, here I believe:
    // https://github.com/syntax-tree/mdast-util-directive/blob/ca7d8113382727154649cb6bb061d3b4a5282d06/index.js#L351
    // * fix: regex this fucker

    const directiveAttributesFixed = text.replaceAll(
      // matches tezos-storage directives & captures the alt text & the attributes
      /::tezos-storage-pointer\[([^\]]*)\]{([^}]*)}/g,
      (match, ...captures) => {
        const alt = captures[0]
        const attributes: string = captures[1]
        if (attributes) {
          // replace the atributes not followed by an equal, add equality
          const replaced = attributes.replaceAll(
            /([a-z_A-Z0-9]+)(\s|$)/g,
            (_, attribute) => {
              return `${attribute}=""`
            }
          )
          return `::tezos-storage-pointer[${alt}]{${replaced}}`
        } else {
          return match
        }
      }
    )

    return text
  } catch (e) {
    console.error(e)
    throw e
  }
}
