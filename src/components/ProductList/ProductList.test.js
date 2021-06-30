import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { fetchSearchProducts } from '../../api/search'
import searchProductResponse from '../../../test/searchProductResponse.json'
import searchProductErrorResponse from '../../../test/searchProductErrorResponse.json'
import searchProductNotPalindromeResponse from '../../../test/searchProductNotPalindromeResponse.json'
import ProductList from './ProductList'

jest.mock('../../api/search')

describe('render Product List', () => {
  it('should show loader while fetch search products', async () => {
    fetchSearchProducts.mockResolvedValue(searchProductResponse)
    render(<ProductList searchText={'searchText'} />)

    const loading = screen.getByRole('status')

    expect(loading).toBeInTheDocument()
    await screen.findByRole('region')
    expect(loading).not.toBeInTheDocument()
  })

  it('should show error message when fetch search product throw error', async () => {
    fetchSearchProducts.mockRejectedValue(searchProductErrorResponse)
    render(<ProductList searchText={'searchText'} />)

    const errorMessage = await screen.findByText(
      'Debe ingresar algún texto para la busqueda',
    )

    expect(errorMessage).toBeInTheDocument()
  })

  it('should show title when fetch search product return value', async () => {
    fetchSearchProducts.mockResolvedValue(searchProductResponse)
    render(<ProductList searchText={'searchText'} />)

    const title = await screen.findByRole('heading')

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Resultados para searchText')
  })

  it('should show list of products', async () => {
    fetchSearchProducts.mockResolvedValue(searchProductResponse)
    render(<ProductList searchText={'searchText'} />)

    const listProducts = await screen.findByRole('list', {
      name: 'Product list',
    })
    const listItemsProducts = await within(listProducts).findAllByRole(
      'listitem',
    )

    expect(listProducts).toBeInTheDocument()
    expect(listItemsProducts.length).toBe(9)
  })

  it('should show brand, description, price, discount and basePrice, when search is palindrome', async () => {
    fetchSearchProducts.mockResolvedValue(searchProductResponse)
    render(<ProductList searchText={'searchText'} />)
    const expectedBrand = 'dcc gdodkñg'
    const expectedDescription = 'odrnuh ixdta'
    const expectedPrice = '$321.562'
    const expectedBasePrice = '$643.123'
    const expectedDiscount = '50%'
    const expectedImage =
      'http://www.lider.cl/catalogo/images/smartphoneIcon.svg'

    const listItemsProducts = await screen.findAllByRole('listitem')
    const image = await within(listItemsProducts[0]).findByRole('img')

    expect(listItemsProducts[0]).toHaveTextContent(expectedBrand)
    expect(listItemsProducts[0]).toHaveTextContent(expectedDescription)
    expect(listItemsProducts[0]).toHaveTextContent(expectedPrice)
    expect(listItemsProducts[0]).toHaveTextContent(expectedBasePrice)
    expect(listItemsProducts[0]).toHaveTextContent(expectedDiscount)
    expect(image).toBeInTheDocument()
    expect(image).toHaveProperty('src', expectedImage)
  })

  it('should show brand, description, price, when search is not palindrome', async () => {
    fetchSearchProducts.mockResolvedValue(searchProductNotPalindromeResponse)
    render(<ProductList searchText={'searchText'} />)
    const expectedBrand = 'dcc gdodkñg'
    const expectedDescription = 'odrnuh ixdta'
    const expectedPrice = '$643.123'
    const expectedImage =
      'http://www.lider.cl/catalogo/images/smartphoneIcon.svg'

    const listItemsProducts = await screen.findAllByRole('listitem')
    const image = await within(listItemsProducts[0]).findByRole('img')

    expect(listItemsProducts[0]).toHaveTextContent(expectedBrand)
    expect(listItemsProducts[0]).toHaveTextContent(expectedDescription)
    expect(listItemsProducts[0]).toHaveTextContent(expectedPrice)
    expect(image).toBeInTheDocument()
    expect(image).toHaveProperty('src', expectedImage)
  })

  it('should dont call to fetchSearchProducts when searchText is empty', async () => {
    render(<ProductList searchText={''} />)

    await screen.findByRole('region')
    expect(fetchSearchProducts).not.toBeCalled()
  })

  it('should dont show title result when searchText is empty', async () => {
    render(<ProductList searchText={''} />)

    await screen.findByRole('region')
    const title = screen.queryByRole('heading')

    expect(title).not.toBeInTheDocument()
  })
})

describe('render pagination', () => {
  it('should render pagination', async () => {
    fetchSearchProducts.mockResolvedValue(searchProductResponse)
    render(<ProductList searchText={'searchText'} />)

    const pagination = await screen.findByRole('navigation', {
      name: 'pagination',
    })

    expect(pagination).toBeInTheDocument()
  })
})
