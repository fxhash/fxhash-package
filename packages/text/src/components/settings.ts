import { FxTextComponents } from "./_types"
import { EmbedDisplay } from "./embed/Display"
import { MentionDisplay } from "./mention/Display"
import { TezosStoragePointerDisplay } from "./tezos-storage-pointer/Display"

export const fxTextDefaultDisplay: FxTextComponents = {
  // custom markdown
  mention: MentionDisplay,
  "tezos-storage-pointer": TezosStoragePointerDisplay,
  "embed-media": EmbedDisplay,
}
