import type { RallyAction, Match } from './types'

/**
 * Parses valid input to get the match ID.
 * @example
 * parseMatchId('Match: 01') // '01'
 */
export function parseMatchId(matchIdStr: string): string {
  if (!matchIdStr.includes('Match: ')) {
    throw new Error(`Unexpected match id format: ${matchIdStr}`)
  }

  return matchIdStr.split('Match: ')[1]
}

/**
 * Parses valid input to get the player names. Returned as a tuple.
 * @example
 * parsePlayerNames('Person A vs Person B') // ['Person A', 'Person B']
 */
export function parsePlayerNames(playerNamesStr: string): [string, string] {
  if (!playerNamesStr.includes(' vs ')) {
    throw new Error(`Unexpected player name format: ${playerNamesStr}`)
  }

  const playerNameArr = playerNamesStr.split(' vs ')
  if (playerNameArr.length !== 2) {
    throw new Error(
      `Unexpected length of player names arr: ${playerNameArr.length}`
    )
  }

  const [playerOne, playerTwo] = playerNameArr
  return [playerOne, playerTwo]
}

/**
 * Parses valid input to get the rally result.
 * @example
 * parseRallyResult('1') // '1'
 */
export function parseRallyResult(rallyResult: string): '0' | '1' {
  const rallyResultCleaned = rallyResult.trim()

  if (rallyResultCleaned !== '0' && rallyResultCleaned !== '1') {
    throw new Error(`Unexpected rally result: ${rallyResultCleaned}`)
  }

  return rallyResultCleaned
}

/**
 * Maps a rally result to a RallyAction.
 * @example
 * mapRallyResultToRallyAction('0') // { type: 'PLAYER_ONE_WIN' }
 */
export function mapRallyResultToRallyAction(rallyResult: string): RallyAction {
  switch (rallyResult) {
    case '0':
      return {
        type: 'PLAYER_ONE_WIN',
      }
    case '1':
      return {
        type: 'PLAYER_TWO_WIN',
      }
    default:
      throw new Error(`Unexpected rally result: ${rallyResult}`)
  }
}

/**
 * Takes valid string input for a match and returns an object to represent the match.
 */
export function transformToMatchMap(match: string): Match {
  const [matchIdStr, playerNamesStr, ...rallyResultsArr] = match.split('\n')

  const matchId = parseMatchId(matchIdStr)
  const [playerOne, playerTwo] = parsePlayerNames(playerNamesStr)
  const rallyResults = rallyResultsArr
    .filter((rallyResult) => rallyResult !== '')
    .map(parseRallyResult)
  const rallyActions = rallyResults.map(mapRallyResultToRallyAction)

  return {
    id: matchId,
    playerOne,
    playerTwo,
    rallyResults,
    rallyActions,
  }
}
