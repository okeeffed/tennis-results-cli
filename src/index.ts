import { separateIntoMatchInput } from '@/util/separateIntoMatchInput'
import { transformToMatchMap } from '@/util/transformToMatchMap'
import { existsSync, readFileSync } from 'node:fs'
import type { Match } from '@/util/types'
import { queryMatchResult } from '@/queries/queryMatchResult'
import path from 'path'
import { argv } from '@/util/argv'
import { queryPlayerWinLoss } from './queries/queryPlayerWinLoss'

const TARGET_FILE = 'tournaments/full_tournament_valid.txt'
const HELP = `
Usage: tennis-results-cli [input file] [options]

Options:
  --help, -h      Print this message.
  --dev           Run the program with a fallback input.
  --debug, -d     Run the program with debug mode enabled.
`

function delegateToCommand({
  input,
  matches,
}: {
  input: string
  matches: Match[]
}) {
  if (/Score Match/.test(input)) {
    const matchId = input.split('Score Match ')[1]
    const match = matches.find((match) => match.id === matchId)

    if (!match) {
      throw new Error(`Match not found: ${matchId}`)
    }

    queryMatchResult(match, argv.debug || argv.d)
  } else if (/Games Player/.test(input)) {
    const player = input.split('Games Player ')[1]

    if (!player) {
      throw new Error(`Player not found: ${player}`)
    }

    queryPlayerWinLoss(matches, player, argv.debug || argv.d)
  } else {
    throw new Error(`Unexpected input: ${input}`)
  }
}

function main() {
  if (argv.help || argv.h) {
    console.log(HELP)
    return
  }

  const inlineArgs = argv._
  const inputFile = argv.dev ? TARGET_FILE : inlineArgs[0]

  if (!inputFile || typeof inputFile !== 'string') {
    console.error('Missing input file.')
    console.log(HELP)
    return
  }

  // check file exists with Node fs
  const filePath = path.resolve(process.cwd(), inputFile)
  if (!existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    console.log(HELP)
  }

  // Get contents of the file input.
  const fileContents = readFileSync(filePath, 'utf8')

  // If a file input is given, parse it and transform it to a MatchMap in-memory.
  // This process satisfies the constraints of the challenge, but could be improved.
  const matches = separateIntoMatchInput(fileContents).map(transformToMatchMap)

  // Handle commands from stdin and take action from there.
  process.stdin.on('data', (data) => {
    data
      .toString()
      .trim()
      .split('\n')
      .map((line) =>
        delegateToCommand({
          input: line,
          matches: matches,
        })
      )
  })

  if (argv.dev) {
    const fallbackInput = [
      'Score Match 01',
      'Score Match 02',
      'Games Player Person A',
      'Games Player Person B',
      'Games Player Person C',
    ]
    fallbackInput.map((line) =>
      delegateToCommand({
        input: line,
        matches: matches,
      })
    )
  }
}

main()
