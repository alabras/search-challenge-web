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
})
