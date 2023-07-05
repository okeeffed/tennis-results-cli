import { WinLoss } from '@/util/types'

export function logWinLossForPlayer(playerMatchResults: WinLoss): void {
  console.log(`${playerMatchResults.wins} ${playerMatchResults.losses}\n`)
}
