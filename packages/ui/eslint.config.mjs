import fxhashEslintConfig, { withTailwind } from "@fxhash/eslint-config/next"

const eslintConfig = [
  ...fxhashEslintConfig,
  withTailwind({ entryPoint: "src/styles/index.css" }),
  {
    ignores: ["dist"],
  },
]

export default eslintConfig
