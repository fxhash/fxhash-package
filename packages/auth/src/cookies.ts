import { CookieOptions } from "express"

export const FOURTEEN_DAYS = 14 * 24 * 60 * 60

/**
 * takes CookieOptions and converts maxAge to milliseconds if it is defined
 */
export const getExpressCookieOptions = (
  options: CookieOptions
): CookieOptions => ({
  ...options,
  maxAge: options.maxAge ? options.maxAge * 1000 : undefined,
})

export const COOKIE_OPTIONS_LOCAL: CookieOptions = {
  httpOnly: true,
  maxAge: FOURTEEN_DAYS,
  sameSite: "lax",
  domain: "localhost",
  path: "/",
}

export const COOKIE_OPTIONS_DEV: CookieOptions = {
  httpOnly: true,
  secure: true,
  /**
   * for development (ie dev api) we need to set the same site to none
   * because it is accessed from a variety of domains:
   * - localhost
   * - vercel.app
   * - fxhash-dev.xyz
   */
  sameSite: "none",
  maxAge: FOURTEEN_DAYS,
  domain: ".fxhash-dev.xyz",
  path: "/",
}

export const COOKIE_OPTIONS_PRD: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: FOURTEEN_DAYS,
  domain: ".fxhash.xyz",
  path: "/",
}

export const COOKIE_OPTIONS: CookieOptions =
  process.env.FXHASH_ENV === "local"
    ? COOKIE_OPTIONS_LOCAL
    : process.env.FXHASH_ENV === "dev"
      ? COOKIE_OPTIONS_DEV
      : COOKIE_OPTIONS_PRD

const SPECIAL_COOKIE_KEYS: Record<string, string> = {
  maxAge: "Max-Age",
}

/**
 * Takes CookieOptions and returns them as a string, that can be used e.g.
 * for Set-Cookie header
 * @param options CookieOptions to be parsed
 * @returns string
 */
export function parseCookieOptions(options: CookieOptions): string {
  const cookieParts: string[] = []
  for (const [k, value] of Object.entries(options)) {
    const key = SPECIAL_COOKIE_KEYS[k] || k
    if (value === true) {
      cookieParts.push(`${key}`)
    } else {
      cookieParts.push(`${key}=${value}`)
    }
  }
  return cookieParts.join("; ")
}
