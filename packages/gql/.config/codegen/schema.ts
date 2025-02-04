import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://api.v2.dev.fxhash-dev.xyz/v1/graphql": {
        headers: {
          "x-hasura-admin-secret":
            "mmZkYYp6KNGpcIzNIqVhFhGj5Ka5POU4UtxPB82gIT2a2Z173OZHn8MKL3aS3CHH",
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
