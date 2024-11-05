export interface MentionProps {
  tzAddress: string
}

export function MentionDisplay(props: MentionProps) {
  return <em>{props.tzAddress}</em>
}
