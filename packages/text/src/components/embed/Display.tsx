import { EmbedMediaDisplay } from "./Media.js"

export interface EmbedProps {
  href?: string
  children?: React.ReactNode
  editable?: boolean
  slateAttributes?: any
  slateElement?: any
}

export function EmbedDisplay(props: EmbedProps): JSX.Element {
  const { href, children } = props
  return (
    <figure>
      {href && (
        <EmbedMediaDisplay href={href} showNotFound>
          {children}
        </EmbedMediaDisplay>
      )}
    </figure>
  )
}
