"use client"

import { type FragmentType, gql, useFragment } from "@/__generated__"
import { IconVerifiedBadge, Link } from "@fxhash/ui"
import NextLink from "next/link"
import { cn } from "@fxhash/ui"
import { truncateMiddle } from "@fxhash/utils"

export const UserDisplayFragment = gql(/* GraphQL */ `
  fragment UserDisplayFragment on user {
    __typename
    id
    flag
    wallet {
      address
      account {
        id
        username
        isVerified
      }
    }
  }
`)

interface UserDisplayProps {
  className?: string
  user: FragmentType<typeof UserDisplayFragment>
  link?: boolean
}

export const UserDisplay = ({
  className,
  user: userProps,
  link = true,
}: UserDisplayProps) => {
  const user = useFragment(UserDisplayFragment, userProps)

  // Fallback to address if username is not available
  const address = user.id
  const username = user?.wallet?.account.username
  const isVerified = user?.wallet?.account.isVerified
  const displayUsername = username
    ? username.length > 8
      ? truncateMiddle(username, 4)
      : username
    : truncateMiddle(address, 4)

  const content = (
    <>
      {displayUsername}
      {isVerified ? <IconVerifiedBadge height={14} width={14} /> : null}
    </>
  )

  return link ? (
    <Link
      className={cn("inline-flex items-center gap-1 italic", className)}
      asChild
    >
      <NextLink href={Routes.userProfile({ username: username || address })}>
        {content}
      </NextLink>
    </Link>
  ) : (
    <p className="inline-flex items-center gap-1 italic">{content}</p>
  )
}
