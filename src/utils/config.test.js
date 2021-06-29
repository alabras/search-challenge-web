import getConfig from './config'

describe('config test', () => {
  it('should return config when exits in window._env', () => {
    window._env_ = {
      TEST_ENV: 'VALUE TEST',
    }
    const envValue = getConfig('TEST_ENV')

    expect(envValue).toBe('VALUE TEST')
  })

  it('should return undefined config when this not exists', () => {
    const envValue = getConfig('NOT_EXISTS_CONFIG')

    expect(envValue).toBe(undefined)
  })
})
