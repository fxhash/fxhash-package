import { Objkt } from "@fxhash/shared"

/**
 * recent V3 tokens have an ID of "FXN-{id}", so we need to extract the ID
 * part only for these recent tokens
 */
export function getGentkLocalID(id: string): string {
  if (id.includes("-")) {
    return id.split("-")[1]
  }
  return id
}

export function getGentkLocalIDFromObjkt(token: Pick<Objkt, "id">): string {
  return getGentkLocalID(token.id)
}
