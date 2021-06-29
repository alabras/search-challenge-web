import { fetchSearchProducts } from './search'
import searchProductResponse from '../../test/searchProductResponse.json'
import searchProductErrorResponse from '../../test/searchProductErrorResponse.json'

describe('testing for fetchSearchProducts', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should return array products when fetch result is ok', async () => {
    fetch.mockResponseOnce(JSON.stringify(searchProductResponse))

    const resultSearch = await fetchSearchProducts('text')

    expect(resultSearch).toStrictEqual(searchProductResponse)
    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=text')
  })

  it('should return error when fetch search return 400', async () => {
    fetch.mockRejectOnce(searchProductErrorResponse)

    const resultPromise = fetchSearchProducts('te')

    await expect(resultPromise).rejects.toEqual(searchProductErrorResponse)
    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=te')
  })
})
