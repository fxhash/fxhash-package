import { SimNode, SimLink } from "@/_types"
import { CustomHighlight, SimpleHighlight } from "@/sim/_types"

export function isSimNode(node: SimNode | string | number): node is SimNode {
  return typeof node === "object" && "id" in node
}

export function isSimLink(link: SimLink): link is SimLink {
  return (
    typeof link === "object" &&
    "source" in link &&
    typeof link.source !== "string"
  )
}

export function isCustomHighlight(
  highlight: CustomHighlight | SimpleHighlight
): highlight is CustomHighlight {
  if (typeof highlight === "string") return false
  return true
}
