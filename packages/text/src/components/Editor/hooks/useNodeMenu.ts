import { Path, Transforms, Node, Element } from "slate"
import { ReactEditor, useSlate } from "slate-react"
import { IUseNodeMenuPayload, IUseNodeMenuProps } from "./_interfaces"
import { useCallback, useMemo } from "react"
import { TEditNodeFn, TEditNodeFnFactory } from "../blocks/_types"

const defaultEditNodeFactory: TEditNodeFnFactory =
  (editor, element, path) => update => {
    Transforms.setNodes(editor, update, {
      at: path,
    })
  }

export function useNodeMenu(props: IUseNodeMenuProps): IUseNodeMenuPayload {
  const { element } = props
  const editor = useSlate()
  const elementPath = ReactEditor.findPath(editor, element)
  const elementDefinition = editor.getBlockDefinition(element.type)

  // when the selection changes, we check if the focus is inside this block
  const isFocused = useMemo(() => {
    if (editor.selection) {
      // the first element in any path is the top-most element
      if (editor.selection.focus.path[0] === elementPath[0]) {
        return true
      }
    }
    return false
  }, [editor.selection, elementPath])

  // create the edit node function based on the element definition
  // (use the definition's one or the default one if none is given)
  const editNode = useMemo<TEditNodeFn>(() => {
    const factory =
      elementDefinition.onEditNodeFactory || defaultEditNodeFactory
    return factory(editor, element, elementPath)
  }, [elementDefinition, editor, element, elementPath])

  const addNode = useCallback(
    (elementToAdd: Element) => {
      const target = Path.next(elementPath)
      Transforms.insertNodes(editor, elementToAdd, {
        at: target,
      })
      // focus the block except if the definition says otherwise
      const definition = editor.getBlockDefinition(elementToAdd.type)
      if (!definition || !definition.preventAutofocusTrigger) {
        // in order to retrieve the DOMNode and restore
        // the selection correctly, we have to wait
        setTimeout(() => {
          ReactEditor.focus(editor)
          const path = ReactEditor.findPath(editor, elementToAdd)
          const [, lastLeafPath] = Node.last(editor, path)
          Transforms.select(editor, lastLeafPath)
        })
      }
    },
    [editor, elementPath]
  )

  return {
    addNode,
    deleteNode: () => {
      Transforms.removeNodes(editor, {
        at: elementPath,
      })
    },
    editNode,
    isFocused,
  }
}
