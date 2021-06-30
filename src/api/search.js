import getConfig from '../utils/config'
const BASE_URL = getConfig('API_URL')

const SEARCH_URL = (searchText, page) =>
  `${BASE_URL}api/search?q=${searchText}&page=${page}`

const fetchSearchProducts = (searchText, page) => {
  return new Promise((resolve, reject) => {
    fetch(SEARCH_URL(searchText, page))
      .then((response) => {
        return handleResponse(response)
      })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        // eslint-disable-next-line eqeqeq
        if (error == 'TypeError: Failed to fetch')
          reject({
            message:
              'No podemos conectarnos con nuestro servidor, verifica si tienes conexión a internet :D',
            type: 'connection_error',
          })
        reject(error)
      })
  })
}

const handleResponse = (response) => {
  if (response.status === 200) return response.json()
  else if (response.status === 404) {
    return Promise.reject({
      message: 'No existen resultados para su busqueda',
      type: 'not_found',
    })
  } else {
    return Promise.reject({
      message: 'Ups, tuvimos un problema 🙈.',
      type: 'error',
    })
  }
}

export { fetchSearchProducts }
