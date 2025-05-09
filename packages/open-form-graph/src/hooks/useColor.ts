import { DARK, LIGHT } from "@/constants"
import { useGraphDataContext } from "@/context/graph"
import { color } from "@/util/color"


export function useColor() {
  const { theme } = useGraphDataContext()

  return {
    color: theme === "dark" ? color(DARK) : color(LIGHT),
    colorContrast: theme === "dark" ? color(LIGHT) : color(DARK)
  }
}
