import { deriveCurrentMatchScore } from './deriveCurrentSetScore'
import cases from 'jest-in-case'

describe('deriveCurrentMatchScore', () => {
  cases(
    'handles specific cases',
    ({ input, expected }) => {
      expect(deriveCurrentMatchScore(input)).toEqual(expected)
    },
    [
      {
        name: 'should return 15 - 0',
        input: '1 - 0',
        expected: '15 - 0',
      },
      {
        name: 'should return 0 - 15',
        input: '0 - 1',
        expected: '0 - 15',
      },
      {
        name: 'should return 15 - 15',
        input: '1 - 1',
        expected: '15 - 15',
      },
      {
        name: 'should return 30 - 0',
        input: '2 - 0',
        expected: '30 - 0',
      },
      {
        name: 'should return 0 - 30',
        input: '0 - 2',
        expected: '0 - 30',
      },
      {
        name: 'should return 30 - 15',
        input: '2 - 1',
        expected: '30 - 15',
      },
      {
        name: 'should return 15 - 30',
        input: '1 - 2',
        expected: '15 - 30',
      },
      {
        name: 'should return 30 - 30',
        input: '2 - 2',
        expected: '30 - 30',
      },
      {
        name: 'should return 0 - 40',
        input: '0 - 3',
        expected: '0 - 40',
      },
      {
        name: 'should return 15 - 40',
        input: '1 - 3',
        expected: '15 - 40',
      },
      {
        name: 'should return 30 - 40',
        input: '2 - 3',
        expected: '30 - 40',
      },
      {
        name: 'should return 40 - 0',
        input: '3 - 0',
        expected: '40 - 0',
      },
      {
        name: 'should return 40 - 15',
        input: '3 - 1',
        expected: '40 - 15',
      },
      {
        name: 'should return 40 - 30',
        input: '3 - 2',
        expected: '40 - 30',
      },
    ]
  )

  cases(
    'handles deuce cases',
    ({ input }) => {
      expect(deriveCurrentMatchScore(input)).toEqual('Deuce')
    },
    [
      {
        name: '3 - 3',
        input: '3 - 3',
      },
      {
        name: '4 - 4',
        input: '4 - 4',
      },
      {
        name: '5 - 5',
        input: '5 - 5',
      },
    ]
  )

  cases(
    'handles advantage cases',
    ({ input }) => {
      expect(deriveCurrentMatchScore(input)).toEqual('Advantage')
    },
    [
      {
        name: '3 - 4',
        input: '3 - 4',
      },
      {
        name: '4 - 3',
        input: '4 - 3',
      },
      {
        name: '4 - 5',
        input: '4 - 5',
      },
      {
        name: '5 - 4',
        input: '5 - 4',
      },
    ]
  )

  cases(
    'handles game cases',
    ({ input }) => {
      expect(deriveCurrentMatchScore(input)).toEqual('Game')
    },
    [
      {
        name: '4 - 0',
        input: '4 - 0',
      },
      {
        name: '4 - 1',
        input: '4 - 1',
      },
      {
        name: '4 - 2',
        input: '4 - 2',
      },
      {
        name: '0 - 4',
        input: '0 - 4',
      },
      {
        name: '1 - 4',
        input: '1 - 4',
      },
      {
        name: '2 - 4',
        input: '2 - 4',
      },
      {
        name: '3 - 5',
        input: '3 - 5',
      },
      {
        name: '5 - 3',
        input: '5 - 3',
      },
      {
        name: '3 - 6',
        input: '3 - 6',
      },
      {
        name: '6 - 3',
        input: '6 - 3',
      },
      {
        name: '4 - 6',
        input: '4 - 6',
      },
      {
        name: '6 - 4',
        input: '6 - 4',
      },
      {
        name: '5 - 6',
        input: '5 - 6',
      },
      {
        name: '5 - 6',
        input: '5 - 6',
      },
    ]
  )
})
