import fs from "node:fs"
import path from "node:path"
import { defineConfig } from "vitepress"
import { PACKAGES } from "../../scripts/manifest"
import { DefaultTheme } from "vitepress"
import { withMermaid } from "vitepress-plugin-mermaid"

type SidebarItem = DefaultTheme.SidebarItem

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "fxhash sdk",
    description:
      "Build all kinds of applications on top of fxhash using our versatile sdk",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "Home", link: "/" },
        { text: "Getting started", link: "/introduction/getting-started" },
      ],

      sidebar: [
        {
          text: "Introduction",
          items: [
            {
              text: "Getting started",
              link: "/introduction/getting-started",
            },
            {
              text: "Features",
              link: "/introduction/features",
            },
          ],
        },
        {
          text: "Use cases",
          link: "/use-cases",
          items: [
            {
              text: "Project showcase",
              link: "/use-cases/project-showcase",
            },
            {
              text: "Customized minting page",
              link: "/use-cases/customized-minting-page",
            },
            {
              text: "Scrap data",
              link: "/use-cases/scrap-data",
            },
            {
              text: "Nodejs minter",
              link: "/use-cases/nodejs-minter",
            },
          ],
        },
        {
          text: "Concepts",
          items: [
            {
              text: "Wallet options",
              link: "/concepts/wallet-options",
            },
            {
              text: "Cross-environment",
              link: "/concepts/cross-environment",
            },
          ],
        },
        {
          text: "Packages",
          items: PACKAGES.map(pkg => pkgSidebarItem(pkg)),
        },
      ],

      socialLinks: [
        { icon: "github", link: "https://github.com/fxhash/fxhash-package" },
      ],
    },

    /**
     * Removes `.html` extension at the end of URLs
     * https://vitepress.dev/guide/routing#generating-clean-url
     */
    cleanUrls: true,

    /**
     * Allows README.md files to be considered as index files
     * (for integration with github & cleaner URLs)
     */
    rewrites: {
      "README.md": "index.md",
      "(.*)/README.md": "(.*)/index.md",
    },
  })
)

/**
 * Generates a package sidebar item using the package `sidebar.json` file.
 */
function pkgSidebarItem(pkg: string): SidebarItem {
  const pkgSidebar = JSON.parse(
    fs.readFileSync(`./docs/packages/${pkg}/sidebar.json`, "utf-8")
  ) as SidebarItem[]
  const out: SidebarItem = {
    text: `@fxhash/${pkg}`,
    link: `/packages/${pkg}/`,
    collapsed: true,
    items: sidebarLinks(pkgSidebar, `/packages/${pkg}`),
  }
  return out
}

function sidebarLinks(items: SidebarItem[], rootUrl: string) {
  for (const item of items) {
    if (item.link) {
      item.link = path.join(rootUrl, item.link)
      item.link = item.link.replace(/\.mdx?$/, "")
    }
    if (item.items) {
      sidebarLinks(item.items, rootUrl)
    }
  }
  return items
}
