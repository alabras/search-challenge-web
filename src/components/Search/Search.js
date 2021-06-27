import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Search.scss'

const Search = (props) => {
  const { onSearch } = props
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      onSearch(search)
      e.preventDefault()
    }
  }
  return (
    <div className='d-flex align-items-center search-box'>
      <input
        role='search'
        type='search'
        className='form-control'
        placeholder='¿Qué estás buscando?'
        aria-label='Search'
        value={search}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </div>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default Search
