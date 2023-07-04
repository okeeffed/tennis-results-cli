import { WinLoss, WinLossInput } from '@/util/types'

export const calculateWinLossForPlayer = (acc: WinLoss, curr: WinLossInput) => {
  const { matchResults, match, targetPlayer } = curr
  const { playerOne } = match

  if (playerOne === targetPlayer && matchResults.matchWinner === 0) {
    return {
      wins: acc.wins + 1,
      losses: acc.losses,
    }
  } else {
    return {
      wins: acc.wins,
      losses: acc.losses + 1,
    }
  }
}
