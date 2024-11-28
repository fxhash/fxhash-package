import { useSelected, useFocused } from "slate-react"
import { IFxTextBlockDefinition } from "./_interfaces.js"

interface InstanciateMentionOpts {
  tzAddress?: string
}
export const mentionDefinition: IFxTextBlockDefinition<InstanciateMentionOpts> =
  {
    name: "Mention",
    hasNodeMenu: false,
    renderElement: ({ attributes, children }) => {
      return (
        <span {...attributes} contentEditable={false}>
          {children}
          {/* <MentionDisplay tzAddress={element.tzAddress} /> */}
        </span>
      )
    },
    inlineMenu: null,
    instanciateElement: ({ tzAddress } = { tzAddress: "" }) => ({
      type: "mention",
      tzAddress,
      children: [{ text: "" }],
    }),
  }
