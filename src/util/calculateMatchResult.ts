import { deriveCurrentMatchScore } from './deriveCurrentMatchScore'
import type { RallyAction } from './types'

type MatchResultState = {
  playerOneScore: number
  playerTwoScore: number
  currentScore: string
  history: Omit<MatchResultState, 'history'>[]
  rallyWinnerRawValue?: string
  matchWinner?: number
}

const initialValue = {
  playerOneScore: 0,
  playerTwoScore: 0,
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
  let currentScore = state.currentScore
  let newValue

  switch (payload.type) {
    case 'PLAYER_ONE_WIN':
      playerOneScore = state.playerOneScore + 1
      currentScore = deriveCurrentMatchScore(
        `${playerOneScore} - ${playerTwoScore}`
      )

      newValue = {
        rallyWinnerRawValue: '0',
        playerOneScore: state.playerOneScore + 1,
        playerTwoScore: state.playerTwoScore,
        currentScore: currentScore,
        matchWinner: currentScore === 'Game' ? 0 : undefined,
      }

      return {
        ...newValue,
        history: [...state.history, newValue],
      }
    case 'PLAYER_TWO_WIN':
      playerTwoScore = state.playerTwoScore + 1
      currentScore = deriveCurrentMatchScore(
        `${playerOneScore} - ${playerTwoScore}`
      )

      newValue = {
        rallyWinnerRawValue: '1',
        playerOneScore: state.playerOneScore,
        playerTwoScore: state.playerTwoScore + 1,
        currentScore: currentScore,
        matchWinner: currentScore === 'Game' ? 1 : undefined,
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
