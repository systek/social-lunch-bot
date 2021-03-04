export const createRandomToken = (): string => {
  const source = 'abcdefghijklmnopqrstuvwxyz1234567890'
  const token = new Array(55)
    .fill(null)
    .map(() => source[Math.floor(Math.random() * source.length)])
    .join('')
  return token
}
