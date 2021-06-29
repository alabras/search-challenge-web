import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './Search'

const defaultProps = {
  onSearch: jest.fn(),
}
describe('render Search component', () => {
  it('render search input', async () => {
    render(<Search {...defaultProps} />)

    const inputSearch = await screen.findByRole('search', { name: 'Search' })

    expect(inputSearch).toBeInTheDocument()
  })

  it('when dont type enter then dont call to onSearch', async () => {
    render(<Search {...defaultProps} />)

    const inputSearch = await screen.findByRole('search', { name: 'Search' })
    userEvent.type(inputSearch, 'textToSearch')

    expect(defaultProps.onSearch).not.toBeCalled()
  })

  it('when type enter then call to onSearch', async () => {
    render(<Search {...defaultProps} />)

    const inputSearch = await screen.findByRole('search', { name: 'Search' })
    userEvent.type(inputSearch, 'textToSearch{enter}')

    expect(defaultProps.onSearch).toBeCalledTimes(1)
    expect(defaultProps.onSearch).toBeCalledWith('textToSearch')
  })

  it('should show error when search with less than 3 characters', async () => {
    render(<Search {...defaultProps} />)

    const inputSearch = await screen.findByRole('search', { name: 'Search' })
    userEvent.type(inputSearch, 'te{enter}')

    const errorMessage = await screen.findByText(
      'Para buscar, debe ingresar al menos 3 letras',
    )

    expect(defaultProps.onSearch).toBeCalledTimes(0)
    expect(inputSearch).toHaveClass('is-invalid')
    expect(errorMessage).toBeInTheDocument()
  })

  it('should not show error when search with numbers', async () => {
    render(<Search {...defaultProps} />)

    const inputSearch = await screen.findByRole('search', { name: 'Search' })
    userEvent.type(inputSearch, '12{enter}')

    expect(defaultProps.onSearch).toBeCalledTimes(1)
    expect(defaultProps.onSearch).toBeCalledWith('12')
    expect(inputSearch).not.toHaveClass('is-invalid')
  })

  it('should dont show error when search with 3 characters', async () => {
    render(<Search {...defaultProps} />)

    const inputSearch = await screen.findByRole('search', { name: 'Search' })
    userEvent.type(inputSearch, 'tel{enter}')

    expect(defaultProps.onSearch).toBeCalledTimes(1)
    expect(inputSearch).not.toHaveClass('is-invalid')
  })
})
