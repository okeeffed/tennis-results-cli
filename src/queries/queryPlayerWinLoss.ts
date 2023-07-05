import type { Match } from '@/util/types'
import { calculateMatchResult } from '@/util/calculateMatchResult'
import { doesMatchHavePlayer } from '@/util/doesMatchHavePlayer'
import { calculateWinLossForPlayer } from '@/util/calculateWinLossForPlayer'
import { debugWinLossLedger } from '@/util/debugWinLossLedger'
import { logWinLossForPlayer } from '@/util/logWinLossForPlayer'

export function queryPlayerWinLoss(
  matches: Match[],
  targetPlayer: string,
  debug = false
): void {
  const playerMatches = matches
    .filter((match) => doesMatchHavePlayer({ match, targetPlayer }))
    .map((match) => ({
      matchResults: calculateMatchResult(match.rallyActions),
      match,
      targetPlayer,
    }))

  if (debug) {
    debugWinLossLedger(playerMatches)
  }

  const playerMatchResults = playerMatches.reduce(calculateWinLossForPlayer, {
    wins: 0,
    losses: 0,
  })

  logWinLossForPlayer(playerMatchResults)
}
