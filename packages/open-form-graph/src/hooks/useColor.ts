import { useOpenFormGraph } from "@/context/provider"
import { color } from "@/util/color"

export function useColor() {
  const { theme, config } = useOpenFormGraph()

  return {
    color:
      theme === "light" ? color(config.theme.dark) : color(config.theme.light),
    colorContrast:
      theme === "light" ? color(config.theme.light) : color(config.theme.dark),
  }
}
