import js from "@eslint/js"
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss"
import tseslint from "typescript-eslint"

export default tseslint.config(
  // ESLint's JS recommended rules
  js.configs.recommended,
  // typescript-eslint's recommended rules (no type-checking)
  tseslint.configs.recommended,
  // your custom tweaks
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
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
  return {
    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint,
      },
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/no-unregistered-classes": [
        // TODO do a pass at all the classes that thrown an error as they should be removed
        // Once this is done, we can enable this rule
        "off",
        {
          ignore: ["not-prose", "prose-legal"],
        },
      ],
    },
  }
}
