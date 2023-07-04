import { separateIntoMatchInput } from '@/util/separateIntoMatchInput'
import { transformToMatchMap } from '@/util/transformToMatchMap'
import { readFileSync } from 'node:fs'
import type { Match } from '@/util/types'
import { queryMatchResult } from '@/queries/queryMatchResult'
import path from 'path'
import { argv } from '@/util/argv'

const TARGET_FILE = 'tournaments/full_tournament_valid.txt'

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
    console.log(player)
  } else {
    throw new Error(`Unexpected input: ${input}`)
  }
}

function main() {
  if (argv.help || argv.h) {
    console.log(`
    Usage: @okeeffed/tennis-results-cli [input file] [options]

    Options:
      --help, -h      Print this message.
      --dev           Run the program with a fallback input.
      --debug, -d     Run the program with debug mode enabled.
    `)
    return
  }

  const inlineArgs = argv._
  const inputFile = argv.dev ? TARGET_FILE : inlineArgs[0]

  if (!inputFile || typeof inputFile !== 'string') {
    throw new Error('Missing input file.')
  }

  // Get contents of the file input.
  const fileContents = readFileSync(
    path.resolve(process.cwd(), inputFile),
    'utf8'
  )

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
    const fallbackInput = ['Score Match 01', 'Score Match 02']
    fallbackInput.map((line) =>
      delegateToCommand({
        input: line,
        matches: matches,
      })
    )
  }
}

main()
