/**
 * The author of this code is the author of
 * https://github.com/remarkjs/remark-unwrap-images/
 *
 * The package was deprecated with the note to use rehype-unwrap-images.
 * This is fine when you want to use rehype, but if you dont parse with reyhpe
 * we still want to unwrap images. In the fx(text) usecase this is
 * the case when we parse the markdown to a slate editor state.
 */

/**
 * @import {LinkReference, Link, Paragraph, Root} from 'mdast'
 */

import { whitespace } from "hast-util-whitespace"
import { Link, LinkReference, Paragraph, Root } from "mdast"
import { SKIP, visit } from "unist-util-visit"

const unknown = 1
const containsImage = 2
const containsOther = 3

/**
 * Remove the wrapping paragraph for images.
 *
 * @returns
 *   Transform.
 */

export function remarkUnwrapImages() {
  /**
   * Transform.
   *
   * @param  tree
   *   Tree.
   */
  return function (tree: Root) {
    visit(tree, "paragraph", function (node, index, parent) {
      if (
        parent &&
        typeof index === "number" &&
        applicable(node, false) === containsImage
      ) {
        parent.children.splice(index, 1, ...node.children)
        return [SKIP, index]
      }
      return
    })
  }
}

/**
 * Check if a node can be unraveled.
 *
 * @param node
 *   Node.
 * @param inLink
 *   Whether the node is in a link.
 * @returns
 *   Info.
 */
function applicable(
  node: Link | LinkReference | Paragraph,
  inLink: boolean
): number {
  let image = unknown
  let index = -1

  while (++index < node.children.length) {
    const child = node.children[index]

    if (child.type === "text" && whitespace(child.value)) {
      // Whitespace is fine.
    } else if (child.type === "image" || child.type === "imageReference") {
      image = containsImage
    } else if (
      !inLink &&
      (child.type === "link" || child.type === "linkReference")
    ) {
      const linkResult = applicable(child, true)

      if (linkResult === containsOther) {
        return containsOther
      }

      if (linkResult === containsImage) {
        image = containsImage
      }
    } else {
      return containsOther
    }
  }

  return image
}
