import yargsParser from 'yargs-parser'
const argv = yargsParser(process.argv.slice(2))

function delegateToCommand(input: string) {
  if (/Score Match/.test(input)) {
    const matchId = input.split('Score Match ')[1]
    console.log(matchId)
  } else if (/Games Player/.test(input)) {
    const player = input.split('Games Player ')[1]
    console.log(player)
  } else {
    throw new Error(`Unexpected input: ${input}`)
  }
}

function main() {
  const [inputFile] = argv._

  if (!inputFile) {
    throw new Error('Missing input file.')
  }

  // Handle commands from stdin and take action from there.
  process.stdin.on('data', (data) => {
    data.toString().trim().split('\n').map(delegateToCommand)
  })
}

main()
