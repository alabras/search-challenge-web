import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from './Pagination'

const defaultProps = {
  totalPages: 5,
  page: 1,
  onSearchPage: jest.fn(),
}
describe('render pagination', () => {
  it('should render pagination with count pages', async () => {
    render(<Pagination {...defaultProps} />)

    const pages = await screen.findAllByRole('link')

    expect(pages.length).toBe(7)
    expect(pages[0]).toHaveTextContent('«')
    expect(pages[1]).toHaveTextContent('1')
    expect(pages[2]).toHaveTextContent('2')
    expect(pages[3]).toHaveTextContent('3')
    expect(pages[4]).toHaveTextContent('4')
    expect(pages[5]).toHaveTextContent('5')
    expect(pages[6]).toHaveTextContent('»')
  })

  it('should highlight current page', async () => {
    render(<Pagination {...defaultProps} />)

    const pages = await screen.findAllByRole('link')

    expect(pages[1].parentElement).toHaveClass('active')
  })

  it('should does highlight not current page', async () => {
    render(<Pagination {...defaultProps} />)

    const pages = await screen.findAllByRole('link')

    expect(pages[2].parentElement).not.toHaveClass('active')
  })

  it('should be disabled previous link when firts page is active', async () => {
    render(<Pagination {...defaultProps} />)

    const pages = await screen.findAllByRole('link')

    expect(pages[0].parentElement).toHaveClass('disabled')
    expect(pages[6].parentElement).not.toHaveClass('disabled')
  })

  it('should be disabled next link when last page is active', async () => {
    render(<Pagination {...defaultProps} page={5} />)

    const pages = await screen.findAllByRole('link')

    expect(pages[0].parentElement).not.toHaveClass('disabled')
    expect(pages[6].parentElement).toHaveClass('disabled')
  })

  it('should not be disabled next and previews link when page 2 is active', async () => {
    render(<Pagination {...defaultProps} page={2} />)

    const pages = await screen.findAllByRole('link')

    expect(pages[0].parentElement).not.toHaveClass('disabled')
    expect(pages[6].parentElement).not.toHaveClass('disabled')
  })

  it('should call onSearchPage when click in this page', async () => {
    render(<Pagination {...defaultProps} />)

    const pages = await screen.findAllByRole('link')
    userEvent.click(pages[3])

    expect(defaultProps.onSearchPage).toBeCalledWith(3)
    expect(defaultProps.onSearchPage).toBeCalledTimes(1)
  })

  it('should call onSearchPage when click in next link', async () => {
    render(<Pagination {...defaultProps} />)

    const pages = await screen.findAllByRole('link')
    userEvent.click(pages[6])

    expect(defaultProps.onSearchPage).toBeCalledWith(2)
    expect(defaultProps.onSearchPage).toBeCalledTimes(1)
  })

  it('should call onSearchPage when click in previews link', async () => {
    render(<Pagination {...defaultProps} page={4} />)

    const pages = await screen.findAllByRole('link')
    userEvent.click(pages[0])

    expect(defaultProps.onSearchPage).toBeCalledWith(3)
    expect(defaultProps.onSearchPage).toBeCalledTimes(1)
  })
})
