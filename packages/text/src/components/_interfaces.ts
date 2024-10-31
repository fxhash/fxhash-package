import { ITezosStoragePointer } from "@/processor/_interfaces"

export type TezosStorageProps = ITezosStoragePointer

export interface MentionProps {
  tzAddress: string
}

export interface EmbedProps {
  href?: string
  children?: React.ReactNode
  editable?: boolean
  slateAttributes?: any
  slateElement?: any
}

export interface FxArticleComponentsMap {
  "tezos-storage-pointer": TezosStorageProps
  "embed-media": EmbedProps
  mention: MentionProps
}
