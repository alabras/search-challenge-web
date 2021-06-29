import getConfig from '../utils/config'
const BASE_URL = getConfig('API_URL')

const SEARCH_URL = (searchText) => `${BASE_URL}api/search?q=${searchText}`

const fetchSearchProducts = (searchText) => {
  return new Promise((resolve, reject) => {
    fetch(SEARCH_URL(searchText))
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => {
        reject(error)
      })
  })
}

export { fetchSearchProducts }
