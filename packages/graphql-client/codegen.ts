import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  documents: "src/gql/**/!(*.d).{ts,tsx,graphql}",
  schema: [
    {
      "http://localhost:8888/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": "changeme",
          "x-hasura-role": "user",
        },
      },
    },
  ],
  generates: {
    "./src/generated/": {
      preset: "client",
    },
  },
}

export default config
