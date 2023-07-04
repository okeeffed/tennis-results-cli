import { logMatchResults } from './logMatchResults'
import { Match, MatchResultState } from './types'

describe('logMatchResults', () => {
  it('should log expected result when Player 1 defaults Player 2', () => {
    // Mock implementation so it does not log results
    const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn)

    const match = {
      id: '01',
      playerOne: 'Person A',
      playerTwo: 'Person B',
      rallyResults: new Array(8).fill('0'),
      rallyActions: new Array(8).fill({
        type: 'PLAYER_ONE_WIN',
      }),
    } satisfies Match

    const matchResults = {
      playerOneScore: 4,
      playerTwoScore: 0,
      playerOneSetsWon: 2,
      playerTwoSetsWon: 0,
      currentScore: 'Game',
      // Omit expected history for testing purposes
      history: [],
      rallyWinnerRawValue: '0',
      matchWinner: 0,
    } satisfies MatchResultState

    logMatchResults(match, matchResults)
    expect(logSpy).toHaveBeenCalledWith('Person A defeated Person B')
    expect(logSpy).toHaveBeenCalledWith('2 sets to 0')
    logSpy.mockRestore()
  })

  it('should log expected result when Player 2 defaults Player 1', () => {
    // Mock implementation so it does not log results
    const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn)

    const match = {
      id: '02',
      playerOne: 'Person A',
      playerTwo: 'Person B',
      rallyResults: new Array(8).fill('1'),
      rallyActions: new Array(8).fill({
        type: 'PLAYER_TWO_WIN',
      }),
    } satisfies Match

    const matchResults = {
      playerOneScore: 0,
      playerTwoScore: 4,
      playerOneSetsWon: 0,
      playerTwoSetsWon: 2,
      currentScore: 'Game',
      // Omit expected history for testing purposes
      history: [],
      rallyWinnerRawValue: '1',
      matchWinner: 1,
    } satisfies MatchResultState

    logMatchResults(match, matchResults)
    expect(logSpy).toHaveBeenCalledWith('Person B defeated Person A')
    expect(logSpy).toHaveBeenCalledWith('2 sets to 0')
    logSpy.mockRestore()
  })
})
