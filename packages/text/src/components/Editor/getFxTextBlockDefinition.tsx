import { IArticleBlockDefinition } from "./blocks/_interfaces"
import { EArticleBlocks } from "./blocks/_types"
import { audioDefinition } from "./blocks/audio"
import { blockquoteDefinition } from "./blocks/blockquote"
import { codeDefinition } from "./blocks/code"
import { embedDefinition } from "./blocks/embed"
import { figureDefinition, figcaptionDefinition } from "./blocks/figure"
import { headingDefinition } from "./blocks/heading"
import { imageDefinition } from "./blocks/image"
import { linkDefinition } from "./blocks/link"
import { listDefinition, listItemDefinition } from "./blocks/list"
import { inlineMathDefinition, mathDefinition } from "./blocks/math"
import { mentionDefinition } from "./blocks/mention"
import { paragraphDefinition } from "./blocks/paragraph"
import {
  tableDefinition,
  tableRowDefinition,
  tableCellDefinition,
} from "./blocks/table"
import { tezosStoragePointerDefinition } from "./blocks/tezos-storage-pointer"
import { thematicBreakDefinition } from "./blocks/thematic-break"
import { videoDefinition } from "./blocks/video"
import { EBreakBehavior } from "./plugins/_types"

export const ArticleBlocksList: (keyof EArticleBlocks)[] = Object.keys(
  EArticleBlocks
) as (keyof EArticleBlocks)[]

export const InstantiableArticleBlocksList: EArticleBlocks[] = [
  EArticleBlocks.paragraph,
  EArticleBlocks.heading,
  EArticleBlocks.thematicBreak,
  EArticleBlocks["tezos-storage-pointer"],
  EArticleBlocks.image,
  EArticleBlocks.video,
  EArticleBlocks.audio,
  EArticleBlocks["embed-media"],
  EArticleBlocks.math,
  EArticleBlocks.table,
  EArticleBlocks.list,
  EArticleBlocks.code,
  EArticleBlocks.blockquote,
]

export const BlockDefinitions: Record<
  EArticleBlocks,
  IArticleBlockDefinition<any>
> = {
  "embed-media": embedDefinition,
  "tezos-storage-pointer": tezosStoragePointerDefinition,
  paragraph: paragraphDefinition,
  heading: headingDefinition,
  thematicBreak: thematicBreakDefinition,
  blockquote: blockquoteDefinition,
  list: listDefinition,
  listItem: listItemDefinition,
  table: tableDefinition,
  tableRow: tableRowDefinition,
  tableCell: tableCellDefinition,
  inlineMath: inlineMathDefinition,
  math: mathDefinition,
  code: codeDefinition,
  link: linkDefinition,
  figure: figureDefinition,
  figcaption: figcaptionDefinition,
  image: imageDefinition,
  video: videoDefinition,
  audio: audioDefinition,
  mention: mentionDefinition,
  html: {
    name: "HTML",
    icon: <i className="fa-brands fa-html5" aria-hidden />,
    render: ({ attributes, element, children }) => (
      <div
        {...attributes}
        dangerouslySetInnerHTML={{
          __html: element.children[0].text as string,
        }}
      />
    ),
    hasUtilityWrapper: true,
  },
  yaml: {
    name: "YAML",
    icon: <i className="fa-solid fa-code" aria-hidden />,
    render: ({ attributes, element, children }) => (
      <pre>
        <code {...attributes}>{children}</code>
      </pre>
    ),
    hasUtilityWrapper: true,
  },
  toml: {
    name: "TOML",
    icon: <i className="fa-solid fa-code" aria-hidden />,
    render: ({ attributes, element, children }) => (
      <pre>
        <code {...attributes}>{children}</code>
      </pre>
    ),
    hasUtilityWrapper: true,
  },
  break: {
    name: "Break",
    icon: null,
    render: ({ attributes, element, children }) => <br />,
    hasUtilityWrapper: false,
  },
}

export const DefaultBlockDefinition: IArticleBlockDefinition<null> = {
  name: "NONE",
  icon: null,
  render: ({ attributes, element, children }) => (
    <div {...attributes}>{children}</div>
  ),
  hasUtilityWrapper: false,
  insertBreakBehavior: EBreakBehavior.default,
}
/**
 * Given the type of an element, outputs their corresponding BlockDefinition or
 * the default one if the one is not defined.
 */
export function getFxTextBlockDefinition(
  type: string
): IArticleBlockDefinition<any> {
  return BlockDefinitions[type as EArticleBlocks] || DefaultBlockDefinition
}
