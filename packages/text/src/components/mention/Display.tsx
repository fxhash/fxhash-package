export interface MentionProps {
  address: string
}

export function MentionDisplay(props: MentionProps): JSX.Element {
  return <em>{props.address}</em>
}
