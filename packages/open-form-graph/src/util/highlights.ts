import { RGB } from "@/_types"
import { CustomHighlight } from "@/sim/_types"

const blue = [94, 112, 235] as RGB
export const red = [238, 125, 121] as RGB
const redred = [255, 0, 0] as RGB

export class Highlight {
  static owner = (id: string): CustomHighlight => {
    return {
      id,
      type: "mine",
      strokeColor: red,
      //      scale: 1.5,
    }
  }
  static onSale = (id: string): CustomHighlight => {
    return {
      id,
      type: "on-sale",
      strokeColor: blue,
    }
  }
  static primary = (id: string): CustomHighlight => {
    return {
      id,
      type: "any",
      linkTo: id,
      scale: 4.0,
      strokeColor: redred,
      linkColor: redred,
      onTop: true,
      isDetached: true,
    }
  }
  static minted = (id: string): CustomHighlight => {
    return {
      id,
      type: "any",
      linkTo: id,
      scale: 1.5,
      strokeColor: redred,
      linkColor: redred,
      isDetached: true,
      onTop: true,
    }
  }
}
