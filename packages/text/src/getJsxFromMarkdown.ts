import * as prod from "react/jsx-runtime"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import remarkDirective from "remark-directive"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"
import rehypeReact from "rehype-react"
import rehypeSanitize from "rehype-sanitize"
import rehypeHighlight from "rehype-highlight"
import {
  articleSchemaSanitize,
  mdastFlattenListItemParagraphs,
  mdastParseMentions,
  remarkFxHashCustom,
  remarkIpfsUrlParser,
  remarkMentions,
} from "./processor/_index.js"
import type { FxTextComponents } from "./components/_types.js"
import { fxTextDefaultDisplay } from "./components/settings.js"
import type { Components } from "hast-util-to-jsx-runtime"

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
      .use(remarkIpfsUrlParser)
      .use(remarkMentions)
      .use(remarkRehype)
      .use(rehypeSanitize, articleSchemaSanitize)
      .use(rehypeKatex)
      .use(rehypeHighlight, {
        ignoreMissing: true,
        aliases: { markdown: "plain" },
      })
      .use(rehypeStringify)
      .use(rehypeReact, {
        Fragment: prod.Fragment,
        jsx: prod.jsx,
        jsxs: prod.jsxs,
        components: {
          ...fxTextDefaultDisplay,
          ...components,
        } as Partial<Components>,
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
