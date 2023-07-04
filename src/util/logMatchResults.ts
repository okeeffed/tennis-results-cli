import { Match, MatchResultState } from './types'

export function logMatchResults(match: Match, matchResults: MatchResultState) {
  switch (matchResults.matchWinner) {
    case 0:
      console.log(`${match.playerOne} defeated ${match.playerTwo}`)
      console.log(
        `${matchResults.playerOneSetsWon} sets to ${matchResults.playerTwoSetsWon}\n`
      )
      break
    case 1:
      console.log(`${match.playerTwo} defeated ${match.playerOne}`)
      console.log(
        `${matchResults.playerTwoSetsWon} sets to ${matchResults.playerOneSetsWon}\n`
      )
      break
    default:
      throw new Error('Cannot log match results before match is over.')
  }
}
