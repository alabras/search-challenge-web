import { fetchSearchProducts } from './search'
import searchProductResponse from '../../test/searchProductResponse.json'
import searchProductErrorResponse from '../../test/searchProductErrorResponse.json'

describe('testing for fetchSearchProducts', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should return array products when fetch result is ok', async () => {
    fetch.mockResponseOnce(JSON.stringify(searchProductResponse))

    const resultSearch = await fetchSearchProducts('text', 1)

    expect(resultSearch).toStrictEqual(searchProductResponse)
    expect(fetch).toHaveBeenCalledWith(
      'http://api_url/api/search?q=text&page=1',
    )
  })

  it('should return error when fetch search return 400', async () => {
    fetch.mockRejectOnce(searchProductErrorResponse)

    const resultPromise = fetchSearchProducts('te', 2)

    await expect(resultPromise).rejects.toEqual(searchProductErrorResponse)
    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=te&page=2')
  })

  it('should return error when fetch search return 404', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 404 })

    const resultPromise = fetchSearchProducts('te', 2)

    await expect(resultPromise).rejects.toEqual({
      message: 'No existen resultados para su busqueda',
      type: 'not_found',
    })
    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=te&page=2')
  })

  it('should return error when fetch search return 500', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 })

    const resultPromise = fetchSearchProducts('te', 2)

    await expect(resultPromise).rejects.toEqual({
      message: 'Ups, tuvimos un problema 🙈.',
      type: 'error',
    })
    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=te&page=2')
  })

  it('should return error when fetch search return 500s', async () => {
    fetch.mockImplementation(async () => {
      throw new TypeError('Failed to fetch')
    })
    const resultPromise = fetchSearchProducts('te', 2)

    await expect(resultPromise).rejects.toEqual({
      message:
        'No podemos conectarnos con nuestro servidor, verifica si tienes conexión a internet :D',
      type: 'connection_error',
    })
    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=te&page=2')
  })
})
