import { findAndReplace } from "mdast-util-find-and-replace"
import { CustomNode } from "./_interfaces.js"
import { u } from "unist-builder"
import { Transformer } from "unified"

export function mdastParseMentions(): Transformer<CustomNode, CustomNode> {
  return ast => {
    // TODO:
    // - testing addresses should be done via @fxhash/utils package
    // - add support for ethereum
    findAndReplace(ast, [
      [
        /@(tz[1-3][1-9a-zA-Z]{33})/g,
        // @ts-ignore
        function ($0: any, $1: any) {
          return u("mention", { name: "mention", value: $1 }, [
            { type: "text", value: "" },
          ])
        },
      ],
    ])
    return ast
  }
}
