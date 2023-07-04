import { calculateWinLossForPlayer } from './calculateWinLossForPlayer'
import { WinLossInput } from './types'

/**
 * Note: In general, I might use a library to generate a random integer and test against
 * an incremented version of that for some randomness.
 */
describe('calculateWinLossForPlayer', () => {
  it('should return an that increments the wins when player is the winner', () => {
    const acc = { wins: 2, losses: 0 }
    const curr = {
      matchResults: {
        matchWinner: 0,
        // Stub valid values for testing to satisfy type contract
        playerOneScore: 0,
        playerTwoScore: 0,
        playerOneSetsWon: 0,
        playerTwoSetsWon: 0,
        currentScore: '',
        history: [],
      },
      match: {
        playerOne: 'Player A',
        playerTwo: 'Player B',
        rallyResults: [],
        rallyActions: [],
        id: '1',
      },
      targetPlayer: 'Player A',
    } satisfies WinLossInput

    const result = calculateWinLossForPlayer(acc, curr)
    expect(result).toEqual({ wins: 3, losses: 0 })
  })

  it('should return an object that increments the losses when player is the loser', () => {
    const acc = { wins: 3, losses: 5 }
    const curr = {
      matchResults: {
        matchWinner: 1,
        // Stub valid values for testing to satisfy type contract
        playerOneScore: 0,
        playerTwoScore: 0,
        playerOneSetsWon: 0,
        playerTwoSetsWon: 0,
        currentScore: '',
        history: [],
      },
      match: {
        playerOne: 'Player A',
        playerTwo: 'Player B',
        rallyResults: [],
        rallyActions: [],
        id: '1',
      },
      targetPlayer: 'Player A',
    } satisfies WinLossInput

    const result = calculateWinLossForPlayer(acc, curr)
    expect(result).toEqual({ wins: 3, losses: 6 })
  })
})
