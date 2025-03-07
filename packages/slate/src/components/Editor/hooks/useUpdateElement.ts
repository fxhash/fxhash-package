import { Node, Transforms } from "slate"
import { useSlateStatic, ReactEditor } from "slate-react"
import { IUseUpdateElementProps, IUseUpdateElementPayload } from "./_interfaces"

export function useUpdateElement({
  element,
}: IUseUpdateElementProps): IUseUpdateElementPayload {
  const editor = useSlateStatic()

  function updateElementProperties<T extends Node>(props: Partial<T>) {
    const path = ReactEditor.findPath(editor, element)
    Transforms.setNodes(editor, props, {
      at: path,
    })
  }
  return { updateElementProperties }
}
