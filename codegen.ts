import type { CodegenConfig } from "@graphql-codegen/cli";
require("dotenv").config({});
const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_VENDURE_SERVER + "/shop-api",
  documents: ["src/**/*.graphql"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
