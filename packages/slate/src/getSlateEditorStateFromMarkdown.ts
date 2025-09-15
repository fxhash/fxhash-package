import matter from "gray-matter"
import remarkDirective from "remark-directive"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import { remarkToSlate, RemarkToSlateOptions } from "remark-slate-transformer"
import { Descendant, Node } from "slate"
import { unified } from "unified"
import { audioProcessor } from "./processor/audio.js"
import { blockquoteProcessor } from "./processor/blockquote.js"
import { imageProcessor } from "./processor/image.js"
import { mathProcessor } from "./processor/math.js"
import { mentionProcessor } from "./processor/mention.js"
import { videoProcessor } from "./processor/video.js"
import {
  IDirectiveNodeProps,
  mdastParseMentions,
  mdastFlattenListItemParagraphs,
  remarkFxHashCustom,
  remarkUnwrapImages,
} from "@fxhash/text"

const directives: Record<
  string,
  (node: any, next: (children: any[]) => any) => object
> = {
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
  return instanciateNode ? instanciateNode(newNode, next) : newNode
}
const remarkSlateTransformerOverrides: RemarkToSlateOptions["overrides"] = {
  textDirective: createDirectiveNode,
  leafDirective: createDirectiveNode,
  containerDirective: createDirectiveNode,
  inlineMath: mathProcessor.transformMarkdownMdhastToSlate,
  math: mathProcessor.transformMarkdownMdhastToSlate,
  image: imageProcessor.transformMarkdownMdhastToSlate,
  mention: mentionProcessor.transformMarkdownMdhastToSlate,
  blockquote: blockquoteProcessor.transformMarkdownMdhastToSlate,
}

interface PayloadSlateEditorStateFromMarkdown {
  [p: string]: any
  editorState: Node[]
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
