import { Transforms, Node } from "slate"
import { IFxTextBlockDefinition } from "./_interfaces.js"
import { RenderElementProps, useSelected } from "slate-react"
import { EditAttributeComp } from "./_types.js"

const medias = ["image", "video", "audio"]
const mediaAttributeSettings: Record<string, EditAttributeComp> = {
  //  image: ImageAttributeSettings,
  //  video: VideoAttributeSettings,
  //  audio: AudioAttributeSettings,
}

export function FigureElement({ attributes, children }: RenderElementProps) {
  return <figure {...attributes}>{children}</figure>
}

export const figureDefinition: IFxTextBlockDefinition<null> = {
  name: "Figure",
  renderElement: FigureElement,
  hasNodeMenu: true,
  hasDeleteBehaviorRemoveBlock: true,
  //  editAttributeWrapper: BlockParamsModal,
  // when the AttributeSettings fires onEdit, we need to update the media
  // child component instead of the figure element
  onEditNodeFactory: (editor, element, path) => update => {
    const children = Node.elements(element)
    for (const [child, childPath] of children) {
      if (medias.indexOf(child.type) > -1) {
        Transforms.setNodes(editor, update, {
          at: path.concat(childPath),
        })
        return
      }
    }
  },
  hideSettingsAfterUpdate: true,
  preventAutofocusTrigger: true,
}

export function FigcaptionElement({
  attributes,
  element,
  children,
}: RenderElementProps) {
  // get the text element in the children
  const text = element.children[0].text

  return (
    <figcaption {...attributes}>
      {text === "" && <span contentEditable={false}>image caption...</span>}
      {children}
    </figcaption>
  )
}
export const figcaptionDefinition: IFxTextBlockDefinition<null> = {
  name: "Caption",
  hasNodeMenu: false,
  renderElement: FigcaptionElement,
  inlineMenu: null,
}
