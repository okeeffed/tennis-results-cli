import cases from 'jest-in-case'
import { queryPlayerWinLoss } from './queryPlayerWinLoss'
import { debugWinLossLedger } from '@/util/debugWinLossLedger'

jest.mock('@/util/debugWinLossLedger', () => ({
  debugWinLossLedger: jest.fn(),
}))

const INPUT_DATA = [
  {
    id: '01',
    playerOne: 'Player A',
    playerTwo: 'Player B',
    rallyResults: new Array(8).fill('0'),
    rallyActions: new Array(8).fill({
      type: 'PLAYER_ONE_WIN',
    }),
  },
  {
    id: '02',
    playerOne: 'Player A',
    playerTwo: 'Player C',
    rallyResults: new Array(8).fill('0'),
    rallyActions: new Array(8).fill({
      type: 'PLAYER_ONE_WIN',
    }),
  },
  {
    id: '03',
    playerOne: 'Player B',
    playerTwo: 'Player C',
    rallyResults: new Array(8).fill('0'),
    rallyActions: new Array(8).fill({
      type: 'PLAYER_ONE_WIN',
    }),
  },
]

describe('queryPlayerWinLoss', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  cases(
    'logs out expected win-loss ratio',
    ({ player, output }) => {
      // Mock implementation so it does not log results
      const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn)
      queryPlayerWinLoss(INPUT_DATA, player, false)
      expect(logSpy).toHaveBeenCalledWith(output)
      logSpy.mockRestore()

      expect(debugWinLossLedger).not.toHaveBeenCalled()
    },
    [
      {
        name: 'Player A should log out 2 0',
        player: 'Player A',
        output: '2 0\n',
      },
      {
        name: 'Player B should log out 1 1',
        player: 'Player B',
        output: '1 1\n',
      },
      {
        name: 'Player C should log out 0 2',
        player: 'Player C',
        output: '0 2\n',
      },
    ]
  )

  it('should invoke debugWinLossLedger when debug is true', () => {
    // Mock implementation so it does not log results
    const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn)
    queryPlayerWinLoss(INPUT_DATA, 'Player A', true)
    expect(logSpy).toHaveBeenCalledWith('2 0\n')
    logSpy.mockRestore()

    // Verify that the debugWinLossLedger function was called.
    expect(debugWinLossLedger).toHaveBeenCalled()
  })
})
