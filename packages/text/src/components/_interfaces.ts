import { MentionProps } from "./mention/Display"
import { TezosStorageProps } from "./tezos-storage-pointer/Display"
import { EmbedProps } from "./embed/Display"

export interface FxArticleComponentsMap {
  "tezos-storage-pointer": TezosStorageProps
  "embed-media": EmbedProps
  mention: MentionProps
}
