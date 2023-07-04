/**
 * Helper that takes rawInput string that was parsed from a file and returns an array of strings.
 */
export function separateIntoMatchInput(rawInput: string): string[] {
  return (
    rawInput
      // Split on match
      .split(/Match:/)
      // Remove empty strings
      .filter((match) => match !== '')
      // Remove whitespace
      .map((str) => str.trim())
      // Add match back to beginning of string
      .map((str) => `Match: ${str}`)
  )
}
