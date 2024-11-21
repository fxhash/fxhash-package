import { useMemo } from "react"
import { RenderElementProps, useSlateStatic } from "slate-react"

export function renderElement(props: RenderElementProps) {
  const editor = useSlateStatic()

  const definition = useMemo(
    () => editor.getBlockDefinition(props.element.type),
    [props.element.type, editor]
  )
  return definition.hasUtilityWrapper ? (
    <>{definition.render(props)}</>
  ) : (
    <>{definition.render(props)}</>
  )
}
