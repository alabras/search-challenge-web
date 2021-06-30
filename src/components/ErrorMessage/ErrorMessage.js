import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = (props) => {
  const { error } = props
  const [message, setMessage] = useState(undefined)

  useEffect(() => {
    if (!error) setMessage(undefined)
    else if (error.type) {
      setMessage(error.message)
    } else {
      setMessage('Ups, tuvimos un problema 🙈.')
    }
  }, [error])

  return message ? <p role='alert'>{message}</p> : <></>
}

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }),
}

export default ErrorMessage
