export interface MentionProps {
  address: string
}

export function MentionDisplay(props: MentionProps) {
  return <em>{props.address}</em>
}
