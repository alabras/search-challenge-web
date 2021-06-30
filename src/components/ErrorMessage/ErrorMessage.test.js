import React from 'react'
import { render, screen } from '@testing-library/react'
import ErrorMessage from './ErrorMessage'

describe('render error message', () => {
  it('should render message when type is defined', async () => {
    render(<ErrorMessage error={{ message: 'test', type: 'any_type' }} />)

    const message = await screen.findByRole('alert')

    expect(message).toBeInTheDocument()
    expect(message).toHaveTextContent('test')
  })

  it('should not render error message when error is not defined', async () => {
    render(<ErrorMessage error={undefined} />)

    const message = screen.queryByRole('alert')

    expect(message).not.toBeInTheDocument()
  })

  it('should render message when type is not defined', async () => {
    render(<ErrorMessage error={{}} />)

    const message = await screen.findByRole('alert')

    expect(message).toBeInTheDocument()
    expect(message).toHaveTextContent('Ups, tuvimos un problema 🙈.')
  })
})
