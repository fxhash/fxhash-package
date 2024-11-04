import { MentionProps } from "./mention/Display"
import { EmbedProps } from "./embed/Display"
import { ITezosStoragePointerProps } from "./_index"

export interface FxArticleComponentsMap {
  "tezos-storage-pointer": ITezosStoragePointerProps
  "embed-media": EmbedProps
  mention: MentionProps
}
