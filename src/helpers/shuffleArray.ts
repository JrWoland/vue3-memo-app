/**
 * https://en.wikipedia.org/wiki/Schwartzian_transform
 */
export function shuffleArray<T>(array: Array<T>) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
