import { getSlateEditorStateFromMarkdown } from "@/getSlateEditorStateFromMarkdown"
import {
  ALL_BLOCKS_EMPTY_MARKDOWN,
  ALL_BLOCKS_MARKDOWN,
} from "./mock/constants"
import { getMarkdownFromSlateEditorState } from "@/getMarkdownFromSlateEditorState"
import { describe, expect, test } from "vitest"

describe("source markdown is not altered through conversion", () => {
  async function testMarkdownToSlateToMarkdown(input: string) {
    const slate = await getSlateEditorStateFromMarkdown(input)
    expect(slate).toBeDefined()
    const output = await getMarkdownFromSlateEditorState(
      slate?.editorState || []
    )
    expect(output).toBe(input)
  }
  test("markdown with all blocks empty", async () => {
    await testMarkdownToSlateToMarkdown(ALL_BLOCKS_EMPTY_MARKDOWN)
  })

  test("markdown with all blocks", async () => {
    await testMarkdownToSlateToMarkdown(ALL_BLOCKS_MARKDOWN)
  })
})
