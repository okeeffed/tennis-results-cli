import {
  parseMatchId,
  parsePlayerNames,
  parseRallyResult,
  mapRallyResultToRallyAction,
  transformToMatchMap,
} from './transformToMatchMap'

describe('transformToMatchMap', () => {
  describe('helper functions', () => {
    describe('parseMatchId', () => {
      test('should return the match id', () => {
        expect(parseMatchId('Match: 01')).toEqual('01')
      })

      test('should raise error if the argument has an invalid format', () => {
        const fn = () => parseMatchId('01')
        expect(fn).toThrow('Unexpected match id format: 01')
      })
    })

    describe('parsePlayerNames', () => {
      test('should return an array with player names', () => {
        expect(parsePlayerNames('Person A vs Person B')).toEqual([
          'Person A',
          'Person B',
        ])
      })

      test('should raise error if the argument has an invalid format', () => {
        const fn = () => parsePlayerNames('Person A Person B')
        expect(fn).toThrow('Unexpected player name format: Person A Person B')
      })

      test('should raise error if the argument has an invalid length of players', () => {
        const fn = () => parsePlayerNames('Person A vs Person B vs Player C')
        expect(fn).toThrow('Unexpected length of player names arr: 3')
      })
    })

    describe('mapRallyResultToRallyAction', () => {
      test('should return PLAYER_ONE_WIN type of case 0', () => {
        expect(mapRallyResultToRallyAction('0')).toEqual({
          type: 'PLAYER_ONE_WIN',
        })
      })

      test('should return PLAYER_TWO_WIN type of case 1', () => {
        expect(mapRallyResultToRallyAction('1')).toEqual({
          type: 'PLAYER_TWO_WIN',
        })
      })

      test('should raise error if the argument has an invalid length of players', () => {
        const fn = () => mapRallyResultToRallyAction('3')
        expect(fn).toThrow('Unexpected rally result: 3')
      })
    })

    describe('parseRallyResult', () => {
      test('should return 0 or 1 for a valid result', () => {
        expect(parseRallyResult('1')).toEqual('1')
        expect(parseRallyResult('0')).toEqual('0')
      })

      test('should raise error if the argument has an invalid format', () => {
        const fn = () => parseRallyResult('3')

        // Note: We expect index 1 after cleaning the empty strings
        expect(fn).toThrow('Unexpected rally result: 3')
      })
    })
  })

  test('should return an array of Match objects', () => {
    expect(transformToMatchMap(EXAMPLE_INPUT)).toEqual({
      id: '01',
      playerOne: 'Person A',
      playerTwo: 'Person B',
      rallyResults: ['0', '1', '1', '0', '0'],
      rallyActions: [
        {
          type: 'PLAYER_ONE_WIN',
        },
        {
          type: 'PLAYER_TWO_WIN',
        },
        {
          type: 'PLAYER_TWO_WIN',
        },
        {
          type: 'PLAYER_ONE_WIN',
        },
        {
          type: 'PLAYER_ONE_WIN',
        },
      ],
    })
  })
})

const EXAMPLE_INPUT = `Match: 01
Person A vs Person B
0
1
1
0
0`
