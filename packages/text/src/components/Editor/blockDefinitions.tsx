import { type FxTextBlockDefinitions } from "./_types.js"
import { type IFxTextBlockDefinition } from "./blocks/_interfaces.js"
import { type FxTextBlockType } from "./blocks/_types.js"
import { audioDefinition } from "./blocks/audio.js"
import { blockquoteDefinition } from "./blocks/blockquote.js"
import { codeDefinition } from "./blocks/code.js"
import { embedDefinition } from "./blocks/embed.js"
import { figureDefinition, figcaptionDefinition } from "./blocks/figure.js"
import { headingDefinition } from "./blocks/heading.js"
import { imageDefinition } from "./blocks/image.js"
import { linkDefinition } from "./blocks/link.js"
import { listDefinition, listItemDefinition } from "./blocks/list.js"
import { inlineMathDefinition, mathDefinition } from "./blocks/math.js"
import { mentionDefinition } from "./blocks/mention.js"
import { paragraphDefinition } from "./blocks/paragraph.js"
import {
  tableDefinition,
  tableRowDefinition,
  tableCellDefinition,
} from "./blocks/table.js"
import { tezosStoragePointerDefinition } from "./blocks/tezos-storage-pointer.js"
import { thematicBreakDefinition } from "./blocks/thematic-break.js"
import { videoDefinition } from "./blocks/video.js"
import { EBreakBehavior } from "./plugins/_index.js"

export const defaultInstantiableBlockTypes: FxTextBlockType[] = [
  "paragraph",
  "heading",
  "thematicBreak",
  "tezos-storage-pointer",
  "image",
  "video",
  "audio",
  "embed-media",
  "math",
  "table",
  "list",
  "code",
  "blockquote",
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
    hasNodeMenu: true,
    renderElement: ({ attributes, element }) => (
      <div
        {...attributes}
        dangerouslySetInnerHTML={{
          __html: element.children[0].text as string,
        }}
      />
    ),
  },
  yaml: {
    name: "YAML",
    hasNodeMenu: true,
    renderElement: ({ attributes, children }) => (
      <pre>
        <code {...attributes}>{children}</code>
      </pre>
    ),
  },
  toml: {
    name: "TOML",
    hasNodeMenu: true,
    renderElement: ({ attributes, children }) => (
      <pre>
        <code {...attributes}>{children}</code>
      </pre>
    ),
  },
  break: {
    name: "Break",
    hasNodeMenu: false,
    renderElement: ({ attributes }) => <br {...attributes} />,
  },
}

export const fxTextBlockDefinitionFallback: IFxTextBlockDefinition<null> = {
  name: "NONE",
  renderElement: ({ attributes, children }) => (
    <div {...attributes}>{children}</div>
  ),
  hasNodeMenu: false,
  insertBreakBehavior: EBreakBehavior.default,
}
