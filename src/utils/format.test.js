import currencyFormat from './format'

describe('currency format', () => {
  test.concurrent.each([
    [10, '$10'],
    [100, '$100'],
    [1000, '$1.000'],
    [10000.45, '$10.000'],
    [10000.55, '$10.001'],
  ])('%f should return in currency format %s', async (number, expected) => {
    const result = currencyFormat(number)
    expect(result).toBe(expected)
  })
})
