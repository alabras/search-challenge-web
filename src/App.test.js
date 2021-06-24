import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('render App', () => {
  it('render Header component', () => {
    render(<App />)

    const header = screen.getByRole('navigation', { name: 'header' })

    expect(header).toBeInTheDocument()
  })
})
