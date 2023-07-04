import { calculateMatchResult } from './calculateMatchResult'
import { RallyAction } from './types'
import cases from 'jest-in-case'

describe('calculateMatchResult', () => {
  describe('state history', () => {
    test('should return an array of length n if there are n rallies', () => {
      for (let i = 0; i < 4; i++) {
        const rallies = new Array(i).fill({
          type: 'PLAYER_ONE_WIN',
        })
        expect(calculateMatchResult(rallies).history.length).toEqual(i)
      }
    })

    test('should return expected state history array', () => {
      const rallies = new Array(4).fill({
        type: 'PLAYER_ONE_WIN',
      })

      expect(calculateMatchResult(rallies).history).toEqual([
        {
          playerOneScore: 1,
          playerTwoScore: 0,
          currentScore: '15 - 0',
          rallyWinnerRawValue: '0',
          matchWinner: undefined,
        },
        {
          playerOneScore: 2,
          playerTwoScore: 0,
          currentScore: '30 - 0',
          rallyWinnerRawValue: '0',
          matchWinner: undefined,
        },
        {
          playerOneScore: 3,
          playerTwoScore: 0,
          currentScore: '40 - 0',
          rallyWinnerRawValue: '0',
          matchWinner: undefined,
        },
        {
          playerOneScore: 4,
          playerTwoScore: 0,
          currentScore: 'Game',
          rallyWinnerRawValue: '0',
          matchWinner: 0,
        },
      ])
    })
  })

  /**
   * These tests are non-exchaustive. They are meant to test the basic functionality of the reducer.
   * I am cutting corners to save some time.
   */
  describe('basic scoring functionality', () => {
    test('should return playerScoreOne 1 and 15 - 0 if there is only one rally and player one wins', () => {
      const rallies = [
        {
          type: 'PLAYER_ONE_WIN',
        },
      ] satisfies RallyAction[]

      const result = calculateMatchResult(rallies)
      expect(result.playerOneScore).toEqual(1)
      expect(result.playerTwoScore).toEqual(0)
      expect(result.currentScore).toEqual('15 - 0')
      expect(result.matchWinner).toEqual(undefined)
      expect(result.rallyWinnerRawValue).toEqual('0')
    })

    test('should return playerTwoScore 1 and 0 - 15 if there is only one rally and player two wins', () => {
      const rallies = [
        {
          type: 'PLAYER_TWO_WIN',
        },
      ] satisfies RallyAction[]

      const result = calculateMatchResult(rallies)
      expect(result.playerOneScore).toEqual(0)
      expect(result.playerTwoScore).toEqual(1)
      expect(result.currentScore).toEqual('0 - 15')
      expect(result.matchWinner).toEqual(undefined)
      expect(result.rallyWinnerRawValue).toEqual('1')
    })

    test('should set Game one a successful game has been completed', () => {
      const rallies = [
        {
          type: 'PLAYER_ONE_WIN',
        },
        {
          type: 'PLAYER_ONE_WIN',
        },
        {
          type: 'PLAYER_ONE_WIN',
        },
        {
          type: 'PLAYER_ONE_WIN',
        },
      ] satisfies RallyAction[]

      const result = calculateMatchResult(rallies)
      expect(result.playerOneScore).toEqual(4)
      expect(result.playerTwoScore).toEqual(0)
      expect(result.currentScore).toEqual('Game')
      expect(result.matchWinner).toEqual(0)
      expect(result.rallyWinnerRawValue).toEqual('0')
    })
  })

  /**
   * All deuce permutations are tested here.
   */
  cases(
    'deuce',
    ({ count }) => {
      const rallies = new Array(count)
        .fill([
          {
            type: 'PLAYER_ONE_WIN',
          },
          {
            type: 'PLAYER_TWO_WIN',
          },
        ])
        .flat() satisfies RallyAction[]

      const result = calculateMatchResult(rallies)
      expect(result.playerOneScore).toEqual(count)
      expect(result.playerTwoScore).toEqual(count)
      expect(result.currentScore).toEqual('Deuce')
      expect(result.matchWinner).toEqual(undefined)
    },
    [
      {
        name: '3 - 3 is deuce',
        count: 3,
      },
      {
        name: '4 - 4 is deuce',
        count: 4,
      },
      {
        name: '5 - 5 is deuce',
        count: 5,
      },
    ]
  )

  /**
   * All advantage permutations are tested here.
   */
  cases(
    'deuce',
    ({ playerOneScore, playerTwoScore }) => {
      // This is a hacky way to generate an array of rallies.
      const rallies = new Array(playerOneScore + playerTwoScore)
        .fill(0)
        .map((_, i) => {
          if (playerOneScore > playerTwoScore) {
            return i % 2 === 0
              ? { type: 'PLAYER_ONE_WIN' }
              : { type: 'PLAYER_TWO_WIN' }
          } else {
            return i % 2 === 0
              ? { type: 'PLAYER_TWO_WIN' }
              : { type: 'PLAYER_ONE_WIN' }
          }
        }) satisfies RallyAction[]

      const result = calculateMatchResult(rallies)
      expect(result.playerOneScore).toEqual(playerOneScore)
      expect(result.playerTwoScore).toEqual(playerTwoScore)
      expect(result.currentScore).toEqual('Advantage')
      expect(result.matchWinner).toEqual(undefined)
    },
    [
      {
        name: '3 - 4 is advantage',
        playerOneScore: 3,
        playerTwoScore: 4,
      },
      {
        name: '4 - 5 is advantage',
        playerOneScore: 4,
        playerTwoScore: 5,
      },
      {
        name: '4 - 3 is advantage',
        playerOneScore: 4,
        playerTwoScore: 3,
      },
      {
        name: '5 - 4 is advantage',
        playerOneScore: 5,
        playerTwoScore: 4,
      },
    ]
  )
})
