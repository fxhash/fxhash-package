import { defaultSchema } from "rehype-sanitize"
import { Schema } from "hast-util-sanitize/lib"
import { embedProcessor } from "./embed.js"
import { mentionProcessor } from "./mention.js"
import { tezosStorageProcessor } from "./tezosStorage.js"

export const articleSchemaSanitize: Schema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "embed-media",
    "tezos-storage-pointer",
    "mention",
    "video",
    "audio",
  ],
  attributes: {
    ...defaultSchema.attributes,
    "*": ["className"],
    img: [...(defaultSchema.attributes?.img || []), "alt"],
    video: [
      ...(defaultSchema.attributes?.video || []),
      "src",
      "alt",
      "controls",
    ],
    audio: [
      ...(defaultSchema.attributes?.audio || []),
      "src",
      "alt",
      "controls",
    ],
    th: [...(defaultSchema.attributes?.th || []), "align"],
    "embed-media": embedProcessor.htmlAttributes!,
    "tezos-storage-pointer": tezosStorageProcessor.htmlAttributes!,
    mention: mentionProcessor.htmlAttributes!,
  },
  protocols: {
    ...defaultSchema.protocols,
    href: [...(defaultSchema.protocols?.href || []), "ipfs"],
    src: [...(defaultSchema.protocols?.src || []), "ipfs"],
  },
}
