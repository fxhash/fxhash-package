import { MessageSigned, SignMessageOptions } from "./WalletManager"

class WalletCacheClass {
  /**
   * A map of addresses -> signature store, where signature store is a map of
   * type -> message signed, where message signed is the last message signed
   * of such type.
   */
  private signaturesCache: Record<string, Record<string, MessageSigned>>

  constructor() {
    this.signaturesCache = {}
  }

  /**
   * Get a signature from the cache, if the options allow, and if a valid
   * signature can be found in the cache.
   */
  public signedMessageFromCache(
    address: string,
    options: SignMessageOptions
  ): MessageSigned | null {
    if (!options.type) return null
    if (options.policy === "wallet-only") return null
    // if we don't have a cache for this address
    if (!this.signaturesCache[address]) return null
    // if we don't have a signature of such a type stored
    if (!this.signaturesCache[address][options.type]) return null
    // check if the message is still valid, that is if it was signed less than
    // 4m ago
    const msg = this.signaturesCache[address][options.type]
    if (Date.now() - msg.signedAt.getTime() < 1000 * 60 * 4) return msg
    return null
  }

  /**
   * Cache a (message, signature) locally.
   */
  public cacheMessageSigned(
    address: string,
    messageSigned: MessageSigned,
    options: SignMessageOptions
  ) {
    if (!options.type) return
    if (!this.signaturesCache[address]) {
      this.signaturesCache[address] = {}
    }
    this.signaturesCache[address][options.type] = messageSigned
  }
}

export const WalletCache = new WalletCacheClass()
