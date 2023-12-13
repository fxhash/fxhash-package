import { BlockchainIdentifier } from "@fxhash/config"

/**
 * Type for various Licenses
 */
export type License = "GNU Lesser General Public License v2.1" | "MIT"

/**
 * A version of a library
 */
export type LibraryVersion = {
  /**
   * Unique version identifier
   */
  version: string

  /**
   * The preferred filename for the library file.
   */
  filename: string

  /**
   * An optional small information which may be displayed alongside the library.
   */
  info?: string

  /**
   * The License attached to this version of the library
   */
  license: License

  /**
   * The raw textual content of the library.
   */
  content: string

  /**
   * On which blockchains the library is available (identified by chain ids)
   */
  availability: BlockchainIdentifier[]
}

/**
 * A library
 */
export type Library = {
  /**
   * Name of the library, as defined by its authors.
   */
  name: string

  /**
   * A short description associated with the library, preferably in the words
   * of its authors (grabbed on its website for instance).
   */
  description: string

  /**
   * A list of comma-separated authors. We'll try to cover authors when we can,
   * but some libraries have had so many contributors that it's impactical to
   * keep track of all of them, in which case the property will be undefined.
   */
  authors?: string

  /**
   * A link to the library documentation.
   */
  documentation: string

  /**
   * A list of known filenames which have been used for the library. This can be
   * useful for performing a quick search of libraries within a codebase.
   */
  filenames: string[]

  /**
   * A list of version available on the platform. Versions are ordered from
   * most recent to oldest.
   */
  versions: LibraryVersion[]
}
