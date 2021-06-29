import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Search.scss'

const Search = (props) => {
  const { onSearch } = props
  const [search, setSearch] = useState('')
  const [isValid, setIsValid] = useState(true)

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (!validation()) {
        setIsValid(false)
        return
      }
      setIsValid(true)
      onSearch(search)
      e.preventDefault()
    }
  }

  const validation = () => {
    const onlyNumberReg = RegExp(/^\d+$/)
    if (onlyNumberReg.test(search) || search.length >= 3) {
      return true
    }
    return false
  }

  return (
    <div className='d-flex align-items-center search-box'>
      <input
        role='search'
        type='search'
        className={`form-control ${!isValid ? 'is-invalid' : ''}`}
        placeholder='¿Qué estás buscando?'
        aria-label='Search'
        value={search}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <div className='invalid-feedback'>
        Para buscar, debe ingresar al menos 3 letras
      </div>
    </div>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default Search
