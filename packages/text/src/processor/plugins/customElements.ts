import { audioProcessor } from "../audio"
import { embedProcessor } from "../embed"
import { tezosStorageProcessor } from "../tezosStorage"
import { videoProcessor } from "../video"
import { CustomArticleElementsByType } from "./_interfaces"

export const customElements: CustomArticleElementsByType = {
  leafDirective: {
    "tezos-storage-pointer": tezosStorageProcessor,
    "embed-media": embedProcessor,
    video: videoProcessor,
    audio: audioProcessor,
  },
  textDirective: {},
  containerDirective: {},
}
