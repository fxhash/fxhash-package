import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config = {
  darkMode: "class",
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-bullets": "var(--color-grey-500)",
            "--tw-prose-counters": "var(--color-grey-500)",
            "--tw-prose-invert-bullets": "var(--color-grey-500)",
            "--tw-prose-invert-counters": "var(--color-grey-500)",
            color: false,
            h1: {
              color: false,
              fontWeight: 500,
            },
            h2: {
              color: false,
              fontWeight: 500,
            },
            h3: {
              color: false,
              fontWeight: 500,
            },
            h4: {
              color: false,
              fontWeight: 500,
            },
            a: {
              color: false,
            },
            b: {
              color: false,
              fontWeight: 500,
            },
            th: {
              color: false,
              fontWeight: 500,
            },
            strong: {
              color: false,
              fontWeight: 500,
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config

export default config
