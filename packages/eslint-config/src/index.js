import js from "@eslint/js"
import tseslint from "typescript-eslint"
import { createRequire } from "node:module"

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: { ecmaVersion: 2020, sourceType: "module" },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-extra-semi": "off",
    },
  }
)

export function withTailwind({ entryPoint }) {
  if (!entryPoint) {
    throw new Error(
      "You must provide an entryPoint for the Tailwind CSS plugin"
    )
  }

  const require = createRequire(import.meta.url)
  let plugin
  try {
    // load only if the caller opts in
    plugin = require("eslint-plugin-better-tailwindcss")
  } catch {
    throw new Error(
      'Missing peer "eslint-plugin-better-tailwindcss". Install it in your project: npm i -D eslint-plugin-better-tailwindcss'
    )
  }

  return {
    plugins: { "better-tailwindcss": plugin },
    settings: {
      "better-tailwindcss": { entryPoint },
    },
    rules: {
      ...plugin.configs["recommended-error"].rules,
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/no-unregistered-classes": [
        "off",
        { ignore: ["not-prose", "prose-legal"] },
      ],
    },
  }
}
