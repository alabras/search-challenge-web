import React from 'react'
import PropTypes from 'prop-types'

const Loader = (props) => {
  return props.isLoading ? (
    <div className='spinner-border text-warning' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
    <></>
  )
}
Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default Loader
