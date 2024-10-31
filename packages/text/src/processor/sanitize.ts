import { defaultSchema } from "rehype-sanitize"
import { Schema } from "hast-util-sanitize/lib"
import { embedProcessor } from "./embed"
import { mentionProcessor } from "./mention"
import { tezosStorageProcessor } from "./tezosStorage"

export const articleSchemaSanitize: Schema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "embed-media",
    "tezos-storage-pointer",
    "mention",
    "video",
  ],
  attributes: {
    ...defaultSchema.attributes,
    "*": ["className"],
    img: [...(defaultSchema.attributes?.img || []), "alt"],
    video: [...(defaultSchema.attributes?.video || []), "src", "alt"],
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
