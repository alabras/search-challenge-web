import React from 'react'
import PropTypes from 'prop-types'
import './Header.scss'

const Header = (props) => {
  const { search } = props
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
        {search}
      </div>
    </nav>
  )
}
Header.propTypes = {
  search: PropTypes.object,
}

export default Header
