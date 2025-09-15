import { FxTextComponents } from "./_types.js"
import { EmbedDisplay } from "./embed/Display.js"
import { MentionDisplay } from "./mention/Display.js"
import { TezosStoragePointerDisplay } from "./tezos-storage-pointer/Display.js"

export const fxTextDefaultDisplay: FxTextComponents = {
  // fx(text) custom markdown
  mention: MentionDisplay,
  "tezos-storage-pointer": TezosStoragePointerDisplay,
  "embed-media": EmbedDisplay,
}
