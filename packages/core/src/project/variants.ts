import { ConstraintVariant, ExplorationSettings } from "@fxhash/shared"

/**
 * Given a set of ExplorationSettings and an index,
 * return the ConstraintVariant at that index.
 * @param explorationSettings -
 * ExplorationSettings to get the ConstraintVariant from.
 * @param index - index of the ConstraintVariant to get.
 * @returns ConstraintVariant at the given index.
 */

export function getProjectConstraintVariant(
  explorationSettings: ExplorationSettings | undefined,
  index: number
): ConstraintVariant {
  return [
    explorationSettings?.hashConstraints?.[index] ?? "",
    explorationSettings?.minterConstraints?.[index] ?? "",
    explorationSettings?.iterationConstraints?.[index] ?? 1,
    explorationSettings?.paramsConstraints?.[index] ?? "",
  ]
}
