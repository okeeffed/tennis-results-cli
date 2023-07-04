import Table from 'cli-table'
import { WinLossInput } from './types'

/**
 * Prints a CLI table to help debug match results.
 * It emulates what was given in the README.
 */
export function debugWinLossLedger(results: WinLossInput[]) {
  const table = new Table({
    head: ['Game', 'Result', 'Wins', 'Losses'],
  })

  table.push([`Debugging results for ${results[0].targetPlayer}`, '', '', ''])

  let wins = 0
  let losses = 0

  results.forEach((entry) => {
    const isPlayerOne = entry.match.playerOne === entry.targetPlayer
    const winner = entry.matchResults.matchWinner
    const isWinner =
      (winner === 0 && isPlayerOne) || (winner === 1 && !isPlayerOne)

    if (isWinner) {
      wins++
    } else {
      losses++
    }

    table.push([
      `${entry.match.playerOne} vs ${entry.match.playerTwo}`,
      isWinner ? 'Win' : 'Loss',
      wins.toString(),
      losses.toString(),
    ])
  })

  console.log(`${table.toString()}\n`)
}
