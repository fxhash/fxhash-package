import { useSelected, useFocused } from "slate-react"
import { IFxTextBlockDefinition } from "./_interfaces.js"

interface InstanciateMentionOpts {
  tzAddress?: string
}
export const mentionDefinition: IFxTextBlockDefinition<InstanciateMentionOpts> =
  {
    name: "Mention",
    icon: <i className="fa-solid fa-at" aria-hidden />,
    render: ({ attributes, children, element }) => {
      const selected = useSelected()
      const focused = useFocused()
      return (
        <span {...attributes} contentEditable={false}>
          {children}
          {/* <MentionDisplay tzAddress={element.tzAddress} /> */}
        </span>
      )
    },
    hasUtilityWrapper: false,
    inlineMenu: null,
    instanciateElement: ({ tzAddress } = { tzAddress: "" }) => ({
      type: "mention",
      tzAddress,
      children: [{ text: "" }],
    }),
  }
