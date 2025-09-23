import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  documents: "src/gql/**/!(*.d).{ts,tsx,graphql}",
  schema: "./schema.graphql",
  generates: {
    "./src/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
  config: {
    scalars: {
      numeric: "string",
      uuid: {
        input: "string",
        output: "string",
      },
      ProjectState: {
        input: "string",
        output: "string",
      },
    },
  },
}

export default config
