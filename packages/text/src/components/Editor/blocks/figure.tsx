import { Transforms, Node } from "slate"
import { TEditAttributeComp, IArticleBlockDefinition } from "./_interfaces"
import { RenderElementProps, useSelected } from "slate-react"

const medias = ["image", "video", "audio"]
const mediaAttributeSettings: Record<string, TEditAttributeComp> = {
  //  image: ImageAttributeSettings,
  //  video: VideoAttributeSettings,
  //  audio: AudioAttributeSettings,
}

export function FigureElement({
  attributes,
  element,
  children,
}: RenderElementProps) {
  const selected = useSelected()

  return <figure {...attributes}>{children}</figure>
}

export const figureDefinition: IArticleBlockDefinition<null> = {
  name: "Figure",
  icon: null,
  render: FigureElement,
  hasUtilityWrapper: true,
  hasDeleteBehaviorRemoveBlock: true,
  editAttributeComp: ({ element, onEdit }) => {
    const children = Node.elements(element)
    for (const [child] of children) {
      if (medias.indexOf(child.type) > -1) {
        const AttributeSettings = mediaAttributeSettings[child.type]
        return <AttributeSettings element={child} onEdit={onEdit} />
      }
    }
    return null
  },
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
      {text === "" && <div contentEditable={false}>Image caption...</div>}
      {children}
    </figcaption>
  )
}
export const figcaptionDefinition: IArticleBlockDefinition<null> = {
  name: "Caption",
  icon: null,
  render: FigcaptionElement,
  hasUtilityWrapper: false,
  inlineMenu: null,
}
