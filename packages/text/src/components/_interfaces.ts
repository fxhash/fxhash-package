import { MentionProps } from "./mention/Display.js"
import { EmbedProps } from "./embed/Display.js"
import { ITezosStoragePointerProps } from "./_index.js"

export interface FxArticleComponentsMap {
  "tezos-storage-pointer": ITezosStoragePointerProps
  "embed-media": EmbedProps
  mention: MentionProps
}
