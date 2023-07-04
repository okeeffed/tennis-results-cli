export type RallyAction =
  | {
      type: 'PLAYER_ONE_WIN'
    }
  | {
      type: 'PLAYER_TWO_WIN'
    }

export type Match = {
  // Provided Match id
  id: string
  // Name of the first player
  playerOne: string
  // Name of the second player
  playerTwo: string
  // 0s and 1s turned into a string array
  rallyResults: string[]
  // An array of Rally objects
  rallyActions: RallyAction[]
}

export type MatchResultState = {
  playerOneScore: number
  playerTwoScore: number
  playerOneSetsWon: number
  playerTwoSetsWon: number
  currentScore: string
  history: Omit<MatchResultState, 'history'>[]
  rallyWinnerRawValue?: string
  matchWinner?: number
}

export type HasPlayerPredicateInput = {
  match: Match
  targetPlayer: string
}

export type WinLossInput = HasPlayerPredicateInput & {
  matchResults: MatchResultState
}

export type WinLoss = {
  wins: number
  losses: number
}
