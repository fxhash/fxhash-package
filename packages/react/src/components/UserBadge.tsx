"use client"

import {
  type FragmentType,
  gql,
  useFragment,
  useFragment as getFragment,
} from "@/__generated__"
import { Tag, Text } from "@fxhash/ui"
import { UserFlag } from "@fxhash/shared"
import { Fragment, useMemo } from "react"
import { UserDisplayFragment, UserDisplay } from "./UserDisplay"

export const UserBadgeFragment = gql(/* GraphQL */ `
  fragment UserBadgeFragment on user {
    __typename
    id
    ...UserDisplayFragment
    collaborations {
      __typename
      collaborator {
        __typename
        id
        flag
        ...UserDisplayFragment
      }
    }
  }
`)

type UserHrefData = {
  username?: string
  address: string
}

interface UserBadgeProps {
  className?: string
  user: FragmentType<typeof UserBadgeFragment>
  /**
   * Maximum number of collaborators to display, rest will be in the +X badge.
   * Default is 2.
   */
  maxCollaborators?: number
  getHref?: (user: UserHrefData) => string
}

export const UserBadge = ({
  className,
  maxCollaborators = Infinity,
  getHref,
  ...props
}: UserBadgeProps) => {
  const user = useFragment(UserBadgeFragment, props.user)
  const { wallet } = useFragment(UserDisplayFragment, user)

  const usersToDisplay = useMemo(() => {
    if (user.collaborations.length === 0) {
      return [user]
    }
    /**
     * We get the list of collaborators to display
     * - verified users are displayed in priority
     * - if there is no verified user, we fallback to the non verified users
     */
    let users = user.collaborations
      .filter(c => c.collaborator.flag === UserFlag.VERIFIED)
      .map(c => c.collaborator)
    // If no verified user, we fallback to the non verified users
    if (users.length === 0) {
      users = user.collaborations.map(c => c.collaborator)
    }
    users = users.slice(0, maxCollaborators)
    return users
  }, [user, maxCollaborators])

  // override for fxhash user
  if (wallet?.account.username === "fxhash")
    return (
      <UserDisplay
        user={user}
        href={
          getHref &&
          getHref({ address: user.id, username: wallet.account.username })
        }
        className={className}
      />
    )

  const nbCollaborators = user.collaborations.length || 1
  const remainingCollaborators = nbCollaborators - usersToDisplay.length

  return (
    <>
      {usersToDisplay.map((user, i) => {
        const u = getFragment(UserDisplayFragment, user)
        return (
          <Fragment key={user.id}>
            {i > 0 && ", "}
            <UserDisplay
              user={user}
              href={
                getHref &&
                getHref({ address: u.id, username: u.wallet?.account.username })
              }
              className={className}
            />
          </Fragment>
        )
      })}
      {remainingCollaborators > 0 ? (
        <Tag variant="filled" radius="full" className="ml-2">
          <Text>+{remainingCollaborators}</Text>
        </Tag>
      ) : null}
    </>
  )
}
