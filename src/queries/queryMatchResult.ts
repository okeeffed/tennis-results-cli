import type { Match } from '@/util/types'
import { calculateMatchResult } from '@/util/calculateMatchResult'
import { logMatchResults } from '@/util/logMatchResults'

export function queryMatchResult(match: Match, debug = false): void {
  const result = calculateMatchResult(match.rallyActions)

  if (debug) {
    // TODO: Add in debug fn to log match results
  }

  logMatchResults(match, result)
}
