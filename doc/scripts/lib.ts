import fs from "fs"
import path from "path"
import chalk from "chalk"
import { Application as TypedocApplication } from "typedoc"
import { PACKAGES_CONFIG } from "./manifest"
import { NavigationItem } from "typedoc-plugin-markdown"
import remarkParse from "remark-parse"
import remarkStringify from "remark-stringify"
import { unified } from "unified"
import { visit } from "unist-util-visit"
import { Heading, List, ListItem, Root } from "mdast"
import { DefaultTheme } from "vitepress"

export type SidebarItem = DefaultTheme.SidebarItem
export const DOCS_PATH = "./docs"
export const PKGS_OUTPUT_PATH = path.join(DOCS_PATH, "packages")

export async function generatePackage(pkg: string) {
  const PACKAGE = pkg
  const pkgRootPath = path.join("..", "packages", PACKAGE)
  const pkgOutputPath = path.join(PKGS_OUTPUT_PATH, PACKAGE)
  const pkgOutputRefPath = path.join(pkgOutputPath, "reference")
  const pkgDocPath = path.join(pkgRootPath, "doc")

  const app = await TypedocApplication.bootstrapWithPlugins({
    plugin: ["typedoc-plugin-markdown"],
    tsconfig: `${pkgRootPath}/tsconfig.json`,
    entryPoints: [`${pkgRootPath}/src/index.ts`],
    out: pkgOutputPath,
    skipErrorChecking: true,
    cleanOutputDir: false,
    excludeExternals: true,
    excludeInternal: true,
    navigation: {
      includeGroups: true,
    },
    readme: "none",
    logLevel: "Error",
    exclude: PACKAGES_CONFIG[PACKAGE].omitTypedoc ? ["**/*"] : [],
  })

  app.renderer.postRenderAsyncJobs.push(async output => {
    const nav: NavigationItem[] = updateNavPath((output as any).navigation)

    function updateNavPath(items: NavigationItem[]) {
      for (const item of items) {
        if (item.url) {
          item.url = "reference/" + item.url
        }
        if (item.children) updateNavPath(item.children)
      }
      return items
    }

    const sidebarReference = getSidebar(nav, "")

    if (!fs.existsSync(pkgDocPath)) {
      throw Error(
        `The package ${chalk.bold(PACKAGE)} doesn't have a ${chalk.bold("/doc")} folder at its root.\nPackages are required to have a documentation.`
      )
    }

    let pkgDocReadmePath: string | undefined
    if (fs.existsSync(path.join(pkgDocPath, "README.md"))) {
      pkgDocReadmePath = path.join(pkgDocPath, "README.md")
    } else if (fs.existsSync(path.join(pkgDocPath, "README.mdx"))) {
      pkgDocReadmePath = path.join(pkgDocPath, "README.mdx")
    }
    if (!pkgDocReadmePath) {
      throw Error(
        `The package ${chalk.bold(PACKAGE)} doesn't have a ${chalk.bold("README.md")} file at the root of its ${chalk.bold("/doc")} folder.\nPackages are required to have an index README.md file in their doc.`
      )
    }

    const pkgDocReadme = fs.readFileSync(pkgDocReadmePath, "utf-8")
    const pkgDocReadmeTree = unified().use(remarkParse).parse(pkgDocReadme)

    let pkgDocSidebar: SidebarItem[] | null = null,
      pkgDocReadmeParsed: string = ""
    try {
      const parsing = parseReadmeToc(pkgDocReadmeTree)
      pkgDocSidebar = parsing[1]
      pkgDocReadmeParsed = replaceRelativeLinksToPackages(
        "README.md",
        unified().use(remarkStringify).stringify(parsing[0])
      )
    } catch (err: any) {
      throw Error(
        `Error when parsing ${chalk.bold(PACKAGE)} table of contents: ${err?.message}`
      )
    }
    if (!pkgDocSidebar) throw Error("unexpected")

    // move {package}/doc .md/.mdx files inside this doc and update sidebar
    // with links to this doc
    for (const filePath of walkSync(pkgDocPath)) {
      if (
        ["readme.md", "readme.mdx"].includes(
          path.basename(filePath).toLowerCase()
        )
      )
        continue

      const rootRelativePath = filePath.replace(pkgDocPath + "/", "")
      if ([".md", ".mdx"].includes(path.extname(filePath))) {
        fs.writeFileSync(
          path.join(pkgOutputPath, rootRelativePath),
          replaceRelativeLinksToPackages(
            rootRelativePath,
            fs.readFileSync(filePath, "utf-8")
          ),
          "utf-8"
        )
      } else {
        fs.cpSync(filePath, path.join(pkgOutputPath, rootRelativePath))
      }
    }

    // the package readme is moved as a standalone
    fs.writeFileSync(
      path.join(pkgOutputPath, path.basename(pkgDocReadmePath)),
      pkgDocReadmeParsed
    )

    const sidebarMerged: SidebarItem[] = [...pkgDocSidebar]
    if (nav.length > 0) {
      sidebarMerged.push({
        text: "Reference",
        collapsed: true,
        link: `/reference/README`,
        items: sidebarReference,
      })
    }

    fs.writeFileSync(
      `${pkgOutputPath}/sidebar.json`,
      JSON.stringify(sidebarMerged, null, 2)
    )
  })

  const project = await app.convert()

  if (project) {
    await app.generateDocs(project, pkgOutputRefPath)
  }
}

export function getSidebar(
  navigation: NavigationItem[],
  basePath: string
): SidebarItem[] {
  // console.log({ basePath })
  if (basePath.startsWith(DOCS_PATH)) {
    basePath = basePath.replace(DOCS_PATH, "")
  }
  return navigation
    .map(navigationItem => getNavigationItem(navigationItem, basePath))
    .filter(navItem => Boolean(navItem)) as SidebarItem[]
}

function getNavigationItem(
  navigationItem: NavigationItem,
  basePath: string
): SidebarItem | null {
  let itemPath = navigationItem.url
  if (itemPath && itemPath.endsWith(".md")) {
    itemPath = itemPath.replace(/\.md$/, "")
  }

  if (navigationItem.children?.length) {
    return {
      text: navigationItem.title,
      items: getSidebar(navigationItem.children, basePath),
    }
  }

  if (itemPath) {
    return {
      text: navigationItem.title,
      link: `${basePath}/${itemPath}`,
    }
  }

  return null
}

/**
 * List all files in a directory recursively in a synchronous fashion.
 */
function* walkSync(dir: string): IterableIterator<string> {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const pathToFile = path.join(dir, file)
    const isDirectory = fs.statSync(pathToFile).isDirectory()
    if (isDirectory) {
      yield* walkSync(pathToFile)
    } else {
      yield pathToFile
    }
  }
}

function parseReadmeToc(tree: Root): [Root, SidebarItem[]] {
  // identify the "Contents heading node"
  const toc: {
    heading: Heading | null
    list: List | null
  } = {
    heading: null,
    list: null,
  }

  for (let i = 0; i < tree.children.length; i++) {
    const child = tree.children[i]
    if (child.type === "heading" && child.depth === 2) {
      const fChild = child.children?.[0]
      // if TOC title
      if (fChild && fChild.type === "text" && fChild.value === "Contents") {
        const next = tree.children[i + 1]
        if (next.type === "list") {
          toc.heading = child
          toc.list = next
          break
        }
      }
    }
  }

  function removeTocNodesFromTree(tree: Root): Root {
    return {
      ...tree,
      children: tree.children.filter(
        node => ![toc.heading, toc.list].includes(node as any)
      ),
    }
  }

  function parseListItem(item: ListItem): SidebarItem {
    let out: SidebarItem = {
      text: "",
    }

    // first children must be of type paragraph
    const [first, second] = item.children
    if (first.type !== "paragraph") {
      throw Error("paragraph expected in list item")
    }
    const textOrLink = first.children[0]
    if (textOrLink.type === "text") {
      out.text = textOrLink.value
    } else if (textOrLink.type === "link") {
      out.link = normalizePath(textOrLink.url)
      if (textOrLink.title) {
        out.text = textOrLink.title
      } else {
        const first = textOrLink.children[0]
        if (!first || first.type !== "text") {
          throw Error("link is missing text")
        }
        out.text = first.value
      }
    } else {
      throw Error("list item is missing text or link")
    }

    if (second?.type === "list") {
      out.items = parseList(second)
    }

    return out
  }

  function parseList(list: List): SidebarItem[] {
    const items: SidebarItem[] = []
    for (const listItem of list.children) {
      items.push(parseListItem(listItem))
    }
    return items
  }

  return [removeTocNodesFromTree(tree), toc.list ? parseList(toc.list) : []]
}

/**
 * Replaces the relative link hrefs pointing to other packages. Because we want
 * each package documentation to still work on Github, we need to alter such
 * links from `../../` to `../` because of how the doc is structure.
 */
function replaceRelativeLinksToPackages(
  filePath: string,
  content: string
): string {
  const depth = filePath.split(path.sep).length - 1
  const tree = unified().use(remarkParse).parse(content)
  const relativeBackRegex = new RegExp(`^(\\.\\.\\/){${depth + 2}}(?!\\.\\.)`)

  visit(tree, node => {
    if (node.type === "link") {
      const url = node.url
      // check if the url points another package using a relative link, if so
      // move it up 1 time
      if (relativeBackRegex.test(url)) {
        node.url = node.url.replace(
          Array(depth + 2)
            .fill("../")
            .join(""),
          Array(depth + 1)
            .fill("../")
            .join("")
        )
        // this approach is a bit naïve but for our scope should be fine
        node.url = node.url.replace("/doc/", "/")
      }
    }
  })

  return unified().use(remarkStringify).stringify(tree)
}

function normalizePath(pt: string): string {
  return `/${path.normalize(pt)}`
}
