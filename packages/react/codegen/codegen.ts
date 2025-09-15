import type { CodegenConfig } from "@graphql-codegen/cli"
import { config } from "@fxhash/config"

const codegenConfig: CodegenConfig = {
  schema: ["./codegen/client-schema.graphql", config.apis.hasuraGql],
  documents: ["src/**/*.{ts,tsx}"],
  config: {
    // https://github.com/hasura/graphql-engine/issues/3451#issuecomment-1819859763
    onFieldTypeConflict: (existing: unknown) => existing,
  },
  generates: {
    "src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        scalars: {
          MarketplaceMetadataEvm:
            "../../codegen/override-types#MarketplaceMetadataEvm",
          numeric: "string",
        },
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: true,
        },
      },
    },
  },
  ignoreNoDocuments: true,
}

export default codegenConfig
