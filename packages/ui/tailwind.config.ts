import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"

const config = {
  darkMode: "class",
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      // 1.50rem = 24px
      padding: "1rem",
      // Max width for the container
      // Will take full width below this breakpoint
      screens: {
        DEFAULT: "1920px",
      },
    },
    colors: {
      // DESIGN TOKEN COLORS
      border: "var(--border)",
      background: "#ffffff",
      current: "currentColor",
      // DESIGN SYSTEM COLORS
      transparent: "transparent",
      white: "#ffffff",
      black: "var(--color-grey-900)",
      grey: {
        50: "var(--color-grey-50)",
        100: "var(--color-grey-100)",
        200: "var(--color-grey-200)",
        300: "var(--color-grey-300)",
        400: "var(--color-grey-400)",
        500: "var(--color-grey-500)",
        600: "var(--color-grey-600)",
        700: "var(--color-grey-700)",
        800: "var(--color-grey-800)",
        900: "var(--color-grey-900)",
      },
      violet: {
        100: "var(--color-violet-100)",
        200: "var(--color-violet-200)",
        300: "var(--color-violet-300)",
        400: "var(--color-violet-400)",
        500: "var(--color-violet-500)",
        600: "var(--color-violet-600)",
        700: "var(--color-violet-700)",
        800: "var(--color-violet-800)",
        900: "var(--color-violet-900)",
      },
      red: {
        100: "var(--color-red-100)",
        200: "var(--color-red-200)",
        300: "var(--color-red-300)",
        400: "var(--color-red-400)",
        500: "var(--color-red-500)",
        600: "var(--color-red-600)",
        700: "var(--color-red-700)",
        800: "var(--color-red-800)",
        900: "var(--color-red-900)",
      },
      green: {
        100: "var(--color-green-100)",
        200: "var(--color-green-200)",
        300: "var(--color-green-300)",
        400: "var(--color-green-400)",
        500: "var(--color-green-500)",
        600: "var(--color-green-600)",
        700: "var(--color-green-700)",
        800: "var(--color-green-800)",
        900: "var(--color-green-900)",
      },
      orange: {
        100: "var(--color-orange-100)",
        200: "var(--color-orange-200)",
        300: "var(--color-orange-300)",
        400: "var(--color-orange-400)",
        500: "var(--color-orange-500)",
        600: "var(--color-orange-600)",
        700: "var(--color-orange-700)",
        800: "var(--color-orange-800)",
        900: "var(--color-orange-900)",
      },
      pink: {
        100: "var(--color-pink-100)",
        200: "var(--color-pink-200)",
        300: "var(--color-pink-300)",
        400: "var(--color-pink-400)",
        500: "var(--color-pink-500)",
        600: "var(--color-pink-600)",
        700: "var(--color-pink-700)",
        800: "var(--color-pink-800)",
        900: "var(--color-pink-900)",
      },
      vertex: {
        dark: "#111111",
        black: "#000",
        "grey-light": "#9c9c9c",
        "grey-dark": "#3f3f3f",
        grey: "#4e4e4e",
        light: "#f0f0f0",
        "frame-bg": "#0d0d0d",
      },
    },
    fontSize: {
      1: "14px",
      2: "15px",
      3: "16px",
      4: "20px",
      5: "24px",
      6: "28px",
      7: "32px",
      8: "36px",
      9: "40px",
      10: "48px",
    },
    lineHeight: {
      1: "16px",
      2: "20px",
      3: "24px",
      4: "28px",
      5: "32px",
      6: "36px",
      7: "40px",
      8: "44px",
      9: "52px",
      10: "64px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-dwight)"],
        instrumentSerif: ["var(--font-instrument-serif)"],
        "vertex-sans": [
          "HelveticaNeue",
          "Helvetica Neue",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "Lucida Grande",
          "sans-serif",
        ],
        "vertex-sans-2": [
          "var(--font-inter)",
          "HelveticaNeue",
          "Helvetica Neue",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "Lucida Grande",
          "sans-serif",
        ],
        "vertex-mono": ["var(--font-plex-mono)", "monospace"],
      },
      padding: {
        15: "60px",
        19: "76px",
        30: "120px",
      },
      margin: {
        25: "100px",
        30: "120px",
      },
      gap: {
        15: "60px",
      },
      width: {
        25: "6.25rem",
        30: "7.5rem",
      },
      backgroundImage: {
        // Copied custom radial gradient design from figma
        "gradient-radial":
          "radial-gradient(80.81% 80.81% at 51.32% 80.81%, var(--tw-gradient-stops))",
        "token-banner":
          "radial-gradient(83.04% 80.83% at 51.32% 80.81%, #733AF8 18.5%, rgba(115, 58, 248, 0.53) 100%)",
      },
      keyframes: {
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "gradient-loader": {
          "0%": { backgroundPosition: "0 100%" },
          "100%": { backgroundPosition: "-200% 100%" },
        },
        "ticker-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "gradient-loader": "gradient-loader 2s infinite ease-out forwards",
        "ticker-left": "ticker-left 60s linear infinite",
      },
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
      boxShadow: {
        "vertex-secondary":
          "inset 0 0 0 1px rgba(150, 150, 150, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.9)",
        "vertex-shadow":
          "inset 0 0 0 1px rgba(150, 150, 150, 0.5), 0 22px 70px 4px rgba(0, 0, 0, 0.56), 0 0 0 1px rgba(0, 0, 0, 0.9)",
      },
      transitionDelay: {
        "2000": "2000ms",
      },
      zIndex: {
        "100": "100",
      },
    },
    data: {
      vertical: 'orientation~="vertical"',
      horizontal: 'orientation~="horizontal"',
      active: 'state~="active"',
      open: 'state~="open"',
      close: 'state~="close"',
      checked: 'state~="checked"',
      unchecked: 'state~="unchecked"',
      disabled: 'state~="disabled"',
    },
  },
  plugins: [animate, typography],
} satisfies Config

export default config
