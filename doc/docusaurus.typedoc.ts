import type { TypeDocOptions } from "typedoc"
// Only available in docusaurus-plugin-typedoc > 0.22.0
import type { PluginOptions } from "docusaurus-plugin-typedoc"

type TypeDocConfig = Partial<
  (TypeDocOptions | PluginOptions) & {
    id: string
    // this option is required to output all reflections into their own document
    // tbh a bit confused why the type definition is missing
    // https://github.com/TypeStrong/typedoc/issues/1900
    allReflectionsHaveOwnDocument: boolean
  }
>

const DEFAULT_CONFIG = {
  mergeReadme: true,
  skipErrorChecking: true,
  cleanOutputDir: true,
  // docusuarus-plugin-typedoc <= 0.22.0 required this option to output e.g. functions into their own md file
  // allReflectionsHaveOwnDocument: true,
  disableSources: true,
  excludeExternals: true,
  excludeInternal: true,
  // This would prevent from anything to be generated that is not properly documented via commments
  // excludeNotDocumented: true,
  excludePrivate: true,
  excludeProtected: true,
  hideGenerator: true,
  kindSortOrder: [
    "Function",
    "TypeAlias",
    "Interface",
    "Reference",
    "Project",
    "Module",
    "Namespace",
    "Class",
    "Constructor",
    "Property",
    "Variable",
    "Accessor",
    "Method",
    "Parameter",
    "TypeParameter",
    "TypeLiteral",
    "CallSignature",
    "ConstructorSignature",
    "IndexSignature",
    "GetSignature",
    "SetSignature",
  ],
  sort: ["kind", "static-first", "required-first", "alphabetical"],
  // Following settings are only available in docusaurus-plugin-typedoc > 0.22.0 (next)
  expandObjects: true,
  useCodeBlocks: true,
} satisfies TypeDocConfig

const ROOT_CATEGORY = "reference"

export function generateTypedocDocusaurusPlugins(directories: string[]) {
  return directories.map(directory => {
    return [
      "docusaurus-plugin-typedoc",
      {
        ...DEFAULT_CONFIG,
        readme: `../packages/${directory}/README.md`,
        entryPoints: [`../packages/${directory}/src`],
        tsconfig: `../packages/${directory}/tsconfig.json`,
        id: directory,
        out: `docs/${ROOT_CATEGORY}/${directory}`,
      },
    ]
  })
}

module.exports = { generateTypedocDocusaurusPlugins }
