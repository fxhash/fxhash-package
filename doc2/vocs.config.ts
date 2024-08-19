import fs from "node:fs"
import path from "node:path"
import { SidebarItem, defineConfig } from "vocs"
import { PACKAGES } from "./manifest"

export default defineConfig({
  title: "Docs",
  markdown: {
    rehypePlugins: [
      () => {
        return (...params) => {
          console.log("yooooo")
          console.log(params)
        }
      },
    ],
  },
  sidebar: [
    {
      text: "Getting Started",
      link: "/getting-started",
    },
    {
      text: "Example",
      link: "/example",
    },
    {
      text: "Packages",
      items: PACKAGES.map(pkg => pkgSidebarItem(pkg)),
    },
  ],
})

/**
 * Generates a package sidebar item using the package `sidebar.json` file.
 */
function pkgSidebarItem(pkg: string): SidebarItem {
  const pkgSidebar = JSON.parse(
    fs.readFileSync(`./docs/pages/packages/${pkg}/sidebar.json`, "utf-8")
  ) as SidebarItem[]
  const out: SidebarItem = {
    text: `@fxhash/${pkg}`,
    link: `/packages/${pkg}/README`,
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
