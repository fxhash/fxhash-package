import type { Listing } from "@fxhash/shared"
import { FxhashContracts } from "../types/Contracts"

export function getListingFA2Contract(
  listing: Pick<Listing, "version">
): string {
  if (listing.version === 0) {
    return FxhashContracts.MARKETPLACE_V1
  }
  return FxhashContracts.MARKETPLACE_V2
}

export function getListingCancelEp(listing: Pick<Listing, "version">): string {
  if (listing.version === 0) {
    return "cancel_offer"
  }
  return "listing_cancel"
}

export function getListingAcceptEp(listing: Pick<Listing, "version">): string {
  if (listing.version === 0) {
    return "collect"
  }
  return "listing_accept"
}
