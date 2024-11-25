import { useMemo } from "react"
import { RenderElementProps, useSlateStatic } from "slate-react"
import { IRenderFxTextElementProps } from "./_interfaces"

export const renderFxTextElement =
  ({ nodeMenu: NodeMenu }: IRenderFxTextElementProps) =>
  (props: RenderElementProps) => {
    const editor = useSlateStatic()
    const definition = useMemo(
      () => editor.getBlockDefinition(props.element.type),
      [props.element.type, editor]
    )
    return definition.hasNodeMenu ? (
      <NodeMenu element={props.element}>
        {definition.renderElement(props)}
      </NodeMenu>
    ) : (
      <>{definition.renderElement(props)}</>
    )
  }
