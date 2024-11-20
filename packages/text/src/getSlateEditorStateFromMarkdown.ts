import matter from "gray-matter"
import remarkDirective from "remark-directive"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import { remarkToSlate, RemarkToSlateOptions } from "remark-slate-transformer"
import { Descendant } from "slate"
import { unified } from "unified"
import {
  IDirectiveNodeProps,
  mathProcessor,
  mdastFlattenListItemParagraphs,
  mdastParseMentions,
  remarkFxHashCustom,
} from "./processor/_index"
import { audioProcessor } from "./processor/audio"
import { mentionProcessor } from "./processor/mention"
import { videoProcessor } from "./processor/video"
import remarkUnwrapImages from "./processor/plugins/remarkUnwrapImages"
import { imageProcessor } from "./processor/image"

const directives: Record<string, (node: any) => object> = {
  video: videoProcessor.transformMarkdownMdhastToSlate!,
  audio: audioProcessor.transformMarkdownMdhastToSlate!,
}

function createDirectiveNode(
  node: any,
  next: (children: any[]) => any
): object {
  const data = node.data || {}
  const hProperties: { [key: string]: any } = (data.hProperties || {}) as {
    [key: string]: any
  }

  // extract only defined props to avoid error serialization of undefined
  const propertiesWithoutUndefined: IDirectiveNodeProps = Object.keys(
    hProperties
  ).reduce((acc: IDirectiveNodeProps, key: string) => {
    const value = hProperties[key]
    if (value) {
      acc[key] = value
    }
    return acc
  }, {})
  const newNode = {
    type: data.hName,
    children: next(node.children),
    ...propertiesWithoutUndefined,
  }
  const instanciateNode = directives[newNode.type]
  return instanciateNode ? instanciateNode(newNode) : newNode
}
const remarkSlateTransformerOverrides: RemarkToSlateOptions["overrides"] = {
  textDirective: createDirectiveNode,
  leafDirective: createDirectiveNode,
  containerDirective: createDirectiveNode,
  inlineMath: mathProcessor.transformMarkdownMdhastToSlate,
  math: mathProcessor.transformMarkdownMdhastToSlate,
  image: imageProcessor.transformMarkdownMdhastToSlate,
  mention: mentionProcessor.transformMarkdownMdhastToSlate,
}

interface PayloadSlateEditorStateFromMarkdown {
  [p: string]: any
  editorState: Descendant[]
}

export async function getSlateEditorStateFromMarkdown(
  markdown: string
): Promise<PayloadSlateEditorStateFromMarkdown | null> {
  try {
    const matterResult = matter(markdown)
    const processed = await unified()
      .use(remarkParse)
      .use(mdastFlattenListItemParagraphs)
      .use(mdastParseMentions)
      .use(remarkMath)
      .use(remarkGfm)
      .use(remarkUnwrapImages)
      .use(remarkDirective)
      .use(remarkFxHashCustom)
      .use(remarkToSlate, {
        overrides: remarkSlateTransformerOverrides,
      })
      .process(matterResult.content)

    return {
      ...matterResult.data,
      editorState: processed.result as Descendant[],
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
