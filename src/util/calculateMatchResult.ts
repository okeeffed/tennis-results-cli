import { deriveCurrentMatchScore } from './deriveCurrentSetScore'
import type { RallyAction, MatchResultState } from './types'

const initialValue = {
  playerOneScore: 0,
  playerTwoScore: 0,
  playerOneSetsWon: 0,
  playerTwoSetsWon: 0,
  currentScore: '0 - 0',
  history: [],
}

function replayMatchReducer(
  state: MatchResultState = initialValue,
  payload: RallyAction
) {
  // Base case: if there is a game winner, game is over.
  if (state.matchWinner) {
    throw new Error('Cannot update state after match is over.')
  }

  let playerOneScore = state.playerOneScore
  let playerTwoScore = state.playerTwoScore
  let playerOneSetsWon = state.playerOneSetsWon
  let playerTwoSetsWon = state.playerTwoSetsWon
  let currentScore = state.currentScore
  let newValue

  if (state.currentScore === 'Game') {
    playerOneScore = 0
    playerTwoScore = 0
    currentScore = '0 - 0'
  }

  switch (payload.type) {
    case 'PLAYER_ONE_WIN':
      playerOneScore = playerOneScore + 1
      currentScore = deriveCurrentMatchScore(
        `${playerOneScore} - ${playerTwoScore}`
      )
      playerOneSetsWon =
        currentScore === 'Game' ? playerOneSetsWon + 1 : playerOneSetsWon

      newValue = {
        rallyWinnerRawValue: '0',
        playerOneScore: playerOneScore,
        playerTwoScore: playerTwoScore,
        playerOneSetsWon: playerOneSetsWon,
        playerTwoSetsWon: playerTwoSetsWon,
        currentScore: currentScore,
        matchWinner:
          currentScore === 'Game' && playerOneSetsWon === 2 ? 0 : undefined,
      }

      return {
        ...newValue,
        history: [...state.history, newValue],
      }
    case 'PLAYER_TWO_WIN':
      playerTwoScore = playerTwoScore + 1
      currentScore = deriveCurrentMatchScore(
        `${playerOneScore} - ${playerTwoScore}`
      )
      playerTwoSetsWon =
        currentScore === 'Game' ? playerTwoSetsWon + 1 : playerTwoSetsWon

      newValue = {
        rallyWinnerRawValue: '1',
        playerOneScore: playerOneScore,
        playerTwoScore: playerTwoScore,
        playerOneSetsWon: playerOneSetsWon,
        playerTwoSetsWon: playerTwoSetsWon,
        currentScore: currentScore,
        matchWinner:
          currentScore === 'Game' && playerTwoSetsWon === 2 ? 1 : undefined,
      }
      return {
        ...newValue,
        history: [...state.history, newValue],
      }
    default:
      console.warn('Invalid action type. Returning current state.')
      return state
  }
}

export function calculateMatchResult(rallies: RallyAction[]) {
  return rallies.reduce(
    (acc: MatchResultState, cur: RallyAction) => replayMatchReducer(acc, cur),
    initialValue
  )
}
