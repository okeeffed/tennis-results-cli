/**
 * Basic implementation to derive the match score.
 * Nothing fancy, just a simple switch statement.
 * It makes the assumption that the input is valid.
 * Invalid input will be handled by the caller.
 *
 * @example
 * deriveCurrentMatchScore('1 - 0') // '15 - 0'
 */
export function deriveCurrentMatchScore(currentMatchScore: string) {
  switch (currentMatchScore) {
    case '1 - 0':
      return '15 - 0'
    case '0 - 1':
      return '0 - 15'
    case '1 - 1':
      return '15 - 15'
    case '2 - 0':
      return '30 - 0'
    case '0 - 2':
      return '0 - 30'
    case '2 - 1':
      return '30 - 15'
    case '1 - 2':
      return '15 - 30'
    case '2 - 2':
      return '30 - 30'
    case '3 - 0':
      return '40 - 0'
    case '0 - 3':
      return '0 - 40'
    case '3 - 1':
      return '40 - 15'
    case '1 - 3':
      return '15 - 40'
    case '3 - 2':
      return '40 - 30'
    case '2 - 3':
      return '30 - 40'
    case '3 - 3':
    case '4 - 4':
    case '5 - 5':
      return 'Deuce'
    case '3 - 4':
    case '4 - 3':
    case '4 - 5':
    case '5 - 4':
      return 'Advantage'
    default:
      return 'Game'
  }
}
