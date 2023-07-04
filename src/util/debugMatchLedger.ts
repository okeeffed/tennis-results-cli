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
    head: [
      'Input',
      'Score',
      'P1 Set Score',
      'P2 Set Score',
      'P1 Sets Won',
      'P2 Sets Won',
      'Winner',
    ],
  })

  table.push([`Match: ${match.id}`, '', '', '', ''])
  table.push([`${match.playerOne} vs ${match.playerTwo}`, ''])

  history.forEach((entry) => {
    if (entry.rallyWinnerRawValue === undefined) {
      throw new Error('Unexpected undefined rally winner.')
    }

    const matchWinner =
      entry.matchWinner !== undefined ? entry.matchWinner.toString() : 'N/A'

    table.push([
      entry.rallyWinnerRawValue,
      entry.currentScore,
      entry.playerOneScore.toString(),
      entry.playerTwoScore.toString(),
      entry.playerOneSetsWon.toString(),
      entry.playerTwoSetsWon.toString(),
      matchWinner,
    ])
  })

  console.log(`${table.toString()}\n`)
}
