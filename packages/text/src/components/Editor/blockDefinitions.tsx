import { FxTextBlockDefinitions } from "./_types"
import { IFxTextBlockDefinition } from "./blocks/_interfaces"
import { EFxTextBlocks } from "./blocks/_types"
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

export const ArticleBlocksList: (keyof EFxTextBlocks)[] = Object.keys(
  EFxTextBlocks
) as (keyof EFxTextBlocks)[]

export const InstantiableArticleBlocksList: EFxTextBlocks[] = [
  EFxTextBlocks.paragraph,
  EFxTextBlocks.heading,
  EFxTextBlocks.thematicBreak,
  EFxTextBlocks["tezos-storage-pointer"],
  EFxTextBlocks.image,
  EFxTextBlocks.video,
  EFxTextBlocks.audio,
  EFxTextBlocks["embed-media"],
  EFxTextBlocks.math,
  EFxTextBlocks.table,
  EFxTextBlocks.list,
  EFxTextBlocks.code,
  EFxTextBlocks.blockquote,
]

export const defaultFxTextEditorBlockDefinition: FxTextBlockDefinitions = {
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

export const fxTextBlockDefinitionFallback: IFxTextBlockDefinition<null> = {
  name: "NONE",
  icon: null,
  render: ({ attributes, element, children }) => (
    <div {...attributes}>{children}</div>
  ),
  hasUtilityWrapper: false,
  insertBreakBehavior: EBreakBehavior.default,
}
