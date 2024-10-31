import { createElement, Fragment } from "react"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import remarkDirective from "remark-directive"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypePrism from "rehype-prism"
import rehypeStringify from "rehype-stringify"
import rehypeReact from "rehype-react"
import rehypeSanitize from "rehype-sanitize"
import {
  articleSchemaSanitize,
  mdastFlattenListItemParagraphs,
  mdastParseMentions,
  remarkFxHashCustom,
  remarkMentions,
} from "./processor/_index"
import { FxTextComponents } from "./components/_types"

function TestComp() {
  return <div>hi</div>
}

const defaultComponents: FxTextComponents = {
  // custom
  "tezos-storage-pointer": TestComp,
  "embed-media": TestComp,
  mention: TestComp,
  // standard html
  img: TestComp,
  video: TestComp,
  audio: TestComp,
  pre: TestComp,
  hr: TestComp,
  a: TestComp,
}

const settingsRehypeReact = {
  createElement,
  Fragment,
  components: defaultComponents,
}

interface GetJsxFromMarkdownOptions {
  components?: FxTextComponents
}

interface PayloadGetComponentsFromMarkdown {
  [p: string]: any
  content: any
}

export async function getJsxFromMarkdown(
  markdown: string,
  options?: GetJsxFromMarkdownOptions
): Promise<PayloadGetComponentsFromMarkdown> {
  try {
    const matterResult = matter(markdown)
    const { components } = options || {}
    const processed = await unified()
      .use(remarkParse)
      .use(mdastFlattenListItemParagraphs)
      .use(mdastParseMentions)
      .use(remarkMath)
      .use(remarkGfm)
      .use(remarkUnwrapImages)
      .use(remarkDirective)
      .use(remarkFxHashCustom)
      .use(remarkMentions)
      .use(remarkRehype)
      .use(rehypePrism)
      .use(rehypeSanitize, articleSchemaSanitize)
      .use(rehypeKatex)
      .use(rehypeStringify)
      .use(rehypeReact, {
        ...settingsRehypeReact,
        components: { ...settingsRehypeReact, ...components },
      })
      .process(matterResult.content)

    return {
      ...matterResult.data,
      content: processed.result,
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}
