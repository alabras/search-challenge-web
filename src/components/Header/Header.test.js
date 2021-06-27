import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Render Header component', () => {
  it('show navbar with lider icon', () => {
    render(<Header />)

    const logoLider = screen.getByRole('img', { name: 'Lider Logo' })

    expect(logoLider).toBeInTheDocument()
    expect(logoLider).toHaveProperty(
      'src',
      'https://www.lider.cl/catalogo/images/logo_lider_pride.svg',
    )
  })

  it('should not show search component when is not defined', () => {
    render(<Header />)

    const searchComponent = screen.queryByRole('search')

    expect(searchComponent).not.toBeInTheDocument()
  })

  it('should be show search component when is defined', () => {
    render(<Header search={<div role='search'>search</div>} />)

    const searchComponent = screen.getByRole('search')

    expect(searchComponent).toBeInTheDocument()
  })
})
