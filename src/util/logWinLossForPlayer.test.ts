import { logWinLossForPlayer } from './logWinLossForPlayer'

describe('logWinLossForPlayer', () => {
  it('should log expected win-loss ratio', () => {
    // Mock implementation so it does not log results
    const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn)
    logWinLossForPlayer({
      wins: 12,
      losses: 3,
    })
    expect(logSpy).toHaveBeenCalledWith('12 3\n')
    logSpy.mockRestore()
  })
})
