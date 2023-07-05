import { HasPlayerPredicateInput } from '@/util/types'

export const doesMatchHavePlayer = ({
  targetPlayer,
  match,
}: HasPlayerPredicateInput) => {
  return match.playerOne === targetPlayer || match.playerTwo === targetPlayer
}
