import React from 'react'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  const { totalPages, page, onSearchPage } = props

  const renderPages = () => {
    const pages = []
    for (let index = 1; index <= totalPages; index++) {
      pages.push(
        <li
          key={index}
          className={`${index === page ? 'page-item active' : 'page-item'}`}
          aria-current='page'
        >
          {index === page ? (
            <span role='link' className='page-link'>
              {index}
            </span>
          ) : (
            <button
              role='link'
              className='page-link'
              onClick={() => onSearchPage(index)}
            >
              {index}
            </button>
          )}
        </li>,
      )
    }
    return pages
  }

  const canPrevious = () => {
    return page > 1
  }

  const canNext = () => {
    return totalPages > page
  }

  return (
    <nav aria-label='pagination'>
      <ul className='pagination justify-content-center'>
        <li
          className={`${canPrevious() ? 'page-item' : 'page-item disabled'} `}
        >
          {}
          <button
            className='page-link'
            role='link'
            aria-label='Previous'
            onClick={() => onSearchPage(page - 1)}
          >
            <span aria-hidden='true'>&laquo;</span>
          </button>
        </li>
        {renderPages()}
        <li className={`${canNext() ? 'page-item' : 'page-item disabled'} `}>
          <button
            role='link'
            className='page-link'
            aria-label='Next'
            onClick={() => onSearchPage(page + 1)}
          >
            <span aria-hidden='true'>&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onSearchPage: PropTypes.func.isRequired,
}

export default Pagination
