import { deriveCurrentMatchScore } from '@/util/deriveCurrentSetScore'
import type { RallyAction, MatchResultState } from '@/util/types'
import { argv } from '@/util/argv'

const initialValue = {
  playerOneScore: 0,
  playerTwoScore: 0,
  playerOneSetsWon: 0,
  playerTwoSetsWon: 0,
  currentScore: '0 - 0',
  history: [],
}

function calculateMatchReducer(
  state: MatchResultState = initialValue,
  payload: RallyAction
) {
  // Base case: if there is a game winner, game is over.
  // Handle it because the provided text file includes scores
  // that continue after the match is over.
  if (state.matchWinner !== undefined) {
    if (argv.debug || argv.d) {
      console.warn('Warning: Attempting to update state after match is over.')
    }
    return state
  }

  const shouldStartNewGame = state.currentScore === 'Game'
  const playerOneCurrentScore = state.playerOneScore
  const playerTwoCurrentScore = state.playerTwoScore
  const playerOneSetsWon = state.playerOneSetsWon
  const playerTwoSetsWon = state.playerTwoSetsWon

  switch (payload.type) {
    case 'PLAYER_ONE_WIN':
      const playerOneScore = shouldStartNewGame ? 1 : playerOneCurrentScore + 1
      const p1WinP2Score = shouldStartNewGame ? 0 : playerTwoCurrentScore
      const p1WinCurrentScore = deriveCurrentMatchScore(
        `${playerOneScore} - ${p1WinP2Score}`
      )
      const isP1Game = p1WinCurrentScore === 'Game'
      const newPlayerOneSetsWon = isP1Game
        ? state.playerOneSetsWon + 1
        : state.playerOneSetsWon

      const p1RallyWin = {
        rallyWinnerRawValue: '0',
        playerOneScore,
        playerTwoScore: p1WinP2Score,
        playerOneSetsWon: newPlayerOneSetsWon,
        playerTwoSetsWon: playerTwoSetsWon,
        currentScore: p1WinCurrentScore,
        matchWinner: isP1Game && newPlayerOneSetsWon === 2 ? 0 : undefined,
      }

      return {
        ...p1RallyWin,
        history: [...state.history, p1RallyWin],
      }
    case 'PLAYER_TWO_WIN':
      const playerTwoScore = shouldStartNewGame ? 1 : playerTwoCurrentScore + 1
      const p2WinP1Score = shouldStartNewGame ? 0 : playerOneCurrentScore
      const p2WinCurrentScore = deriveCurrentMatchScore(
        `${p2WinP1Score} - ${playerTwoScore}`
      )
      const isP2Game = p2WinCurrentScore === 'Game'

      const newPlayerTwoSetsWon = isP2Game
        ? playerTwoSetsWon + 1
        : playerTwoSetsWon

      const p2RallyWin = {
        rallyWinnerRawValue: '1',
        playerOneScore: p2WinP1Score,
        playerTwoScore,
        playerOneSetsWon: playerOneSetsWon,
        playerTwoSetsWon: newPlayerTwoSetsWon,
        currentScore: p2WinCurrentScore,
        matchWinner: isP2Game && newPlayerTwoSetsWon === 2 ? 1 : undefined,
      }

      // console.log('p2RallyWin', p2RallyWin.matchWinner)
      return {
        ...p2RallyWin,
        history: [...state.history, p2RallyWin],
      }
    default:
      console.warn('Warning: Invalid action type. Returning current state.')
      return state
  }
}

export function calculateMatchResult(rallies: RallyAction[]) {
  return rallies.reduce(
    (acc: MatchResultState, cur: RallyAction) =>
      calculateMatchReducer(acc, cur),
    initialValue
  )
}
