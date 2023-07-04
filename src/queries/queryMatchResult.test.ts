import { Match } from '@/util/types'
import { queryMatchResult } from './queryMatchResult'

describe('queryMatchResult', () => {
  test('it should print the expected match result', () => {
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

    queryMatchResult(match)
    expect(logSpy).toHaveBeenCalledWith('Person A defeated Person B')
    expect(logSpy).toHaveBeenCalledWith('2 sets to 0')
    logSpy.mockRestore()
  })
})
