import type { Match } from '@/util/types'
import { calculateMatchResult } from '@/util/calculateMatchResult'
import { logMatchResults } from '@/util/logMatchResults'
import { debugMatchLedger } from '@/util/debugMatchLedger'

export function queryMatchResult(match: Match, debug = false): void {
  const result = calculateMatchResult(match.rallyActions)

  if (debug) {
    debugMatchLedger(match, result.history)
  }

  logMatchResults(match, result)
}
