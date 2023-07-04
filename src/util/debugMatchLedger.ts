import Table from 'cli-table'
import { Match, MatchResultState } from './types'

/**
 * Prints a CLI table to help debug match results.
 * It emulates what was given in the README.
 */
export function debugMatchLedger(
  match: Match,
  history: Omit<MatchResultState, 'history'>[]
) {
  const table = new Table({
    head: ['Input', 'Score'],
  })

  table.push([`Match: ${match.id}`, ''])
  table.push([`${match.playerOne} vs ${match.playerTwo}`, ''])

  history.forEach((entry) => {
    if (entry.rallyWinnerRawValue === undefined) {
      throw new Error('Unexpected undefined rally winner.')
    }

    table.push([entry.rallyWinnerRawValue, entry.currentScore])
  })

  console.log(table.toString())
}
