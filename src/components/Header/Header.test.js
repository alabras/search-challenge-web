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
})
