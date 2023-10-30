import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
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
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
}

export default config
