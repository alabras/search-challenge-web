import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import searchProductByIdResponse from '../../../test/searchProductByIdResponse.json'
import searchProductNotPalindromeResponse from '../../../test/searchProductNotPalindromeResponse.json'

describe('search integration testing', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  it('should dont show title result when application start', async () => {
    render(<App />)

    const productList = await screen.findByRole('region', {
      name: 'product list',
    })
    const title = screen.queryByRole('heading')

    expect(productList).toBeInTheDocument()
    expect(title).not.toBeInTheDocument()
  })

  it('should return results products when search with productId and can search again', async () => {
    fetch.mockResponseOnce(JSON.stringify(searchProductByIdResponse))
    render(<App />)

    const inputSearch = await screen.findByRole('search', { name: 'Search' })
    userEvent.type(inputSearch, '14{enter}')

    const title = await screen.findByRole('heading')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Resultados para 14')
    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=14&page=1')

    const listProducts = await screen.findByRole('list', {
      name: 'Product list',
    })
    const listItemsProducts = await within(listProducts).findAllByRole(
      'listitem',
    )

    expect(listProducts).toBeInTheDocument()
    expect(listItemsProducts.length).toBe(1)

    fetch.mockResponseOnce(JSON.stringify(searchProductByIdResponse))
    inputSearch.setSelectionRange(0, 2)
    userEvent.type(inputSearch, 'dod{enter}')
    await screen.findByRole('heading')

    expect(title).toHaveTextContent('Resultados para dod')
    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=dod&page=1')
  })

  it('should be able to advance to page 2', async () => {
    fetch.mockResponse(JSON.stringify(searchProductNotPalindromeResponse))
    render(<App />)

    const inputSearch = await screen.findByRole('search', { name: 'Search' })
    userEvent.type(inputSearch, 'sas{enter}')

    const title = await screen.findByRole('heading')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Resultados para sas')
    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=sas&page=1')

    const pageTwo = await screen.findByRole('link', { name: '2' })
    userEvent.click(pageTwo)
    await screen.findByRole('region')

    expect(fetch).toHaveBeenCalledWith('http://api_url/api/search?q=sas&page=2')
  })
})
