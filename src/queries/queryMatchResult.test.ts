import { Match } from '@/util/types'
import { queryMatchResult } from './queryMatchResult'
import { debugMatchLedger } from '@/util/debugMatchLedger'
import { calculateMatchResult } from '@/util/calculateMatchResult'

jest.mock('@/util/debugMatchLedger', () => ({
  debugMatchLedger: jest.fn(),
}))

describe('queryMatchResult', () => {
  test('it should print the expected match result and not call debugMatchLedger when debug is false', () => {
    // Mock implementation so it does not log results
    const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn)
    const rallyResults = ['0', '1', '0', '1', '0', '0', '0', '0', '0', '0']
    const match = {
      id: '01',
      playerOne: 'Person A',
      playerTwo: 'Person B',
      rallyResults,
      rallyActions: rallyResults.map((result) => {
        return result === '0'
          ? { type: 'PLAYER_ONE_WIN' }
          : { type: 'PLAYER_TWO_WIN' }
      }),
    } satisfies Match

    queryMatchResult(match, false)

    expect(logSpy).toHaveBeenCalledWith('Person A defeated Person B')
    expect(logSpy).toHaveBeenCalledWith('2 sets to 0')
    logSpy.mockRestore()

    // Verify that the debugMatchLedger function was called
    // instead of attempt to the complicated string.
    expect(debugMatchLedger).not.toHaveBeenCalled()
  })

  test('it should print the expected match result and call debugMatchLedger when debug is true', () => {
    // Mock implementation so it does not log results
    const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn)
    const rallyResults = ['0', '1', '0', '1', '0', '0', '0', '0', '0', '0']
    const match = {
      id: '01',
      playerOne: 'Person A',
      playerTwo: 'Person B',
      rallyResults,
      rallyActions: rallyResults.map((result) => {
        return result === '0'
          ? { type: 'PLAYER_ONE_WIN' }
          : { type: 'PLAYER_TWO_WIN' }
      }),
    } satisfies Match

    queryMatchResult(match, true)

    expect(logSpy).toHaveBeenCalledWith('Person A defeated Person B')
    expect(logSpy).toHaveBeenCalledWith('2 sets to 0')
    logSpy.mockRestore()

    // Verify that the debugMatchLedger function was called
    // instead of attempt to the complicated string.
    expect(debugMatchLedger).toHaveBeenCalledWith(
      match,
      calculateMatchResult(match.rallyActions).history
    )
  })
})
