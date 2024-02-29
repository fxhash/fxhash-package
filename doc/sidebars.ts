import { PACKAGES } from "./manifest"

const sidebars = {
  docsSidebar: [
    "intro",
    ...PACKAGES.map(pkg => ({
      type: "category",
      label: `@fxhash/${pkg}`,
      link: {
        type: "doc",
        id: `reference/${pkg}/index`,
      },
      items: require(`./docs/reference/${pkg}/typedoc-sidebar.cjs`),
    })),
  ],
}

export default sidebars
