import { useMemo } from "react"
import { RenderElementProps } from "slate-react"
import { getFxTextBlockDefinition } from "./getFxTextBlockDefinition"

export function renderElement(props: RenderElementProps) {
  const definition = useMemo(
    () => getFxTextBlockDefinition(props.element.type),
    [props.element.type]
  )
  return definition.hasUtilityWrapper ? (
    <>{definition.render(props)}</>
  ) : (
    <>{definition.render(props)}</>
  )
}
