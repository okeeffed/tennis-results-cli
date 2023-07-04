import { doesMatchHavePlayer } from './doesMatchHavePlayer'

describe('doesMatchHavePlayer', () => {
  test('should return true if the player is in the match', () => {
    expect(
      doesMatchHavePlayer({
        targetPlayer: 'Person A',
        match: {
          playerOne: 'Person A',
          playerTwo: 'Person B',
          id: '01',
          rallyResults: [],
          rallyActions: [],
        },
      })
    ).toBe(true)
  })

  test('should return false if the player is not in the match', () => {
    expect(
      doesMatchHavePlayer({
        targetPlayer: 'Person C',
        match: {
          playerOne: 'Person A',
          playerTwo: 'Person B',
          id: '01',
          rallyResults: [],
          rallyActions: [],
        },
      })
    ).toBe(false)
  })
})
