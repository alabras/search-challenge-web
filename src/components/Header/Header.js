import React from 'react'
import './Header.scss'

const Header = () => {
  return (
    <nav className='navbar navbar-expand fixed-top header' aria-label='header'>
      <div className='container-fluid'>
        <a href='/'>
          <img
            className='logo'
            alt='Lider Logo'
            src='https://www.lider.cl/catalogo/images/logo_lider_pride.svg'
          />
        </a>
      </div>
    </nav>
  )
}

export default Header
